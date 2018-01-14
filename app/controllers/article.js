import App from '../lib/App';
import ArticleModel from '../models/article';

export default class Article extends App.Controller {
    @App.router.post('/articles')
    async index() {
        const { content, title } = this.ctx.request.body;
        if (!this.ctx.session.user) this.ctx.throw(400);
        let article = await ArticleModel.findOne({ where: { title } });
        if (article) {
            this.ctx.flashMessage = '标题已存在';
            this.ctx.redirect('back');
            return;
        }

        const index = content.indexOf('<!-- more -->');
        if (index <= -1) {
            this.ctx.throw(400, '必须包含<!-- more -->用来截止描述内容位置');
        } else if (index === 0) {
            this.ctx.throw(400, '<!-- more -->前面必须有内容');
        }
        const { id: userId } = this.ctx.session.user;
        article = await ArticleModel.create({ content, title, userId });
        this.ctx.body = article;
    }
}
