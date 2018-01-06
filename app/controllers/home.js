/*
 * @Author: lijianzhang
 * @Date: 2018-01-06 23:29:41
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-06 23:49:44
 * @flow
 */

import App from '../lib/App';

/**
 * 首页
 *
 * @export
 * @class Home
 * @extends {App.Controller}
 */
export default class Home extends App.Controller {
    static prefix = '';

    @App.router.get('/')
    index() {
        this.ctx.body = '首页';
    }

    @App.router.get('/test')
    async test() {
        this.ctx.body = 'test';
    }
}
