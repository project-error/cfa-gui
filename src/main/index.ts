import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { getAssetURL } from 'electron-snowpack';
require('@electron/remote/main').initialize();
import './functions/createBoilerplate';

let mainWindow: BrowserWindow | null | undefined;

function createMainWindow(): BrowserWindow {
    const window = new BrowserWindow({
        height: 800,
        width: 1400,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    if (process.env.MODE !== 'production') {
        window.webContents.openDevTools();
    }

    window.loadURL(getAssetURL('index.html'));

    window.on('closed', (): void => {
        mainWindow = null;
    });

    window.webContents.on('devtools-opened', (): void => {
        window.focus();
        setImmediate((): void => {
            window.focus();
        });
    });

    return window;
}

// quit application when all windows are closed
app.on('window-all-closed', (): void => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', (): void => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }
});

// create main BrowserWindow when electron is ready
app.on('ready', (): void => {
    mainWindow = createMainWindow();
});
