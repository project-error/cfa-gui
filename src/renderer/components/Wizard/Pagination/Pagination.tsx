import React from 'react';
import { Button } from '../../../ui';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { usePagination } from '../hooks/usePagination';
import { useProject } from '../hooks/useProject';

export default function Pagination() {
    const { steps, setSteps } = usePagination();
    const project = useProject();
    const { error, setError } = useErrorHandler();

    const handleNext = () => {
        console.log(project);

        if (steps === 1) {
            if (project.resourcePath == '')
                return setError('Please provide a file path.');
            if (project.resourceName == '')
                return setError('Please provide a resource name.');
            if (project.resourceAuthor == '')
                return setError('Please provide a author name.');
            if (project.resourceDescription == '')
                return setError('Please provide a description.');
            if (project.resourceVersion == '')
                return setError('Please provide a resource version.');
        }

        if (steps === 2) {
            if (project.resourceTemplate == '')
                return setError('Please select a resource template');
        }
        setSteps(steps + 1);
        setError(null);
    };

    const handleBack = () => {
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
                <Button onClick={handleNext} disabled={steps == 4}>
                    Next
                </Button>
            </div>
        </div>
    );
}
