const webpack = require('webpack');
const env = require('./env');
const baseConfig = require('./webpack.base');

const debug = process.env.NODE_ENV !== 'production';

module.exports = function dll(dependencies) {
    const vendors = Object.keys(dependencies);
    const config = baseConfig({
        entry: {
            vendors,
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', minChunks: 2 }),
            new webpack.DllPlugin({
                path: env.manifestDllPath,
                name: debug ? '[name]' : '[name]_[hash]',
            }),
        ],
    });

    return config;
};
