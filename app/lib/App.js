/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 22:01:41
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-06 23:27:27
 * @flow
 */

import Koa from 'koa';
import Sequelize from 'sequelize';
import sequelize from './db';
import BaseDBModel from './base-db-model';
import BaseController, { router } from './base-controller';

type ModelsHashInterface = {
    [name: string]: typeof BaseDBModel
}

export default class App extends Koa {
    static Controller = BaseController;
    static router = router;
    sequelize: Sequelize = sequelize
    models: ModelsHashInterface = sequelize.models
}

