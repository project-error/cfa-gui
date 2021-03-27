import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { ProjectWizard } from './components/Wizard/ProjectWizard';
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
            <ProjectWizard />
        </div>
    );
}

export default App;
