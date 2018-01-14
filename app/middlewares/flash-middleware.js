/*
 * @Author: lijianzhang
 * @Date: 2018-01-14 18:28:28
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-14 20:27:19
 * @flow
 */

import { type Context } from 'koa';

class FlashMessage {
    constructor(string: string = '') {
        const [type = 'info', message = ''] = string.split(':');
        this.type = type;
        this.message = message;
    }

    type: string;
    message: string;

    set info(message) {
        this.type = 'info';
        this.message = message;
    }

    set success(message) {
        this.type = 'success';
        this.message = message;
    }

    set error(message) {
        this.type = 'error';
        this.message = message;
    }

    toJSON() {
        return {
            type: this.type,
            message: this.message,
        };
    }

    toString() {
        return `${this.type}:${this.message}`;
    }
}

export default function flashMiddleware(key: string = 'flashMessage') {
    return async function flashFunc(ctx: Context, next: () => Promise<any>) {
        const flash = ctx.cookies.get(key);
        if (flash) {
            try {
                /** 中文需要转义 */
                ctx.flashMessage = new FlashMessage(Buffer.from((flash), 'base64').toString());
                ctx.state.flashMessage = ctx.flashMessage;
            } finally {
                ctx.cookies.set(key, '', { expires: new Date('1970') });
            }
        } else {
            ctx.flashMessage = new FlashMessage();
        }
        await next();
        if (ctx.status === 302 && ctx.flashMessage.message) {
            ctx.cookies.set(key, Buffer.from(ctx.flashMessage.toString()).toString('base64'));
        }
    };
}
