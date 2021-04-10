import React, { CSSProperties } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    style?: CSSProperties;
}

export const Button = ({ children, onClick, style, ...rest }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={styles.button}
            style={style}
            {...rest}
        >
            {children}
        </button>
    );
};
