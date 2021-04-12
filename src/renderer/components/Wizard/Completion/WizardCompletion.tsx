import React from 'react';
import { useProject } from '../hooks/useProject';
import { usePagination } from '../hooks/usePagination';

export default function WizardCompletion() {
    const { project, setProject } = useProject();
    const { steps, setSteps } = usePagination();

    return (
        <div>
            <h1>Resource Name: {project.resource}</h1>
        </div>
    );
}
