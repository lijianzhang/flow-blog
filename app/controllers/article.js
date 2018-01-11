import App from '../lib/App';
import ArticleModel from '../models/article';

export default class User extends App.Controller {
    @App.router.post('/article')
    async index() {
        const { content, title, userId } = this.ctx.request.body;
        const index = content.indexOf('<!-- more -->');
        if (index <= -1) {
            this.ctx.throw(400, '必须包含<!-- more -->用来截止描述内容位置');
        } else if (index === 0) {
            this.ctx.throw(400, '<!-- more -->前面必须有内容');
        }
        const article = await ArticleModel.create({ content, title, userId });
        this.ctx.body = article;
    }
}
