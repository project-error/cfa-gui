import React from 'react';
import styles from './Steps.module.scss';

export const Steps = ({ step }: { step: number }) => {
    return (
        <div className={styles.steps}>
            <h1>
                <span style={{ color: step === 1 && '#F40552' }}>Step 1</span> |
            </h1>
            <h1>
                <span style={{ color: step === 2 && '#F40552' }}>Step 2</span> |
            </h1>
            <h1>
                <span style={{ color: step === 3 && '#F40552' }}>Step 3</span> |
            </h1>
            <h1>
                <span style={{ color: step === 4 && '#F40552' }}>Step 4</span>
            </h1>
        </div>
    );
};
