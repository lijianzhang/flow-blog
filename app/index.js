/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 17:07:53
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-01 23:49:43
 * @flow
 */

import bodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import App from './lib/App';

const app = new App();

app.use(bodyparser({
    formLimit: '1mb',
    jsonLimit: '1mb',
}));

const router = new Router();

let num = 0;

router.get('/', async (ctx) => {
    num += 1;
    await app.models.User.create({ firstName: `${num}` });
    ctx.body = await app.models.User.all();
});

app.use(router.routes());


app.listen('3001');
