import React from 'react';
import styles from './Wizard.module.scss';
import { Button } from '../../ui';

export const ProjectWizard = () => {
    const handleTypescript = () => {
        console.log('hello');
    };

    return (
        <div className={styles.projectWrapper}>
            <div className={styles.projectContainer}>
                <div className={styles.wizardHeader}>
                    <h2 className={styles.wizardHeaderTitle}>
                        Project Creation Wizard
                    </h2>
                </div>

                <div className={styles.projectOptions}>
                    <Button
                        onClick={handleTypescript}
                        style={{ marginRight: 10 }}
                    >
                        TypeScript
                    </Button>
                    <Button onClick={handleTypescript}>JavaScript</Button>
                </div>
            </div>
        </div>
    );
};
