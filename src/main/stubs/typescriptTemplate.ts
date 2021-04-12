export const createFxmaniest = (project: any) => {
    if (project.template == 'TypeScript') {
        return `
fx_version "cerulean"
game "gta5"
			
author "${project.author}"
version "${project.version}"
description "${project.description}"
			
client_script "dist/client/*.client.js"
server_script "dist/server/*.server.js"
`;
    } else {
        return `
fx_version "cerulean"
game "gta5"
			
author "${project.author}"
version "${project.version}"
description "${project.description}"
			
client_script "client/client.js"
server_script "server/server.js"
		`;
    }
};
