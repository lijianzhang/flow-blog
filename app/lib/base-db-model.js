/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 20:27:19
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-02 22:58:53
 * @flow
 */

import Model from 'sequelize/lib/model';
import {
    ABSTRACT,
    STRING,
    CHAR,
    TEXT,
    NUMBER,
    TINYINT,
    SMALLINT,
    MEDIUMINT,
    INTEGER,
    BIGINT,
    FLOAT,
    TIME,
    DATE,
    DATEONLY,
    BOOLEAN,
    NOW,
    BLOB,
    DECIMAL,
    UUID,
    UUIDV1,
    UUIDV4,
    HSTORE,
    JSON,
    JSONB,
    VIRTUAL,
    ARRAY,
    ENUM,
    RANGE,
    REAL,
    DOUBLE,
    GEOMETRY,
    GEOGRAPHY,
} from 'sequelize/lib/data-types';
import type { DefineOptions } from 'sequelize';
import sequelize from './db';

type valueType = typeof ABSTRACT | typeof STRING | typeof CHAR | typeof TEXT | typeof NUMBER | typeof TINYINT | typeof SMALLINT | typeof MEDIUMINT | typeof INTEGER | typeof BIGINT | typeof FLOAT | typeof TIME | typeof DATE | typeof DATEONLY | typeof BOOLEAN | typeof NOW | typeof BLOB | typeof DECIMAL | typeof DECIMAL | typeof UUID | typeof UUIDV1 | typeof UUIDV4 | typeof HSTORE | typeof JSON | typeof JSONB | typeof VIRTUAL | typeof ARRAY | typeof ENUM | typeof RANGE | typeof REAL | typeof DOUBLE | typeof GEOMETRY | typeof GEOGRAPHY //eslint-disable-line

type configType = {
    type: valueType,
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
