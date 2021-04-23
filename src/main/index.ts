import { Command } from 'commander';
import { app } from 'electron';

// Test args, just used for testing the commander tool in dev mode
const testArgs = ['create', 'TestApp', '-t', '@template/test-app'];
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
        // console.log('read config from %s', program.opts().config);
        // console.log(cli.opts());
        console.log(options);
    });

// The gui command.
// Used with the context menu action later on
cli.command('gui <path>').action((path: string, options: any) => {
    console.log(cli.opts());
    console.log(options);
});

// In prod mode, there is only 1 default cli arg (cwd)
// to prevent errors we insert a new element at index 1 in the process.argv array
// if (process.env.MODE === 'production') process.argv.splice(1, 0, '.');

if (process.env.MODE !== 'production')
    process.argv = [...process.argv, ...testArgs];
console.log(process.argv);

// To prevent the commander tool to throw an error, thus not starting the electron app
// we check if there is more cli args than 2 (cwd, entry-file), there for we should use the cli tool
if (process.argv.length > 2) {
    cli.parse(); // parse the cli args
    app.whenReady().then((): void => {
        console.log('App Ready');
        app.quit();
        app.exit(1);
        process.exit(1);
    });
} else {
    import('./WinManager').then((): void => {
        console.log('Init Window');
    });
}
