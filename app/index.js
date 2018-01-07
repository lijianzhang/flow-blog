/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 17:07:53
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-07 23:01:07
 * @flow
 */

import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import path from 'path';
import serve from 'koa-static';

import App from './lib/App';
import router from './controllers';
import nunjucks from './lib/app-nunjucks';


const app = new App();

app.use(logger());

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
