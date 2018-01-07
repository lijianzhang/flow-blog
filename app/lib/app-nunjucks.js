/*
 * @Author: lijianzhang
 * @Date: 2018-01-07 17:39:48
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-07 18:42:03
 * @flow
 */

import nunjucks from 'nunjucks';
import App from './App';

// autoescape(默认值: true) 控制输出是否被转义
// throwOnUndefined(default: false) 当输出为 null 或 undefined 会抛出异常
// trimBlocks(default: false) 自动去除 block / tag 后面的换行符
// lstripBlocks(default: false) 自动去除 block / tag 签名的空格
// watch(默认值: false) 当模板变化时重新加载。使用前请确保已安装可选依赖 chokidar。
// noCache(default: false) 不使用缓存，每次都重新编译

type OptionsType = {
    ext?: string,
    noCache?: boolean,
    watch?: boolean,
    throwOnUndefined?: boolean,
    autoescape?: boolean,
    trimBlocks?: boolean,
    lstripBlocks?: boolean,
}

const defaultOptions: OptionsType = {
    ext: '',
    noCache: false,
    autoescape: true,
    watch: false,
    lstripBlocks: false,
    trimBlocks: false,
    throwOnUndefined: false,
};


/**
 *
 * @param {*} app
 * @param {*} path 路径
 * @param {*} opts 配置
 */
export default function createView(app: App, path: string, opts: OptionsType = {}) {
    opts = Object.assign({}, defaultOptions, opts);
    const {
        watch, noCache, ext, ...other
    } = opts;
    const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path, { watch, noCache }), other);
    app.context.render = function render(path: string, context: Object = {}) {
        if (opts.ext && !path.endsWith(opts.ext)) path = `${path}.${opts.ext}`;
        const data = Object.assign({}, this.state, context);
        const html = env.render(path, data);
        this.type = 'html';
        this.body = html;
        return html;
    };
    return env;
}
