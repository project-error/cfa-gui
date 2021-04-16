import React, { useEffect, useState } from 'react';
import { Button } from '../../../ui';
import { BorderedInput } from '../../../ui/BorderedInput/BorderedInput';
import { useProject } from '../hooks/useProject';
import styles from '../Wizard.module.scss';

const { dialog } = window.require('@electron/remote');

export const WizardDetails = () => {
    const {
        resourcePath,
        resourceName,
        resourceAuthor,
        resourceVersion,
        resourceDescription,
        setResourcePath,
        setResourceName,
        setResourceAuthor,
        setResourceVersion,
        setResourceDescription,
    } = useProject();

    const handlePath = () => {
        const selectedPath = dialog.showOpenDialogSync({
            title: 'Choose path to install boilerplate',
            buttonLabel: 'Select',
            properties: ['openDirectory'],
        });
        setResourcePath(selectedPath[0]);
        localStorage.setItem('previousPath', selectedPath[0]); // Store the new path in local storage
    };

    // Used to check if we have a stored path in our local storage
    useEffect(() => {
        const prevPath = localStorage.getItem('previousPath');
        if (prevPath) {
            setResourcePath(prevPath);
        }
    }, []);

    return (
        <div style={{ marginTop: 20, width: '100%', flex: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <BorderedInput
                    placeholder="Project Path..."
                    width="85%"
                    type="text"
                    disabled
                    value={resourcePath}
                />
                <Button onClick={handlePath}>Browse</Button>
            </div>

            {/* This should def be a reusable component, but rn I am lazy */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '86.5%',
                    marginTop: 20,
                }}
            >
                {/* This should def be a reusable component, but rn I am lazy */}
                <div className={styles.underlineInputWrapper}>
                    <label className={styles.optionLabel}>Project Name</label>
                    <BorderedInput
                        width="95%"
                        type="text"
                        placeholder="My Cool Project"
                        value={resourceName}
                        onChange={(e) => setResourceName(e.currentTarget.value)}
                    />
                </div>

                <div className={styles.underlineInputWrapper}>
                    <label className={styles.optionLabel}>Author</label>
                    <BorderedInput
                        width="95%"
                        type="text"
                        placeholder="Your Name..."
                        value={resourceAuthor}
                        onChange={(e) =>
                            setResourceAuthor(e.currentTarget.value)
                        }
                    />
                </div>

                <div className={styles.underlineInputWrapper}>
                    <label className={styles.optionLabel}>Version</label>
                    <BorderedInput
                        width="95%"
                        type="text"
                        placeholder="1.0.0"
                        value={resourceVersion}
                        onChange={(e) =>
                            setResourceVersion(e.currentTarget.value)
                        }
                    />
                </div>
            </div>

            <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label className={styles.optionLabel}>Description</label>
                    <BorderedInput
                        placeholder="A new RP server"
                        width="85%"
                        type="text"
                        value={resourceDescription}
                        onChange={(e) =>
                            setResourceDescription(e.currentTarget.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
};
