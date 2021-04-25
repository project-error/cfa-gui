import * as cp from 'child_process';
import fs from 'fs-extra';
import { createFxmaniest } from '../stubs/createFxmanifest';
import { ProjectObject } from '../types/project';
import { Notification } from 'electron';

const TemplateMap: { [key: string]: string } = {
    TypeScript: 'ts',
    JavaScript: 'js',
    Lua: 'lua',
};

export async function createResource(project: ProjectObject) {
    // First lets copy the folder from our project_templates
    try {
        const resourcePath = `${project.resourcePath}/${project.resourceName}`;

        // copy template
        const type = TemplateMap[project.resourceTemplate];
        await fs.copy(`./src/project_templates/${type}`, resourcePath);

        // writes fxmanifest to resource
        const fxmanifest = createFxmaniest({
            fx_version: 'cerulean',
            game: 'gta5',

            name: project.resourceName,
            author: project.resourceAuthor,
            version: project.resourceVersion,
            description: project.resourceDescription,

            client_script:
                type === 'ts' ? 'dist/client/*.client.js' : 'client/*.lua',
            server_script:
                type === 'ts' ? 'dist/server/*.server.js' : 'server/*.lua',
        });

        await fs.writeFile(`${resourcePath}/fxmanifest.lua`, fxmanifest);

        if (type !== 'lua') {
            cp.exec('yarn', { cwd: resourcePath, windowsHide: true });

            // loop through selected packages and install them
            if (project.resourcePackages.length >= 1) {
                for (const pg of project.resourcePackages) {
                    cp.exec(`yarn add ${pg}`, {
                        cwd: resourcePath,
                        windowsHide: true,
                    });
                    console.log(`Installed ${pg}`);
                }
            }
        }

        showNotification(project.resourceName);
        console.log(`Created folder ${type}`);
    } catch (error) {
        console.log(error);
    }
}

const showNotification = (resourceName: string) => {
    const notification: Electron.NotificationConstructorOptions = {
        title: 'Create FiveM App',
        body: `Successfully created ${resourceName} resource.`,
    };

    new Notification(notification).show();
};
