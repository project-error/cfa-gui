import React from 'react';
import { Button } from '../../../ui';

export default function Pagination() {
    return (
        <div style={{ width: '20%', position: 'absolute', bottom: '20%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button onClick={() => console.log('back')}>Back</Button>
                <Button onClick={() => console.log('next')}>Next</Button>
            </div>
        </div>
    );
}
