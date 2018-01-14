import App from '../lib/App';

export default class Admin extends App.Controller {
    async __before() {
        if (this.ctx.session.user) {
            this.next();
        } else {
            this.ctx.redirect('/login');
        }
    }

    @App.router.get('/admin')
    async index() {
        this.ctx.render('admin.njk');
    }
}
