import * as cp from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { createFxmaniest } from '../stubs/fxmanifestTemplate';
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
        const fxmanifest = createFxmaniest(project);
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

        showSuccessNotification(project.resourceName, resourcePath);
        console.log(`Created folder ${type}`);
    } catch (error) {
        // FIXME: Create a notification
        console.log(`Something went wrong. Error: ${error.message}`);
        showErrorNotification(project.resourceName);
    }
}

const showSuccessNotification = (
    resourceName: string,
    resourcePath: string,
) => {
    const notification = new Notification({
        title: 'Create FiveM App',
        body: `Successfully created ${resourceName} resource.`,
    });

    notification.show();

    notification.on('click', () => {
        cp.exec(`start "" "${resourcePath}"`);
    });
};

const showErrorNotification = (resourceName: string) => {
    const notification: Electron.NotificationConstructorOptions = {
        title: 'Create FiveM App',
        body: `Failed to create resource: ${resourceName}`,
    };

    new Notification(notification).show();
};
