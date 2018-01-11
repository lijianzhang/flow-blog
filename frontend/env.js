const path = require('path');

const basePath = path.resolve(__dirname);

const distPath = path.join(__dirname, 'dist');

const dllPath = path.resolve(__dirname, 'dll');

const manifestDllPath = path.resolve(__dirname, 'build', 'manifest.dll.json');
const perdependencies = path.resolve(__dirname, 'build', 'dependencies.json');
const versionsPath = path.resolve(__dirname, 'dll', 'versions.json');
/**
 * node环境
 */
const NODE_ENV = process.env.NODE_ENV || 'development';

const MOCK = process.env.MOCK || false;

/**
 * 是否开放模式
 */
const debug = NODE_ENV === 'development';

/**
 * 资源路径
 */
const CDN_PATCH = process.env.CDN_PATCH || '/';

const env = {
    basePath,
    dllPath,
    versionsPath,
    distPath,
    NODE_ENV,
    debug,
    CDN_PATCH,
    MOCK,
    manifestDllPath,
    perdependencies,
};

module.exports = Object.assign(env, process.env);
