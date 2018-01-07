import App from '../lib/App';
import ArticleModel from '../models/article';

export default class User extends App.Controller {
    @App.router.get('/article')
    async index() {
        const { content, title, userId } = this.ctx.query;
        const article = await ArticleModel.create({ content, title, userId });
        this.ctx.body = article;
    }
}
