/*
 * @Author: lijianzhang
 * @Date: 2018-01-14 18:28:28
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-14 19:26:19
 * @flow
 */

import { type Context } from 'koa';

export default function flashMiddleware(key: string = 'flashMessage') {
    return async function flashFunc(ctx: Context, next: () => Promise<any>) {
        const flash = ctx.cookies.get(key);
        if (flash) {
            try {
                ctx.flashMessage = JSON.parse(Buffer.from((flash), 'base64').toString());
                ctx.state.flashMessage = ctx.flashMessage;
            } finally {
                ctx.cookies.set(key, '', { expires: new Date('1970') });
            }
        }
        await next();
        if (ctx.status === 302 && ctx.flashMessage) {
            ctx.cookies.set(key, Buffer.from(JSON.stringify(ctx.flashMessage)).toString('base64'));
        }
    };
}
