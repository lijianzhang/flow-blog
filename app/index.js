/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 17:07:53
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-06 23:43:47
 * @flow
 */

import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import App from './lib/App';
import UserController from './controllers/user';
import HomeController from './controllers/home';

const app = new App();

app.use(logger());

app.use(bodyparser({
    formLimit: '1mb',
    jsonLimit: '1mb',
}));


HomeController.use(UserController.routes());
const routes = HomeController.routes();
console.log(routes.router);
app.use(routes);


app.listen('3001');
