import React, { CSSProperties } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    style?: CSSProperties;
}

export const Button = ({ children, onClick, style }: ButtonProps) => {
    return (
        <button onClick={onClick} className={styles.button} style={style}>
            {children}
        </button>
    );
};
