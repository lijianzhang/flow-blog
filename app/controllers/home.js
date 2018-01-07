/*
 * @Author: lijianzhang
 * @Date: 2018-01-06 23:29:41
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-07 22:54:51
 * @flow
 */

import App from '../lib/App';
import ArticleModel from '../models/article';

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
        const articles = await ArticleModel.findAll();
        this.ctx.render('home.njk', {
            module: 'home',
            articles,
        });
    }
}
