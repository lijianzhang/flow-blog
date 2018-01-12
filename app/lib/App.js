/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 22:01:41
 * @Last Modified by: 天吾
 * @Last Modified time: 2018-01-12 10:39:52
 * @flow
 */

import Koa, { type Context } from 'koa';
import http from 'http';
import Sequelize, { Model } from 'sequelize';
import sequelize from './db';
import BaseController, { router } from './base-controller';

type ModelsHashInterface = {
    [name: string]: typeof Model;
}

function onContextError(err: Error, ctx: Context) {
    let { status } = ctx;
    if (typeof err.status === 'number') status = err.status;
    else if (err.code === 'ENOENT') status = 404;
    else if (err.name.indexOf('Sequelize') === 0) status = 500;
    else if (typeof err.status !== 'number' || !http.STATUS_CODES[err.status]) {
        status = 500;
    }
    if (String(status)[0] === '5') ctx.app.emit('error', err, ctx);


    ctx.status = status;

    let body: string;
    ctx.type = ctx.accepts('html', 'json', 'application/json', 'text') || 'html';
    if (ctx.app.env === 'development') {
        switch (ctx.type) {
        case 'text/html':
        case 'html': {
            if (status === 404) body = ctx.render('404.njk');
            else body = ctx.render('error.njk', { error: err, status });
            break;
        }
        case 'application/json':
        case 'json': {
            body = JSON.stringify({
                code: ctx.status,
                message: err.message,
                statck: err.stack,
            });
            break;
        }
        default:
            body = err.message;
        }
    }
    ctx.res.end(body);
}


export default class App extends Koa {
    static Controller = BaseController;
    static router = router;

    sequelize: Sequelize = sequelize
    models: ModelsHashInterface = sequelize.models

    constructor() {
        super();
        this.context.onerror = function error(error: mixed) {
            if (error === null) return;
            onContextError(error, this);
        };
    }

    get isDev(): boolean {
        return this.env === 'development';
    }
}

export type AppContext = Context;
