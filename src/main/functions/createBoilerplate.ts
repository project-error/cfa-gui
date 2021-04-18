import { ipcMain, Notification } from 'electron';
import { ProjectObject } from '../types/project';
import { createResource } from './createResource';

ipcMain.on('createBoilerplate', async (event, project: ProjectObject) => {
    try {
        await createResource(project);
    } catch (err) {
        console.log(err);
    }
});
