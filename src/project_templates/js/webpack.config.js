//const webpack = require('webpack');
const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');

const client = {
    entry: './client/client.js',
    optimization: {
        minimize: true,
    },
    resolve: {
        extensions: ['.js'],
    },
    output: {
        path: path.resolve(buildPath, 'client'),
        filename: '[contenthash].client.js',
    },
};

const server = {
    entry: './server/server.js',
    optimization: {
        minimize: true,
    },
    resolve: {
        extensions: ['.js'],
    },
    output: {
        path: path.resolve(buildPath, 'server'),
        filename: '[contenthash].server.js',
    },
};

module.exports = [client, server];
