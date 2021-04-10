import React from 'react';
import styles from './Wizard.module.scss';
import { WizardOptions } from './Options/WizardOptions';

export const ProjectWizard = () => {
    return (
        <div className={styles.projectWrapper}>
            <div className={styles.projectContainer}>
                <div className={styles.wizardHeader}>
                    <h2 className={styles.wizardHeaderTitle}>
                        Project Creation Wizard
                    </h2>
                </div>

                <WizardOptions />
            </div>
        </div>
    );
};
