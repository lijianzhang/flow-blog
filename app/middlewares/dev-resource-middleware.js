/*
 * @Author: lijianzhang
 * @Date: 2018-01-13 19:11:32
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-13 19:11:32
 * @flow
 */

import proxy from 'koa-proxy';
import config from '../../config/index';

export default function devResource() {
    return proxy({
        host: `${config.staticHost}:${config.staticPort}/`,
        match: new RegExp(`(^(${config.publicPath})|(__webpack_dev_server__)/)|(hot-update.json)`),
    });
}

