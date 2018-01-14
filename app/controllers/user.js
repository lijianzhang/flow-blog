import App from '../lib/App';
import UserModel from '../models/user';

export default class User extends App.Controller {
    @App.router.get('/user')
    async index() {
        const { username, password } = this.ctx.query;
        let user = await UserModel.findOne({ where: { username } });
        if (user) this.ctx.throw(400, '用户名已被注册');
        user = await UserModel.create({ username, password });
        this.ctx.body = user;
    }

    @App.router.get('/user/verify')
    async verify() {
        const { username, password } = this.ctx.query;
        const user = await UserModel.verify(username, password);
        this.ctx.body = user;
    }
}
