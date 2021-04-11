import React from 'react';
import styles from './WizardTemplates.module.scss';

interface TemplateItemProps {
    thumbnail: string;
    title: string;
    type: string;
    active: boolean;
    selectTemplate: (e: string) => void;
}

export const TemplateItem = ({
    thumbnail,
    title,
    selectTemplate,
    type,
    active,
}: TemplateItemProps) => {
    return (
        <div
            className={styles.template}
            style={{ boxShadow: active ? '0px 0px 3px 2px #f40552' : 'none' }}
            onClick={() => selectTemplate(type)}
        >
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
