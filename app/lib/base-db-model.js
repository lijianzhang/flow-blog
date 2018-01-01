/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 20:27:19
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-02 01:19:31
 * @flow
 */

import Model from 'sequelize/lib/model';
import type { DefineAttributes, DefineOptions } from 'sequelize';
import sequelize from './db';

type DefineConfig = DefineOptions<any> & { sequelize?: typeof sequelize}


class BaseDBModel extends Model {
    static fields: DefineAttributes;
    static config: DefineConfig;
    ccc: string;

    static async findOneByID(): Promise<BaseDBModel> {
        const model = await this.findAll();
        return model;
    }

    static init() {
        if (!this.fields) throw new Error(`${this.name}Model: 必须设置fields`);
        const config = this.config || {};
        if (!config.sequelize) config.sequelize = sequelize;
        return Model.init.call(this, this.fields, config);
    }
}


export default BaseDBModel;
