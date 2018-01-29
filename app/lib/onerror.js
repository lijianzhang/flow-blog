import http from 'http';
import { type Context } from 'koa';

export default function onContextError(err: Error, ctx: Context) {
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
    switch (ctx.type) {
    case 'text/html':
    case 'html': {
        if (status === 404) body = ctx.render('404.njk');
        else if (status === 400) {
            ctx.flashMessage.error = err.message;
            ctx.redirect('back');
        } else {
            body = ctx.render('error.njk', { error: err, status });
        }
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
    ctx.res.end(body);
}
