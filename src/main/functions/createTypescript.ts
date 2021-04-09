import { dialog, ipcMain, Notification } from 'electron';
import { cloneTemplate } from '../tools/handleGit';

ipcMain.on('createBoilerplate', async (event, args) => {
    console.log(args);

    try {
        await cloneTemplate(args.path[0], args.type);
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
