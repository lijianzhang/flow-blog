/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 17:07:53
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-01 22:58:03
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

router.get('/', async (ctx) => {
    await app.models.User.create({});
    ctx.body = await app.models.User.all();
});

app.use(router.routes());


app.listen('3001');
