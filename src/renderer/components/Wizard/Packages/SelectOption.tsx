import React, { useState } from 'react';
import { Checkbox } from '../../../ui/Checkbox/Checkbox';
import styles from './WizardPackages.module.scss';

interface SelectOptionData {
    type: string;
    name: string;
    message?: string;
    values: { [key: string]: any }[];
}

interface ISelectOptionProps {
    data: SelectOptionData;
    onDataChange: (value: any) => void;
}

export const SelectOption = (props: ISelectOptionProps) => {
    const [selected, setSelected] = useState(-1);

    const handleToggle = (i: number): void => {
        props.onDataChange(props.data.values[i].value);
        setSelected(i);
    };
    return (
        <div>
            {props.data?.message ? (
                <h1 className={styles.OptionHeader}>{props.data?.message}</h1>
            ) : null}
            <div>
                {props.data.values.map(({ text }, i) => {
                    // let value = props.data.values[i];
                    return (
                        <div
                            className={styles.package}
                            key={i}
                            onClick={() => {
                                handleToggle(i);
                            }}
                        >
                            <Checkbox size={32} isChecked={selected === i} />
                            <h1>{text}</h1>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
