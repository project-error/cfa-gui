import React, { useState } from 'react';
import { Button } from '../../../ui';

const { dialog } = window.require('@electron/remote');
const { ipcRenderer } = window.require('electron');

interface Options {
    type: 'TypeScript' | 'JavaScript';
}

export const WizardOptions = ({ type }: Options) => {
    const [path, setPath] = useState(null);

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
        ipcRenderer.send('createBoilerplate', { path, type });
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
                <Button onClick={handlePath}>Select Path</Button>
            </div>

            <div>
                <Button onClick={handleIpc}>Create</Button>
            </div>
        </div>
    );
};
