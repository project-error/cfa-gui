import React from 'react';
import styles from './Header.module.css';

const { BrowserWindow } = window.require('@electron/remote');

export const Header = () => {
    const closeWindow = () => {
        BrowserWindow.getFocusedWindow().close();
    };

    const minimizeWindow = () => {
        BrowserWindow.getFocusedWindow().minimize();
    };

    return (
        <div className={styles.header}>
            <div>
                <h1 className={styles.headerTitle}>CFA</h1>
            </div>
            <div className={styles.headerOptions}>
                <div className={styles.closeButton} onClick={closeWindow} />
                <div
                    className={styles.minimizeButton}
                    onClick={minimizeWindow}
                />
                <div className={styles.maximizeButton} />
            </div>
        </div>
    );
};
