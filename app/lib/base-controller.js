/*
 * @Author: lijianzhang
 * @Date: 2018-01-06 21:18:26
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-14 20:03:59
 * @flow
 */


import Router from 'koa-router';
import App, { type AppContext } from './App';

export default class BaseController {
    static prefix: string = '';
    static sensitive: boolean;
    static strict: boolean = true;
    static Router = Router;
    static subRoutes = [];

    static methods: Array<{
        func: Function,
        method: 'get' | 'patch' | 'put' | 'post' | 'delete' | 'all',
        path: string,
    }> = [];

    static routes() {
        const router = new Router({
            prefix: this.prefix,
            sensitive: this.sensitive,
            strict: this.strict,
        });

        this.methods.forEach(({ func, method, path }) => {
            const middleware = async (ctx: AppContext, next: () => Promise<void>) => {
                let beforeNext = next;
                let afterNext = next;
                const ctl = new this(ctx, next);

                if (ctl.__after) {
                    afterNext = async () => {
                        ctl.next = next;
                        await ctl.__after(ctx, next);
                    };
                }

                beforeNext = async () => {
                    ctl.next = next;
                    await (ctl: any)[func](ctx, afterNext);
                };
                if (ctl.__before) {
                    ctl.next = beforeNext;
                    await ctl.__before(ctx, beforeNext);
                } else {
                    await beforeNext();
                }
            };

            (router: any)[method](path, middleware);
        });


        if (this.subRoutes.length) {
            this.subRoutes.forEach((args) => {
                router.use(...args);
            });
            this.subRoutes = [];
        }


        return router.routes();
    }

    static use(...args: Array<any>) {
        return this.subRoutes.push(args);
    }


    constructor(ctx: AppContext, next: () => Promise<any>) {
        this.ctx = ctx;
        this.next = next;
    }

    ctx: AppContext;
    next: () => Promise<any>;
    __before: (ctx: AppContext, next: () => Promise<any>) => Promise<any>;
    __after: (ctx: AppContext, next: () => Promise<any>) => Promise<any>;
    app: App;
}

const METHOD_TYPES = ['get', 'put', 'patch', 'post', 'delete', 'all'];

function decorateRoter(path: string, methods: string[]) {
    return (target, key, descriptor) => {
        methods.forEach(method => target.constructor.methods.push({ path, func: key, method }));
        return descriptor;
    };
}

export const router = {
    route(path: string, methods: string | string[]) {
        if (typeof methods === 'string') methods = [methods];
        decorateRoter(path, methods);
    },
};

METHOD_TYPES.forEach((method) => {
    (router: any)[method] = (path = '/', ...middleware) => decorateRoter(path, [method], ...middleware);
});
