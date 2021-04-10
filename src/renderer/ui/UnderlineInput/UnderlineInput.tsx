import React, { CSSProperties } from 'react';
import styles from './UnderlineInput.module.scss';

interface UnderlineInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    style?: CSSProperties;
    width?: string;
    borderColor?: string;
}

export const UnderlineInput = ({
    width = '100%',
    borderColor = '#f40552',
    style,
    ...rest
}: UnderlineInputProps) => {
    return (
        <input
            {...rest}
            className={styles.underlineInput}
            style={{ width: width, borderColor: borderColor }}
        />
    );
};
