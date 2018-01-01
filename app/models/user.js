/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 21:31:15
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-02 01:19:44
 * @flow
 */


import Sequelize from 'sequelize';
import BaseDBModel from '../lib/base-db-model';


class User extends BaseDBModel {
    static fields = {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        email: Sequelize.STRING,
    }

    firstName: ?string;

    lastName: ?string;

    email: ?string;

    get fullName(): string {
        if (!this.firstName || !this.lastName) return '';
        return this.firstName + this.lastName;
    }
}

export default User;
