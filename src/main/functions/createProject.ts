import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import https from 'https';

import { createFxmaniest } from '../stubs/createFxmanifest';
import { CFAProjectOptions } from '../types/project';
import { Notification } from 'electron';
import axios from 'axios';
import tar from 'tar';

function ExtractRemoteArchive(url: string, path: string): Promise<void> {
    let resolve: any, reject: any;
    const promise = new Promise<void>((res: any, rej: any) => {
        resolve = res;
        reject = rej;
    });

    https.get(url, function (res) {
        res.pipe(
            tar.x({
                cwd: path,
            }),
        )
            .on('finish', resolve)
            .on('error', reject);
    });

    return promise;
}

export async function createProject(options: CFAProjectOptions, isCLI = false) {
    console.log('Creating project ...');
    let { data } = await axios.get(
        `https://registry.npmjs.org/${options.template}/latest`,
    );
    console.log('Fetched data from NPM!');
    console.log(data);

    // Checks if the npm package has the "cfa" keyword
    if (!data?.keywords?.includes('cfa')) {
        await fs.ensureDir(
            path.join(os.tmpdir(), '/cfa-gui/' + options.template),
        );
        let entries = await fs.readdir(
            path.join(os.tmpdir(), '/cfa-gui/' + options.template),
        );
        if (!entries.includes(!data?.version)) {
            await fs.ensureDir(
                path.join(
                    os.tmpdir(),
                    '/cfa-gui/' + options.template,
                    data?.version,
                ),
            );
            console.log(data?.dist?.tarball);
            console.log(
                path.join(
                    os.tmpdir(),
                    '/cfa-gui/' + options.template,
                    data?.version,
                ),
            );

            await ExtractRemoteArchive(
                data?.dist?.tarball,
                path.join(
                    os.tmpdir(),
                    '/cfa-gui/' + options.template,
                    data?.version,
                ),
            );
        }
    }
}
