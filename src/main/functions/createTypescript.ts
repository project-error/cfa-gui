import { dialog, ipcMain, Notification } from 'electron';
import { createResource } from './createResource';

ipcMain.on('createBoilerplate', async (event, args) => {
    console.log(args);

    try {
        await createResource(args.path[0], args.type, args.resourceName);
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
