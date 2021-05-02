import React from 'react';
import { useProject } from '../hooks/useProject';
import styles from './WizardCompletion.module.scss';

export default function WizardCompletion() {
    const {
        resourcePath,
        resourceName,
        resourceAuthor,
        resourceVersion,
        resourceTemplate,
        resourceDescription,
    } = useProject();

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
                        Path: <span>{resourcePath}</span>
                    </label>
                    <label>
                        Resource Name: <span>{resourceName}</span>
                    </label>
                    <label>
                        Author: <span>{resourceAuthor}</span>
                    </label>
                    <label>
                        Version: <span>{resourceVersion}</span>
                    </label>
                    <label>
                        Description: <span>{resourceDescription}</span>
                    </label>
                    <label>
                        Template: <span>{resourceTemplate.title}</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
