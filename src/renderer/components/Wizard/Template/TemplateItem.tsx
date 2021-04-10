import React from 'react';
import styles from './WizardTemplates.module.scss';

interface TemplateItemProps {
    thumbnail: string;
    title: string;
}

export const TemplateItem = ({ thumbnail, title }: TemplateItemProps) => {
    return (
        <div className={styles.template}>
            <img
                className={styles.thumbnail}
                src={thumbnail}
                alt="template-icon"
            />
            <div className={styles.info}>
                <h1>
                    {title}
                    <img
                        className={styles.miniIcon}
                        src={thumbnail}
                        alt="mini-icon"
                    />
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                    aliquam, purus sit amet luctus venenatis, lectus magna
                    fringilla urna, porttitor rhoncus dolor purus non enim
                    praesent elementum facilisis leo, vel fringilla est
                    ullamcorper eget{' '}
                </p>
            </div>
        </div>
    );
};
