/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    /*  mount: {
        public: { url: '/', static: true },
        src: { url: '/build' },
    }, */
    extends: 'electron-snowpack/config/snowpack.js',
    plugins: [
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-typescript',
        '@snowpack/plugin-sass',
    ],
};
