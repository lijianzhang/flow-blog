/*
 * @Author: lijianzhang
 * @Date: 2018-01-06 21:18:26
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-06 23:52:55
 * @flow
 */


import { type Context } from 'koa';
import Router from 'koa-router';


export default class BaseController {
    static prefix: string = '';
    static sensitive: boolean = false;
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
            const middleware = async (ctx: Context, next: () => Promise<void>) => {
                const ctl = new this(ctx, next);
                await (ctl: any)[func](ctx, next);
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


    constructor(ctx: Context, next: () => Promise<any>) {
        this.ctx = ctx;
        this.next = next;
    }

    ctx: Context;
    next: () => Promise<any>;
}

const METHOD_TYPES = ['get', 'put', 'patch', 'post', 'delete', 'all'];

function decorateRoter(path: string, methods: string[]) {
    return (target, key, descriptor) => {
        methods.forEach(method => target.constructor.methods.push({ path, func: key, method }));
        return descriptor;
    };
}

export const router = {
    methods(path: string, methods: string | string[]) {
        if (typeof methods === 'string') methods = [methods];
        decorateRoter(path, methods);
    },
};

METHOD_TYPES.forEach((method) => {
    (router: any)[method] = (path = '/', ...middleware) => decorateRoter(path, [method], ...middleware);
});