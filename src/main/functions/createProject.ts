import fs from 'fs-extra';
import { createFxmaniest } from '../stubs/createFxmanifest';
import { CFAProjectOptions } from '../types/project';
import { Notification } from 'electron';
import axios from 'axios';

export async function createProject(options: CFAProjectOptions) {
    console.log('Creating project ...');
    let { data } = await axios.get(
        `https://registry.npmjs.org/${options.template}/latest`,
    );
    console.log('Fetched data from NPM!');
    console.log(data);

    // Checks if the npm package has the "cfa" keyword
    if (data?.keywords?.includes('cfa')) {
    }
}
