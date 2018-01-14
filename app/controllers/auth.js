import App from '../lib/App';
import UserModel from '../models/user';

export default class Auth extends App.Controller {
    @App.router.get('/login')
    async login() {
        this.ctx.render('login.njk');
    }

    @App.router.post('/auth/sign_in')
    async signIn() {
        const { username, password } = this.ctx.request.body;
        if (username && password) {
            const user: UserModel = await UserModel.findOne({ where: { username } });
            if (user && user.verifyPassword(password)) {
                this.ctx.session.user = user;
                this.ctx.flashMessage.error = '登录成功';
                this.ctx.redirect('/admin');
                return;
            }
        }
        this.ctx.flashMessage.error = '无效的账号密码';
        this.ctx.redirect('back');
    }

    @App.router.get('/sign_out')
    async signOut() {
        this.ctx.session.user = null;
        this.ctx.redirect('/');
    }
}
