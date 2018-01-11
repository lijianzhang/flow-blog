const webpack = require('webpack');
const fs = require('fs');
const env = require('../env');
const packageDependencies = require('../package.json').dependencies;

const NEED_BUILD_MODULES = ['react', 'react-dom', 'antd', 'axios', 'react-router-dom'];

const dependencies = NEED_BUILD_MODULES.reduce((info, key) => {
    if (!packageDependencies[key]) throw new Error(`package.json中找不到${key}依赖信息`);
    info[key] = packageDependencies[key];
    return info;
}, {});

function taskDll(cb) {
    let preDependencies = {};
    /**
   * 加载上次打包dll的依赖数据
   */
    if (fs.existsSync(env.perdependencies)) {
        preDependencies = require(env.perdependencies);
    }

    let needCompile = false;

    if (!preDependencies[env.NODE_ENV]) {
        needCompile = true;
    } else if (JSON.stringify(dependencies) !== JSON.stringify(preDependencies[env.NODE_ENV])) {
        needCompile = true;
    }

    if (needCompile) {
        console.log('依赖项📦需要打包,(￣.￣)');
        console.time('依赖项,打包耗时');
        const webpackDll = require('../webpack.dll.config')(dependencies);
        const compiler = webpack(webpackDll);
        compiler.run((err, stats) => {
            if (!err) {
                fs.writeFileSync(env.perdependencies, JSON.stringify({ [env.NODE_ENV]: dependencies }), 'utf8');
                console.timeEnd('依赖项,打包耗时');
                cb && cb();
            } else {
                throw err;
            }
            if (stats) {
                console.log(stats.toString({
                    chunks: false, // 使构建过程更静默无输出
                    colors: true, // 在控制台展示颜色
                }));
            }
        });
    } else {
        console.log('依赖项📦没有改变,进行下个Task👏👏👏👏');
        cb && cb();
    }
}

function taskWebpack() {
    const webpackConfig = require('../webpack.config');
    console.log('===========项目开始打包==============');
    console.time('项目打包耗时:');
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
            throw err;
            
        } else {
            console.timeEnd('项目打包耗时:');
            console.log('===========项目打包结束==============');
        }
        if (stats) {
            console.log(stats.toString({
                chunks: false,  // 使构建过程更静默无输出
                colors: true    // 在控制台展示颜色
            }));
        }
        
        
    });
}

const executeDll = env.DLL;
const executeWebpack = env.WEBPACK;

if (executeDll && executeWebpack) {
    taskDll(taskWebpack);
} else if (executeDll) {
    taskDll();
} else {
    taskWebpack();
}
