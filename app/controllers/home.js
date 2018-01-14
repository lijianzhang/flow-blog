/*
 * @Author: lijianzhang
 * @Date: 2018-01-06 23:29:41
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-14 17:37:57
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
        const articles = await ArticleModel.findAll({
            order: [['createdAt', 'DESC']],
        });
        this.ctx.render('home.njk', {
            module: 'home',
            articles,
        });
    }

    @App.router.get('/articles')
    async articles() {
        const articles = await ArticleModel.findAll({
            order: [['createdAt', 'DESC']],
        });
        const articlesByYear = {};
        articles.forEach((article) => {
            const year = article.createdAt.getFullYear();
            if (!articlesByYear[year]) articlesByYear[year] = [];
            articlesByYear[year].push(article);
        });
        this.ctx.render('articles.njk', {
            module: 'article',
            articlesByYear,
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
