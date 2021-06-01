import { ipcMain, Notification } from 'electron';
import { ProjectObject } from '../types/project';
import { createResource } from './createResource';

ipcMain.on('createBoilerplate', async (event, project: ProjectObject) => {
    try {
        await createResource(project);
    } catch (err) {
        // FIXME: Create a notification
        console.log(`Something went wrong. Error: ${err.message}`);
    }
});
