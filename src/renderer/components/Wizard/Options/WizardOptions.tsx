import React, { useState } from 'react';
import { Button } from '../../../ui';
import { BorderedInput } from '../../../ui/BorderedInput/BorderedInput';
import { PaginationButton } from '../../../ui/PaginationButton/Checkbox';
import { UnderlineInput } from '../../../ui/UnderlineInput/UnderlineInput';
import styles from '../Wizard.module.scss';

const { dialog } = window.require('@electron/remote');
const { ipcRenderer } = window.require('electron');

interface Options {
    type: 'TypeScript' | 'JavaScript';
}

export const WizardOptions = ({ type }: Options) => {
    const [path, setPath] = useState(null);
    const [error, setError] = useState<null | string>(null);
    const [resourceName, setResourceName] = useState('');
    const [author, setAuthor] = useState('');
    const [version, setVersion] = useState('');
    const [description, setDescription] = useState('');

    const handlePath = () => {
        console.log('path');
        const selectedPath = dialog.showOpenDialogSync({
            title: 'Choose path to install boilerplate',
            buttonLabel: 'Select',
            properties: ['openDirectory'],
        });
        setPath(selectedPath);
    };

    // This will not be used here
    const handleIpc = () => {
        if (path === null) {
            return setError('Please enter a path');
        }

        if (resourceName === '') {
            return setError('Please enter a valid resource  name');
        }

        ipcRenderer.send('createBoilerplate', { path, type, resourceName });
        setError(null);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <BorderedInput
                    placeholder="Project Path..."
                    width="85%"
                    type="text"
                    value={path}
                />
                <Button onClick={handlePath}>Browse</Button>
            </div>

            {/* This should def be a reusable component, but rn I am lazy */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    marginTop: 20,
                }}
            >
                <div className={styles.underlineInputWrapper}>
                    <label className={styles.optionLabel}>Project Name</label>
                    <UnderlineInput
                        width="90%"
                        type="text"
                        placeholder="My Cool Project"
                        value={resourceName}
                        onChange={(e) => setResourceName(e.currentTarget.value)}
                    />
                </div>

                <div className={styles.underlineInputWrapper}>
                    <label className={styles.optionLabel}>Author</label>
                    <UnderlineInput
                        width="90%"
                        type="text"
                        placeholder="Your Name..."
                        value={author}
                        onChange={(e) => setAuthor(e.currentTarget.value)}
                    />
                </div>

                <div className={styles.underlineInputWrapper}>
                    <label className={styles.optionLabel}>Version</label>
                    <UnderlineInput
                        width="90%"
                        type="text"
                        placeholder="1.0.0"
                        value={version}
                        onChange={(e) => setVersion(e.currentTarget.value)}
                    />
                </div>

                <div>
                    {error && <p className={styles.errorText}>{error}</p>}
                </div>
            </div>

            <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label className={styles.optionLabel}>Description</label>
                    <BorderedInput
                        placeholder="A new RP server"
                        width="85%"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                </div>
            </div>
        </div>
    );
};
