import { ipcMain, Notification } from 'electron';
import { ProjectObject } from '../types/project';
import { createResource } from './createResource';

ipcMain.on('createBoilerplate', async (event, project: ProjectObject) => {
    try {
        await createResource(project);
        showNotification();
    } catch (err) {
        console.log(err);
    }
});

const showNotification = () => {
    const notification = {
        title: 'CFA',
        body: 'Installation was successful!',
    };

    new Notification(notification).show();
};
