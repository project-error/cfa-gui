import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { ProjectWizard } from './components/Wizard/ProjectWizard';
import { WizardProvider } from './context/WizardProvider';
const { ipcRenderer } = window.require('electron');

interface AppProps {}

function App({}: AppProps) {
    const handleError = () => {
        ipcRenderer.send('display-error');
    };

    // Return the App component.
    return (
        <div className="App">
            <Header />
            <WizardProvider>
                <ProjectWizard />
            </WizardProvider>
        </div>
    );
}

export default App;
