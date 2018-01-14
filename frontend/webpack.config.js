const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const env = require('./env');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const devConfig = require('../config');

console.log('process.env.CI_BUILD_REF: ', process.env.CI_BUILD_REF);

const tag = process.env.CI_BUILD_REF || 'dev';

const path = require('path');

const debug = env.debug;

console.log(env.CDN_PATCH)

manifest = new WebpackAssetsManifest({
    publicPath: env.CDN_PATCH || devConfig.publicPath,
    output: `manifest-${tag.slice(0, 7)}.json`,
});


const config = common({
    entry: { app: ['./src'] },

    devtool: debug ? 'source-map' : null,
    // 牺牲了构建速度的 `source-map' 是最详细的。

    context: __dirname,

    target: 'web', // 枚举

    stats: 'errors-only', // 精确控制要显示的 bundle 信息

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'app', minChunks: 4, children: true }),
        manifest,
    ],
});

if (debug) {
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    );
    config.devServer = {
        setup(app) {
            app.use(errorOverlayMiddleware());
            app.use(noopServiceWorkerMiddleware());
        },
        host: '0.0.0.0',
        publicPath: devConfig.publicPath,
        port: devConfig.staticPort || 3000,
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        // ...
    };
}

if (env.analyzer) {
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
