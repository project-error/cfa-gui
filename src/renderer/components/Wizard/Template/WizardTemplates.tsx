import React from 'react';
import { BorderedInput } from '../../../ui/BorderedInput/BorderedInput';
import { TemplateItem } from './TemplateItem';
import styles from './WizardTemplates.module.scss';

export const WizardTemplates = () => {
    return (
        <div className={styles.container}>
            <div className={styles.searchSection}>
                <label>Project Templates</label>
                {/* <BorderedInput placeholder="Search project templates" /> */}
            </div>

            <div className={styles.templateList}>
                <TemplateItem
                    thumbnail="https://i.imgur.com/CsKulHz.png"
                    title="Typescript Resource"
                />
                <TemplateItem
                    thumbnail="https://i.imgur.com/DVqhRFH.jpg"
                    title="Javascript Resource"
                />
                <TemplateItem
                    thumbnail="https://beta.iodine.gg/4ci04.png"
                    title="Lua Resource"
                />
            </div>
        </div>
    );
};
