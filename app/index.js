/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 17:07:53
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-02 23:11:20
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
    try {
        await app.models.User.create(ctx.query);
        ctx.body = await app.models.User.all();
    } catch (error) {
        ctx.body = error.message;
    }
});

app.use(router.routes());


app.listen('3001');
