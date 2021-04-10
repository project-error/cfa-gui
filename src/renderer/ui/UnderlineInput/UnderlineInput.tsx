import React, { CSSProperties } from 'react';
import styles from './UnderlineInput.module.scss';

interface UnderlineInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    style?: CSSProperties;
    width?: string;
}

export const UnderlineInput = ({
    width = '100%',
    style,
    ...rest
}: UnderlineInputProps) => {
    return (
        <input
            {...rest}
            className={styles.underlineInput}
            style={{ width: width }}
        />
    );
};
