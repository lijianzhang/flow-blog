const webpack = require('webpack');
const path = require('path');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const env = require('./env');
const devConfig = require('../config');
const getLessVariables = require('./scripts/get-less-variables.js');

const debug = env.debug;

module.exports = function common(config) {
    return {
        entry: config.entry,
        output: config.output || {
            // webpack 如何输出结果的相关选项

            path: env.distPath, // string
            // 所有输出文件的目标路径 必须是绝对路径（使用 Node.js 的 path 模块）
            publicPath: devConfig.publicPath, // string
            filename: debug ? '[name].js' : '[name]_[hash].js', // string
            // 「入口分块(entry chunk)」的文件名模板（出口分块？）
            chunkFilename: debug ? '[name].js' : '[name]_[hash].js',
            library: debug ? '[name]' : '[name]_[hash]',
        },
        module: {
            // 关于模块配置

            rules: [
                // 模块规则（配置 loader、解析器等选项）
                debug
                    ? {
                        test: /\.(js|jsx)$/,
                        enforce: 'pre',
                        use: [
                            {
                                options: {
                                    formatter: eslintFormatter,
                                    useEslintrc: true,
                                    failOnError: true,
                                },
                                loader: require.resolve('eslint-loader'),
                            },
                        ],
                    }
                    : {},
                {
                    test: /\.jsx?$/,
                    include: [path.resolve(__dirname, 'app')],
                    use: [require.resolve('babel-loader')],
                },
                {
                    test: /\.css$/,
                    use: debug ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract(['css-loader']),
                },
                {
                    test: /\.less$/i,
                    use: debug
                        ? ['style-loader', 'css-loader', {
                            loader: 'less-loader',
                            options: {
                                globalVars: getLessVariables('./src/less/var.less')
                            }
                        }]
                        : ExtractTextPlugin.extract(['css-loader', {
                            loader: 'less-loader',
                            options: {
                                globalVars: getLessVariables(config.themePath)
                            }
                        }]),
                },
                {
                    test: /\.(jpe?g|svg|png|gif|webp)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    }],
                },
            ],
            /* 高级模块配置（点击展示） */
        },
        resolve: {
            // 解析模块请求的选项 （不适用于对 loader 解析）

            modules: ['node_modules', path.resolve(__dirname, 'app')],
            // 用于查找模块的目录

            extensions: ['.js', '.json', '.jsx', '.css'],
            // 使用的扩展名

            /* 高级解析选项（点击展示） */
        },
        plugins: [
            new ExtractTextPlugin({
                filename: debug ? '[name].css' : '[name]_[contenthash].css',
                disable: debug,
            }),
            new ProgressBarPlugin(),
            debug
                ? () => {}
                : new webpack.optimize.UglifyJsPlugin({
                    // parallel: true,
                    // uglifyOptions: {
                    //   compress: true,
                    // },
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        warnings: false,
                        // 删除所有的 `console` 语句
                        // 还可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                    },
                }),
            debug ? () => {} : new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(debug ? 'development' : 'production'),
                },
            }),
        ].concat(config.plugins),
        devtool: config.devtool || 'eval', // 'eval', // enum
        // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试 牺牲了构建速度的 `source-map'
        // 是最详细的。

        context: config.context || __dirname, // string（绝对路径！）
        // webpack 的主目录 entry 和 module.rules.loader 选项 相对于此目录解析

        target: 'web', // 枚举
        // 包(bundle)应该运行的环境 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)

        externals: config.externals,
        // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

        // stats: 'errors-only', // 精确控制要显示的 bundle 信息
    };
};
