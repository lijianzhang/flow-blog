/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 20:27:19
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-02 23:04:31
 * @flow
 */

import Model from 'sequelize/lib/model';

import type { DefineOptions, DataTypes } from 'sequelize';
import sequelize from './db';

type valueType = DataTypes;


type configType = {
    type: valueType, // 字段类型
    defaultValue: ?any,
    allowNull: ?boolean,
    primaryKey: ?boolean,
    autoIncrement?: boolean,
    comment: ?string,
    field: ?string,
    unique: ?boolean | string,
    values: ?any[],
    references: ?{
        model: Model,
        key: string,
        deferrable: any,
    }
}


type DefineConfig = DefineOptions<any> & { sequelize?: typeof sequelize}


class BaseDBModel extends Model {
    static fields: {
        [key: string]: configType
    };
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

/**
 *
 *
 * @export
 * @param {configType} config
 * @returns {Function}
 */
export function Attr(config: configType): Function {
    return function AttrDecorator(model: BaseDBModel, key: string, decorator: Object) {
        if (!model.constructor.fields) model.constructor.fields = {};
        if (!model.constructor.fields[key]) {
            model.constructor.fields[key] = config;
        } else {
            throw new Error(`${model.constructor.name}的${key} 已经被定义了`);
        }
        return decorator;
    };
}
