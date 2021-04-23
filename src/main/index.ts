import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { getAssetURL } from 'electron-snowpack';
require('@electron/remote/main').initialize();
import './functions/createBoilerplate';

let mainWindow: BrowserWindow | null | undefined;

import { Command } from 'commander';

// Test args, just used for testing the commander tool in dev mode
const testArgs = ['create', 'TestApp', '-t', '@template/test-app'];
// Create the commander object
const cli = new Command();

// Set the version from the package.json file
cli.version(app.getVersion());

// The create command. Used for creating a resource without using the gui interface.
cli.command('create <name>')
    .description('Create a fivem resource using the cli tool')
    .option(
        '-t, --template <template_name>',
        'The template your resource will use',
        '@cfa/template-lua',
    )
    .option('-a, --author <your_name>', 'The name of the author', 'your name')
    .option(
        '-v, --version <version>',
        'The version for your resource',
        'v0.0.0',
    )
    .option(
        '-d, --desc <description>',
        'The description of your resource',
        'My fancy resource',
    )
    .action((name, options) => {
        // console.log('read config from %s', program.opts().config);
        console.log(cli.opts());
        console.log(options);
    });

// The gui command.
// Used with the context menu action later on
cli.command('gui <path>').action((name, options) => {
    console.log(cli.opts());
    console.log(options);
});

// In prod mode, there is only 1 default cli arg (cwd)
// to prevent errors we insert a new element at index 1 in the process.argv array
if (process.env.MODE === 'production') process.argv.splice(1, 0, '.');
// process.argv = [...process.argv, ...testArgs];

console.log(process.env.MODE);
console.log(process.argv);

// To prevent the commander tool to throw an error, thus not starting the electron app
// we check if there is more cli args than 2 (cwd, entry-file), there for we should use the cli tool
if (process.argv.length > 2) {
    cli.parse();
    console.log(cli.opts());
}

function createMainWindow(): BrowserWindow {
    const window = new BrowserWindow({
        height: 800,
        width: 1400,
        frame: true,
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
