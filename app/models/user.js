/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 21:31:15
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-01 22:36:28
 * @flow
 */


import Sequelize from 'sequelize';
import BaseDBModel from '../lib/base-db-model';


class User extends BaseDBModel {
    static fileds = {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        email: Sequelize.STRING,
    }
}

export default User;
