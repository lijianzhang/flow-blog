/*
 * @Author: lijianzhang
 * @Date: 2018-01-06 23:29:41
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-07 19:07:24
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
    async index() {
        this.ctx.render('home.njk');
    }
}
