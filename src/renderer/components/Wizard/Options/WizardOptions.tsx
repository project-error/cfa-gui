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
            <h1>{type} Creation</h1>

            <div>
                <h3>Selected path</h3>
                {path}
            </div>

            {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                <BorderedInput
                    width="30%"
                    type="text"
                    placeholder="Enter resource name"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                />

                <UnderlineInput
                    width="30%"
                    type="text"
                    placeholder="Enter resource name"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                />

                <UnderlineInput
                    width="30%"
                    type="text"
                    borderColor="#C5C5BD"
                    placeholder="Enter resource name"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                />

                <Button onClick={() => { }} style={{ width: '200px' }} disabled>
                    Disabled Button
                </Button>
                <Button onClick={() => { }} style={{ width: '200px' }}>
                    Normal Button
                </Button>

                <PaginationButton size={30} active={false} />
                <PaginationButton size={30} active={true} />

            </div> */}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <BorderedInput
                    width="30%"
                    type="text"
                    placeholder="Enter resource name"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                />

                <div>
                    {error && <p className={styles.errorText}>{error}</p>}
                </div>

                <Button onClick={handlePath} style={{ width: '200px' }}>
                    Select Path
                </Button>
                <Button onClick={handleIpc} style={{ width: '200px' }}>
                    Create Resource
                </Button>
            </div>
        </div>
    );
};
