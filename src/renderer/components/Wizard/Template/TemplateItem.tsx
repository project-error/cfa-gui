import React from 'react';
import styles from './WizardTemplates.module.scss';

interface TemplateItemProps {
    thumbnail: React.ReactNode;
    title: string;
    description: string;
    type: string;
    active: boolean;
    selectTemplate: (e: string) => void;
}

export const TemplateItem = ({
    thumbnail,
    title,
    description,
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
            <div className={styles.thumbnail}>{thumbnail}</div>
            <div className={styles.info}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};
