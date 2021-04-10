import React, { CSSProperties } from 'react';
import styles from './PaginationButton.module.scss';

interface PaginationButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    style?: CSSProperties;
    size?: number;
    active: boolean;
}

export const PaginationButton = ({
    size = 28,
    active,
    children,
    style,
    ...rest
}: PaginationButtonProps) => {
    return (
        <button
            className={styles.button}
            style={{
                height: size,
                width: size,
                background: active ? '#F40552' : '#161923',
                ...style,
            }}
            {...rest}
        ></button>
    );
};
