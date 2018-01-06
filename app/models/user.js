/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 21:31:15
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-06 20:27:31
 * @flow
 */


import Sequelize from 'sequelize';
import BaseDBModel, { Attr } from '../lib/base-db-model';

class User extends BaseDBModel {
    /** 主键 */
    @Attr({
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Attr({
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [6, 128],
            notEmpty: true,
        },
    })
    password: string;

    @Attr({
        type: Sequelize.STRING,
        defaultValue: 'test',
    })
    name: ?string;
}

User.init();

User.beforeSave((user: User) => {
    user.set('password', `${user.get('password')}beforeCreate`);
});

User.sync({ force: true });


export default User;
