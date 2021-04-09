import * as cp from 'child_process';
import rimraf from 'rimraf';

export async function cloneTemplate(
    path: string,
    type: 'TypeScript' | 'JavaScript',
) {
    await cp.exec('git clone https://github.com/itschip/cfa-templates.git', {
        cwd: path,
        windowsHide: true,
    });
}
