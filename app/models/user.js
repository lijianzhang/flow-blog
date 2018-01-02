/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 21:31:15
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-02 22:31:33
 * @flow
 */


import Sequelize from 'sequelize';
import BaseDBModel, { Attr } from '../lib/base-db-model';


class User extends BaseDBModel {
    @Attr({
        type: Sequelize.STRING,
        defaultValue: 'test',
    })
    firstName: ?string;

    @Attr(Sequelize.STRING)
    lastName: ?string;

    @Attr(Sequelize.STRING)
    email: ?string;

    username: string;

    password: string;

    get fullName(): string {
        if (!this.firstName || !this.lastName) return '';
        return this.firstName + this.lastName;
    }
}

export default User;
