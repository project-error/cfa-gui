import { Command } from 'commander';
import { createProject } from '../main/functions/createProject';
import path from 'path';

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
        // Gets the path where the project will be
        const projectPath = path.resolve(process.cwd(), name);
        // Gets the base name of the project Path to use as the name
        const projectName = path.basename(projectPath);
        // Create the project
        createProject(
            {
                template: !!options?.template
                    ? options.template
                    : 'cfa-template-lua',
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
        );
    });
const { args: cliArgs } = cli.parse(); // parse the cli args and execute the commander commands
