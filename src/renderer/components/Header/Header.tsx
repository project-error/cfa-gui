import React from 'react';
import styles from './Header.module.scss';
import { MdClose, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { AiOutlineMinus } from 'react-icons/ai';

const { BrowserWindow } = window.require('@electron/remote');

export const Header = () => {
    const getWindow = () => BrowserWindow.getFocusedWindow();

    const closeWindow = () => {
        getWindow().close();
    };
    const minimizeWindow = () => {
        getWindow().minimize();
    };

    const maximizeWindow = () => {
        let win = getWindow();
        win.isMaximized() ? win.restore() : win.maximize();
    };

    return (
        <div className={styles.header}>
            <div>
                <h1 className={styles.headerTitle}>CFA</h1>
            </div>
            <div className={styles.headerOptions}>
                <div className={styles.actionButton} onClick={minimizeWindow}>
                    {<AiOutlineMinus color="#73747a" size={24} />}
                </div>
                <div className={styles.actionButton} onClick={closeWindow}>
                    {<MdClose color="#73747a" size={24} />}
                </div>
            </div>
        </div>
    );
};
