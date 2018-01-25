/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 17:07:53
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-25 21:07:31
 * @flow
 */

import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import redisStore from 'koa-redis';
import session from 'koa-generic-session';
import path from 'path';
import CSRF from 'koa-csrf';
import serve from 'koa-static';
import App from './lib/App';
import router from './controllers';
import nunjucks from './lib/app-nunjucks';
import devResource from './middlewares/dev-resource-middleware';
import commonState from './middlewares/common-state-middleware';
import flash from './middlewares/flash-middleware';
import config from '../config';
import env from '../env';

const app = new App();

app.keys = ['blog', 'flow'];

if (app.isDev) {
    app.use(devResource());
}

app.use(serve(env.distPath));


app.use(logger());

app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        ctx.throw(404);
    }
});

app.use(session({
    store: redisStore(),
    key: 'dio.blog.sid',
    prefix: 'dio.blog.sess',
}));

app.use(bodyparser({
    formLimit: '1mb',
    jsonLimit: '1mb',
}));

app.use(new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
    disableQuery: false,
}));


const nunjuck = nunjucks(app, path.resolve(__dirname, 'views'), { watch: true, noCache: app.isDev });

/** 配置资源文件路径 */
nunjuck.addGlobal('assets', (string: string) => {
    if (app.isDev) {
        if (string.endsWith('css')) return '';
        return `${config.publicPath}${string}`;
    }
    const manfiest = require(env.distPath + '/manifest-dev.json'); //eslint-disable-line
    return manfiest[string];
});

app.use(commonState);

app.use(flash());

app.use(router.routes());

app.listen('3001');
