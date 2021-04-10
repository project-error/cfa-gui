import React, { CSSProperties } from 'react';
import styles from './BorderedInput.module.scss';

interface BorderedInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    style?: CSSProperties;
    width?: string;
}

export const BorderedInput = ({
    width = '100%',
    style,
    ...rest
}: BorderedInputProps) => {
    return (
        <input
            {...rest}
            className={styles.borderdInput}
            style={{ width: width, padding: 10 }}
        />
    );
};
