import React, { useState } from 'react';
import { Checkbox } from '../../../ui/Checkbox/Checkbox';
import styles from './WizardPackages.module.scss';

interface ToggleOptionData {
    type: string;
    name: string;
    message?: string;
    values: { [key: string]: any }[];
}

interface IToggleOptionProps {
    data: ToggleOptionData;
    onDataChange: (value: any) => void;
}

export const ToggleOption = (props: IToggleOptionProps) => {
    const [toggled, setToggled] = useState(false);

    const handleToggle = (): void => {
        props.onDataChange(!toggled);
        setToggled(!toggled);
    };
    return (
        <div>
            {props.data?.message ? (
                <h1 className={styles.OptionHeader}>{props.data.message}</h1>
            ) : null}
            <div>
                <div
                    className={styles.package}
                    onClick={() => {
                        handleToggle();
                    }}
                >
                    <Checkbox size={32} isChecked={toggled} />
                </div>
            </div>
        </div>
    );
};
