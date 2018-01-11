/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 17:07:53
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-12 00:35:34
 * @flow
 */

import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import redisStore from 'koa-redis';
import session from 'koa-generic-session';
import path from 'path';
import proxy from 'koa-proxy';
import serve from 'koa-static';
import CSRF from 'koa-csrf';
import App from './lib/App';
import router from './controllers';
import nunjucks from './lib/app-nunjucks';
import config from '../config';

const app = new App();
app.keys = ['blog', 'flow'];
app.use(logger());
if (app.env === 'development') {
    app.use(proxy({
        host: `${config.staticHost}:${config.staticPort}/`,
        match: new RegExp(`^(${config.publicPath})|(hot-update)`),
    }));
}

app.use(session({
    store: redisStore(),
    key: 'blog.sid',
    prefix: 'blog.sess',
}));

app.use(new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
    disableQuery: false,
}));

app.use(bodyparser({
    formLimit: '1mb',
    jsonLimit: '1mb',
}));

nunjucks(app, path.resolve(__dirname, 'views'), { watch: true, noCache: app.env === 'development' });

app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        ctx.throw(404);
    }
});
app.use(serve(path.resolve(__dirname, 'dist')));
app.use(router.routes());

app.listen('3001');
