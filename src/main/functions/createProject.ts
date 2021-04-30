import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';
import prompts, { PromptObject } from 'prompts';

import { createFxmaniest } from '../stubs/createFxmanifest';
import { CFAProjectOptions } from '../types/project';

async function validateProjectTemplate(pkg: string): Promise<boolean> {
    let keywords;
    try {
        const { stdout: output } = await execa('npm', [
            'info',
            pkg,
            'keywords',
            '--json',
        ]);
        keywords = JSON.parse(output);
    } catch (e) {
        console.log();
        if (e.stderr) {
            console.error(`Unable to find ${pkg}, in the npm registry.`);
        } else {
            console.error(e);
        }
        return false;
    }

    if (!keywords || !keywords.includes('cfa-template')) {
        console.error(
            `\n"${pkg}" is not a CFA template (missing "cfa-template" keyword in package.json)`,
        );
        return false;
    }
    return true;
}

export async function createProject(
    options: CFAProjectOptions,
    isCLI: boolean = false,
) {
    console.log(`Checking if "${options.template}" is a valid CFA template`);
    if (await validateProjectTemplate(options.template)) {
        console.log('\nGenerating Project:');
        console.log(`  - Using template: ${options.template}`);
        console.log(`  - Creating project in: ${options.projectPath}`);

        // Create the project directory if it doesn't exist
        await fs.ensureDir(options.projectPath);

        // this will be deleted later, just needed for installation
        await fs.writeFile(
            path.resolve(options.projectPath, 'package.json'),
            `{"name":"cfa-template"}`,
        );
        try {
            // install the package
            await execa(
                'npm',
                ['install', options.template, '--ignore-scripts'],
                {
                    cwd: options.projectPath,
                    all: true,
                },
            );
        } catch (err) {
            console.error(err.all);
            throw err;
        }

        await fs.copy(
            path.resolve(options.projectPath, 'node_modules', options.template),
            options.projectPath,
            {
                overwrite: true,
            },
        );
        await fs.remove(path.resolve(options.projectPath, 'node_modules'));
        await fs.remove(path.resolve(options.projectPath, 'package-lock.json'));

        // Check if the template has a cfa.config.js file
        if (fs.pathExists(path.resolve(options.projectPath, 'cfa.config.js'))) {
            let config = await import(
                path.resolve(options.projectPath, 'cfa.config.js')
            ).catch(console.error);
            console.log(JSON.stringify(config.options, null, 4));

            if (isCLI) options.templateOptions = await prompts(config.options);

            let fxmanifestResult = await config.configure(
                options.templateOptions,
            );
            if (
                typeof fxmanifestResult != 'object' ||
                Array.isArray(fxmanifestResult)
            )
                return console.error(
                    `[Template error] The Configuration function returned type ${typeof fxmanifestResult}, but thould've returned a JSON object`,
                );
            fxmanifestResult.name = options.project.name;
            fxmanifestResult.version = options.project.version;
            fxmanifestResult.author = options.project.author;
            fxmanifestResult.description = options.project.description;

            await fs.writeFile(
                path.resolve(options.projectPath, 'fxmanifest.lua'),
                createFxmaniest(fxmanifestResult),
            );
            return;
        }

        // Create default fxmanifest
        await fs.writeFile(
            path.resolve(options.projectPath, 'fxmanifest.lua'),
            createFxmaniest({
                name: options.project.name,
                author: options.project.author,
                version: options.project.version,
                description: options.project.description,

                client_script: 'client file here',
                server_script: 'server file here',
                shared_script: 'shared file here',
            }),
        );
    }
}
