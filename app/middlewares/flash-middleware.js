/*
 * @Author: lijianzhang
 * @Date: 2018-01-14 18:28:28
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-14 21:04:01
 * @flow
 */

import { type Context } from 'koa';

class FlashMessage {
    constructor(key: string, ctx: Context) {
        this.key = key;
        this.ctx = ctx;

        const flash = ctx.cookies.get(key);
        if (flash) {
            const string = Buffer.from(flash, 'base64').toString();
            const [type = 'info', message = ''] = string.split(':');
            this.type = type;
            this.message = message;
            ctx.cookies.set(key, '', { expires: new Date('1970') });
        }
    }
    key: string;
    ctx: Context;
    type: string = 'info';
    message: string;

    set info(message) {
        this.type = 'info';
        this.message = message;
        this.setCookie();
    }

    set success(message) {
        this.type = 'success';
        this.message = message;
        this.setCookie();
    }

    set error(message) {
        this.type = 'error';
        this.message = message;
        this.setCookie();
    }

    setCookie() {
        this.ctx.cookies.set(this.key, Buffer.from(this.toString()).toString('base64'));
    }

    toJSON() {
        return {
            type: this.type,
            message: this.message,
        };
    }

    toString() {
        if (!this.type || !this.message) return '';
        return `${this.type}:${this.message}`;
    }
}

export default function flashMiddleware(key: string = 'flashMessage') {
    return async function flashFunc(ctx: Context, next: () => Promise<any>) {
        ctx.flashMessage = new FlashMessage(key, ctx);
        ctx.state.flashMessage = ctx.flashMessage;
        await next();
    };
}
