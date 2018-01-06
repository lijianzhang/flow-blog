import App from '../lib/App';

export default class User extends App.Controller {
    @App.router.get('/user')
    index() {
        this.ctx.body = '123';
    }
}
