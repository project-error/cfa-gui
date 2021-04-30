import React from 'react';
import { CFATemplate } from '../../../context/WizardProvider';
import styles from './WizardTemplates.module.scss';

interface TemplateItemProps extends React.ComponentProps<any> {
    template: CFATemplate;
    active: boolean;
}

export const TemplateItem = ({
    onClick,
    active,
    template,
}: TemplateItemProps) => {
    return (
        <div
            className={styles.template}
            style={{ boxShadow: active ? '0px 0px 3px 2px #f40552' : 'none' }}
            onClick={onClick}
        >
            <img
                src={
                    template.thumbnail
                        ? template.thumbnail
                        : `https://cdn.jsdelivr.net/npm/${template.package}@latest/thumbnail.png`
                }
                className={styles.thumbnail}
            />
            <div className={styles.info}>
                <h1>{template.title}</h1>
                <p>{template.description}</p>
            </div>
        </div>
    );
};
