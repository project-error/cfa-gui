import * as cp from 'child_process';
import rimraf from 'rimraf';
import fs from 'fs-extra';
import { createFxmaniest } from '../copiers/typescriptTemplate';

export async function createResource(project: any) {
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

        // TODO: loop through selected packages and install them

        console.log('Created folder');
    } catch (error) {
        console.log(error);
    }
}
