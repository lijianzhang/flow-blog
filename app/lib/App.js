/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 22:01:41
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-13 19:38:28
 * @flow
 */

import Koa, { type Context } from 'koa';
import Sequelize, { Model } from 'sequelize';
import sequelize from './db';
import BaseController, { router } from './base-controller';
import onerror from './onerror';

type ModelsHashInterface = {
    [name: string]: typeof Model;
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
            onerror(error, this);
        };
    }

    get isDev(): boolean {
        return this.env === 'development';
    }
}

export type AppContext = Context;
