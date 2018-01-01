/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 20:27:19
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-01 22:50:05
 * @flow
 */

import Model from 'sequelize/lib/model';
import type { DefineAttributes, DefineOptions } from 'sequelize';
import sequelize from './db';

type DefineConfig = DefineOptions<any> & { sequelize?: typeof sequelize}

class BaseDBModel extends Model<BaseDBModel> {
    static fields: DefineAttributes;
    static config: DefineConfig;

    static async findOneByID(): Promise<BaseDBModel> {
        const model = await this.findAll();
        return model;
    }

    static init() {
        const config = this.config || {};
        if (!config.sequelize) config.sequelize = sequelize;
        return Model.init.call(this, this.fields, config);
    }
}


export default BaseDBModel;
