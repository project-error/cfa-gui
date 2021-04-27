import { Command } from 'commander';
import { app } from 'electron';
import { createProject } from './functions/createProject';
import path from 'path';

// Function executed for quiting the electron process
function quitElectronProcess(full: boolean = false): void {
    if (app.isReady()) {
        // If the app is ready quit
        app.quit();
        app.exit(1);
        full ? process.exit(1) : {};
    }
    app.whenReady().then(() => {
        // If not the wait for the process and then quit
        app.quit();
        app.exit(1);
        full ? process.exit(1) : {};
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
    .option('-a, --author <your_name>', 'The name of the author')
    .option('-v, --version <version>', 'The version for your resource')
    .option('-d, --desc <description>', 'The description of your resource')
    .option(
        '-yarn, --use-yarn',
        'If you want to use yarn instead of npmspot',
        false,
    )
    .action((name: string, options: any) => {
        console.log(options);
        // Gets the path where the project will be
        const projectPath = path.resolve(process.cwd(), name);
        // Gets the base name of the project Path to use as the name
        const projectName = path.basename(projectPath);
        // Create the project
        createProject(
            {
                template: 'react',
                templateOptions: {},
                project: {
                    name: projectName ? projectName : 'cfa-project',
                    author: !!options?.author ? options.author : 'Your Name',
                    description: !!options?.desc
                        ? options.desc
                        : 'My fancy resource',
                    version: !!options?.version ? options.version : 'v1.0.0',
                },
                projectPath,
            },
            true,
        ).then(() => quitElectronProcess(true));
    });

// The gui command.
// Used with the context menu action later on
// Path isn't used here, but in the UI.
cli.command('gui <path>').action(() => {
    import('./WinManager').then((): void => console.log('Launching the GUI'));
});

// For easy debugging we use some test args in Development mode
if (process.env.MODE !== 'production')
    process.argv = [...process.argv, 'create', '..\\cfa-test'];

// If we have more than the default CLI args passed we want to use the cli tool instead of the GUI interface
if (process.argv.length > 2) {
    // Get the CLI args
    const { args: cliArgs } = cli.parse(); // parse the cli args and execute the commander commands
} else {
    // Launch the GUI
    import('./WinManager').then((): void => console.log('Launching the GUI'));
}
