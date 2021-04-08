import { dialog, ipcMain, Notification } from 'electron';
import { cloneTemplate } from '../tools/handleGit';

ipcMain.on('createBoilerplate', (event, args) => {
    console.log(args);

    cloneTemplate(args.path[0], args.type);

    showNotification();
});

const showNotification = () => {
    const notification = {
        title: 'CFA',
        body: 'Installation was successful!',
    };

    new Notification(notification).show();
};
