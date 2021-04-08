import * as cp from 'child_process';
import rimraf from 'rimraf';

export function cloneTemplate(path: string, type: 'TypeScript' | 'JavaScript') {
    cp.execSync('git clone https://github.com/itschip/cfa-templates.git', {
        cwd: path,
        windowsHide: true,
    });
}
