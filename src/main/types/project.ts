export type ProjectObject = {
    resourceName: string;
    resourcePath: string;
    resourceDescription: string;
    resourceVersion: string;
    resourceAuthor: string;
    resourcePackages: string[];
    resourceTemplate: string;
};

export type CFAProjectInfo = {
    name: string;
    author: string;
    version: string;
    description: string;
};

export type CFAProjectOptions = {
    template: string;
    projectPath: string;
    project: CFAProjectInfo;
    templateOptions: { [key: string]: any };
};
