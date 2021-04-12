import { ipcMain, Notification } from 'electron';
import { createResource } from './createResource';

ipcMain.on('createBoilerplate', async (event, project) => {
    try {
        await createResource(project);
        showNotification();
    } catch (err) {
        console.log(err);
    }
});

ipcMain.on('testProject', (event, args) => {
    console.log(args);
});

const showNotification = () => {
    const notification = {
        title: 'CFA',
        body: 'Installation was successful!',
    };

    new Notification(notification).show();
};
