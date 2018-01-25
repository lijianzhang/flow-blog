const webpack = require('webpack');
const env = require('./env');
const common = require('./webpack.common');

const debug = process.env.NODE_ENV !== 'production';

module.exports = function dll(dependencies) {
    const vendors = Object.keys(dependencies);
    const config = common({
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
