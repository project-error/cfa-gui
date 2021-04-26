import { Command } from 'commander';
import { app } from 'electron';
import { createProject } from './functions/createProject';

// Function executed for quiting the electron process
function quitElectronProcess(): void {
    if (app.isReady()) {
        // If the app is ready quit
        app.quit();
        app.exit(1);
    }
    app.whenReady().then(() => {
        // If not the wait for the process and then quit
        app.quit();
        app.exit(1);
    });
}

// Create the commander object
const cli = new Command();

// Set the version from the package.json file
cli.version('v1.0.0');

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
    .action((name: string, options: any) => {
        console.log(options);
        createProject(
            {
                template: 'react',
                templateOptions: {},
                project: {
                    name: 'test',
                    author: 'Aleks',
                    description: 'oh yes',
                    version: '1.0.0',
                },
                projectPath: 'C:\\Dev',
            },
            true,
        ).then(quitElectronProcess);
    });

// The gui command.
// Used with the context menu action later on
cli.command('gui <path>').action((path: string, options: any) => {
    console.log(options);
    import('./WinManager').then((): void => console.log('Launching the GUI'));
});

// For easy debugging we use some test args in Development mode
if (process.env.MODE !== 'production')
    process.argv = [...process.argv, 'create', 'test'];

// If we have more than the default CLI args passed we want to use the cli tool instead of the GUI interface
if (process.argv.length > 2) {
    // Get the CLI args
    const { args: cliArgs } = cli.parse(); // parse the cli args and execute the commander commands
} else {
    // Launch the GUI
    import('./WinManager').then((): void => console.log('Launching the GUI'));
}
