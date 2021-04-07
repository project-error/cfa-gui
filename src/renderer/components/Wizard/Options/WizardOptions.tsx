import React from 'react';

interface Options {
    type: 'TypeScript' | 'JavaScript';
}

export const WizardOptions = ({ type }: Options) => {
    return (
        <div>
            {type === 'TypeScript' ? (
                <h1>TypeScript Creation</h1>
            ) : (
                <h1>JavaScript Creation</h1>
            )}
        </div>
    );
};
