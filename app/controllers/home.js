/*
 * @Author: lijianzhang
 * @Date: 2018-01-06 23:29:41
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-11 23:04:59
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

    @App.router.get('/articles/:id')
    async article() {
        const { id } = this.ctx.params;
        const article = await ArticleModel.findById(id);
        if (!article) this.ctx.throw(404);
        this.ctx.render('article.njk', {
            module: 'article',
            article,
        });
    }
}
