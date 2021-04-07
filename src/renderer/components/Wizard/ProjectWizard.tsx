import React from 'react';
import styles from './Wizard.module.scss';
import { Button } from '../../ui';
import { WizardOptions } from './Options/WizardOptions';
import { useProject } from './hooks/useProject';

export const ProjectWizard = () => {
    const handleTypescript = () => {
        console.log('hello');
    };

    const { project, setProject } = useProject();

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
                        onClick={() => setProject('TypeScript')}
                        style={
                            project === 'TypeScript'
                                ? { background: '#f40552', marginRight: 10 }
                                : { marginRight: 10 }
                        }
                    >
                        TypeScript
                    </Button>

                    <Button
                        onClick={() => setProject('JavaScript')}
                        style={
                            project === 'JavaScript'
                                ? { background: '#f40552' }
                                : undefined
                        }
                    >
                        JavaScript
                    </Button>
                </div>

                <WizardOptions type={project} />
            </div>
        </div>
    );
};
