import React, { CSSProperties } from 'react';
import styles from './Checkbox.module.scss';
import CheckMark from '../../assets/check-mark.svg';

interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    style?: CSSProperties;
    size?: number;
    isChecked: boolean;
}

export const Checkbox = ({
    size = 28,
    style,
    isChecked,
    ...rest
}: CheckboxProps) => {
    return (
        <button
            className={styles.button}
            style={{
                height: size,
                width: size,
                background: isChecked ? '#F40552' : '#1e2023',
                ...style,
            }}
        >
            {isChecked && <img src={CheckMark} className={styles.checkMark} />}
        </button>
    );
};
