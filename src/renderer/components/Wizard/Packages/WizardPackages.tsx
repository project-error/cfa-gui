import React, { useState, useEffect } from 'react';
import { useProject } from '../hooks/useProject';
import { MultiSelectOption } from './MultiSelectOption';
// import { Package } from './Package';
import { SelectOption } from './SelectOption';
import { ToggleOption } from './ToggleOption';
import styles from './WizardPackages.module.scss';

const OptionComponents: any = {
    select: SelectOption,
    multiselect: MultiSelectOption,
    toggle: ToggleOption,
};

export const WizardPackages = () => {
    const {
        setResourceOptions,
        resourceOptions,
        resourceTemplate,
    } = useProject();

    const [templateOptions, setTemplateOptions] = useState<
        { [key: string]: any }[]
    >([]);
    useEffect(() => {
        if (resourceTemplate.package && resourceTemplate.package.length > 0)
            import(`https://cdn.skypack.dev/${resourceTemplate.package}`).then(
                (config) => {
                    console.log(config.options);
                    setTemplateOptions(config.options);
                },
            );
    }, []);

    const handleDataChange = (
        option: { [key: string]: any },
        index: number,
        value: any,
    ) => {
        setResourceOptions({ ...resourceOptions, [option.name]: value });
    };

    console.log(JSON.stringify(resourceOptions));

    return (
        <div className={styles.container}>
            <div className={styles.titleSection}>
                <label>Choose what packages you would like to include</label>
            </div>

            {templateOptions.length === 0 ? (
                <div className={styles.skipText}>
                    <h1>There is no options available for this template</h1>
                </div>
            ) : (
                <div className={styles.packageList}>
                    {templateOptions.map((option, i) => {
                        if (OptionComponents[option?.type]) {
                            let ComponentType = OptionComponents[option?.type];
                            return (
                                <ComponentType
                                    key={i}
                                    data={option}
                                    onDataChange={(value: any) => {
                                        handleDataChange(option, i, value);
                                    }}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </div>
    );
};
