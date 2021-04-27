import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';

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
            '\nThe template is not a CFA template (missing "cfa-template" keyword in package.json)',
        );
        return false;
    }
    return true;
}

export async function createProject(options: CFAProjectOptions, isCLI = false) {
    console.log(`Checking if ${options.template} is a valid CFA template`);
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
        );
        await fs.remove(path.resolve(options.projectPath, 'node_modules'));

        // Do the other fancy code
    }
}
