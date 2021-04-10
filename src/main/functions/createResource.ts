import * as cp from 'child_process';
import rimraf from 'rimraf';
import fs from 'fs-extra';

export async function createResource(
    path: string,
    type: 'TypeScript' | 'JavaScript',
    resourceName: string,
) {
    // First lets copy the folder from our project_templates
    try {
        const projectType = type === 'TypeScript' ? 'ts' : 'js';
        await fs.copy(
            `./src/project_templates/${projectType}`,
            `${path}/${resourceName}`,
        );
        console.log('Created folder');
    } catch (error) {
        console.log(error);
    }

    // await cp.exec('git clone https://github.com/itschip/cfa-templates.git', {
    //     cwd: path,
    //     windowsHide: true,
    // });
}
