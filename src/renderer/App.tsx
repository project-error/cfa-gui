import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
const { ipcRenderer } = window.require('electron');

interface AppProps {}

function App({}: AppProps) {
    const handleError = () => {
        ipcRenderer.send('display-error');
    };

    // Return the App component.
    return (
        <div className="App">
            <header className="App-header">
                <button onClick={handleError}>Click for error</button>
            </header>
        </div>
    );
}

export default App;
