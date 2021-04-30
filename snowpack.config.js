/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    // mount: {
    //     public: { url: '/', static: true },
    //     src: { url: '/dist' },
    // },
    extends: 'electron-snowpack/config/snowpack.js',
    plugins: [
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-typescript',
        '@snowpack/plugin-sass',
    ],
};

console.log(`[esbuild] Building CLI application`);
require('esbuild')
    .build({
        entryPoints: ['./src/cli/index.ts'],
        bundle: true,
        minify: true,
        outfile: 'bin/cli.js',
        platform: 'node',
    })
    .then(({ warnings }) => {
        const fs = require('fs-extra');
        warnings.forEach((warn) => console.log(`[CLI Build Warning] ${warn}`));
        fs.copySync('./src/cli/static', './bin/');
    })
    .catch(() => process.exit(1));
