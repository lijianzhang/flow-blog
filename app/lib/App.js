/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 22:01:41
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-01 22:50:35
 * @flow
 */

import Koa from 'koa';
import Sequelize from 'sequelize';
import sequelize from './db';
import BaseDBModel from './base-db-model';

type ModelsHashInterface = {
    [name: string]: typeof BaseDBModel
}


export default class App extends Koa {
    sequelize: Sequelize = sequelize
    models: ModelsHashInterface = sequelize.models
}

