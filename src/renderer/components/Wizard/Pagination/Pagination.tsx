import React from 'react';
import { Button } from '../../../ui';
import { usePagination } from '../hooks/usePagination';

export default function Pagination() {
    const { steps, setSteps } = usePagination();

    const handleNext = () => {
        setSteps(steps + 1);
        console.log(steps);
    };

    const handleBack = () => {
        setSteps(steps - 1);
        console.log(steps);
    };

    return (
        <div style={{ width: 250, marginTop: '1rem' }}>
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
