export type ProjectObject = {
    path: string | null;
    resource: string | null;
    author: string | null;
    version: string | null;
    description: string | null;
    templateType: string | null;
    packages?: string[] | null;
};
