import React from 'react';
import { useProject } from '../hooks/useProject';
import { usePagination } from '../hooks/usePagination';
import styles from './WizardCompletion.module.scss';

export default function WizardCompletion() {
    const { project, setProject } = useProject();
    const { steps, setSteps } = usePagination();

    return (
        <div className={styles.container}>
            <div className={styles.titleSection}>
                <label>Project Summary</label>
            </div>

            <div className={styles.resultList}>
                <div className={styles.detailsList}>
                    <div>
                        <h3 className={styles.listTitle}>Details</h3>
                    </div>
                    <label>
                        Path: <span>{project.path}</span>
                    </label>
                    <label>
                        Resource Name: <span>{project.resource}</span>
                    </label>
                    <label>
                        Author: <span>{project.author}</span>
                    </label>
                    <label>
                        Version: <span>{project.version}</span>
                    </label>
                    <label>
                        Description: <span>{project.description}</span>
                    </label>
                </div>
                <div className={styles.selectionList}>
                    <div>
                        <h3 className={styles.listTitle}>Template</h3>
                    </div>
                    <label>
                        Type: <span>{project.templateType}</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
