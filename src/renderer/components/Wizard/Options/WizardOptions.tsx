import React, { useState } from 'react';
import { Button } from '../../../ui';
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

    const handlePath = () => {
        console.log('path');
        const selectedPath = dialog.showOpenDialogSync({
            title: 'Choose path to install boilerplate',
            buttonLabel: 'Select',
            properties: ['openDirectory'],
        });
        setPath(selectedPath);
    };

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
            {type === 'TypeScript' ? (
                <h1>TypeScript Creation</h1>
            ) : (
                <h1>JavaScript Creation</h1>
            )}

            <div>
                <h3>Selected path</h3>
                {path}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter resource name"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                />
            </div>

            <div>{error && <p className={styles.errorText}>{error}</p>}</div>

            <div>
                <Button onClick={handlePath}>Select Path</Button>
            </div>

            <div>
                <Button onClick={handleIpc}>Create</Button>
            </div>
        </div>
    );
};
