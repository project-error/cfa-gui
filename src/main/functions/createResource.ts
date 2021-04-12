import * as cp from 'child_process';
import rimraf from 'rimraf';
import fs from 'fs-extra';
import { createFxmaniest } from '../stubs/fxmanifestTemplate';
import { ProjectObject } from '../types/project';

export async function createResource(project: ProjectObject) {
    // First lets copy the folder from our project_templates
    try {
        const resourcePath = `${project.path[0]}/${project.resource}`;

        const projectType = project.templateType === 'TypeScript' ? 'ts' : 'js';
        // copy template
        await fs.copy(`./src/project_templates/${projectType}`, resourcePath);

        // writes fxmanifest to resource
        const fxmanifest = createFxmaniest(project);
        await fs.writeFile(`${resourcePath}/fxmanifest.lua`, fxmanifest);

        await cp.exec('yarn', { cwd: resourcePath, windowsHide: true });

        // loop through selected packages and install them
        if (project.packages.length >= 1) {
            for (const pg of project.packages) {
                await cp.exec(`yarn add ${pg}`, {
                    cwd: resourcePath,
                    windowsHide: true,
                });
                console.log(`Installed ${pg}`);
            }
        }

        console.log('Created folder');
    } catch (error) {
        console.log(error);
    }
}
