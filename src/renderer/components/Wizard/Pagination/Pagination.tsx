import React from 'react';
import { Button } from '../../../ui';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { usePagination } from '../hooks/usePagination';
import { useProject } from '../hooks/useProject';
const { ipcRenderer } = window.require('electron');

export default function Pagination() {
    const { steps, setSteps } = usePagination();
    const { error, setError } = useErrorHandler();

    const {
        resourcePath,
        resourcePackages,
        resourceName,
        resourceAuthor,
        resourceVersion,
        resourceTemplate,
        resourceDescription,
    } = useProject();

    const handleCreateResource = () => {
        ipcRenderer.send('createBoilerplate', {
            resourcePath,
            resourcePackages,
            resourceName,
            resourceAuthor,
            resourceVersion,
            resourceTemplate,
            resourceDescription,
        });
    };

    const handleNext = () => {
        if (steps === 1) {
            if (resourcePath == '')
                return setError('Please provide a file path.');
            if (resourceName == '')
                return setError('Please provide a resource name.');
        }

        if (steps === 2) {
            if (resourceTemplate == '')
                return setError('Please select a resource template');

            if (resourceTemplate === 'Lua') {
                setError(null);
                return setSteps(4);
            }
        }

        setSteps(steps + 1);
        setError(null);
    };

    const handleBack = () => {
        if (resourceTemplate === 'Lua' && steps === 4) {
            return setSteps(2);
        }

        setSteps(steps - 1);
        console.log(steps);
    };

    return (
        <div style={{ width: 250, marginTop: '1rem' }}>
            {error && (
                <p
                    style={{
                        color: 'red',
                        textAlign: 'center',
                        marginBottom: '1rem',
                    }}
                >
                    {error}
                </p>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button onClick={handleBack} disabled={steps == 1}>
                    Back
                </Button>
                {steps === 4 ? (
                    <Button onClick={handleCreateResource}>Complete</Button>
                ) : (
                    <Button onClick={handleNext} disabled={steps == 4}>
                        Next
                    </Button>
                )}
            </div>
        </div>
    );
}
