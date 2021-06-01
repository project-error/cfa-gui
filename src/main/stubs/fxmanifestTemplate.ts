import { ProjectObject } from '../types/project';

export const createFxmaniest = (project: ProjectObject) => {
    if (project.resourceTemplate == 'TypeScript') {
        return `
fx_version "cerulean"
game "gta5"
            
author "${project.resourceAuthor}"
version "${project.resourceVersion}"
description "${project.resourceDescription}"
            
client_script "dist/client/client.js"
server_script "dist/server/server.js"
            `;
    } else {
        return `
fx_version "cerulean"
game "gta5"
            
author "${project.resourceAuthor}"
version "${project.resourceVersion}"
description "${project.resourceDescription}"
            
client_script "client/*.lua"
server_script "server/*.lua"
        `;
    }
};
