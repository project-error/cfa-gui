import React, { useState } from 'react';
import { Checkbox } from '../../../ui/Checkbox/Checkbox';
import styles from './WizardPackages.module.scss';

interface MultiSelectOptionData {
    type: string;
    name: string;
    message?: string;
    values: { [key: string]: any }[];
}

interface IMultiSelectOptionProps {
    data: MultiSelectOptionData;
    onDataChange: (value: any) => void;
}

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
}

export const MultiSelectOption = (props: IMultiSelectOptionProps) => {
    const [toggles, setToggles] = useState<boolean[]>(
        Array(props.data.values.length).fill(false),
    );
    const forceUpdate = useForceUpdate();

    const handleToggle = (i: number): void => {
        toggles[i] = !toggles[i];
        let value: any[] = [];
        toggles.forEach((on: boolean, i: number) =>
            on ? value.push(props.data.values[i].value) : 0,
        );
        props.onDataChange(value);
        setToggles(toggles);
        forceUpdate(); // idk why but sure
    };
    return (
        <div>
            {props.data?.message ? (
                <h1 className={styles.MultiSelectHeader}>
                    {props.data?.message}
                </h1>
            ) : null}
            <div>
                {toggles.map((isChecked, i) => {
                    let value = props.data.values[i];
                    return (
                        <div
                            className={styles.package}
                            key={i}
                            onClick={() => {
                                handleToggle(i);
                            }}
                        >
                            <Checkbox size={32} isChecked={isChecked} />
                            <h1>{value.text}</h1>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
