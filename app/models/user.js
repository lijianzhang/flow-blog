/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 21:31:15
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-07 15:11:38
 * @flow
 */


import Sequelize from 'sequelize';
import crypto from 'crypto';
import BaseDBModel, { Attr } from '../lib/base-db-model';

class User extends BaseDBModel {
    /**
 * 加密
 *
 * @returns {string}
 * @memberof User
 */
    static encryption(password: string): string {
        return crypto.createHash('sha1').update('blog').update(password).digest('hex');
    }

    /**
     * 验证账号密码是否正确
     *
     * @static
     * @param {string} username
     * @param {string} password
     * @returns
     * @memberof User
     */
    static async verify(username: string, password: string) {
        const user = await User.findOne({ username });
        if (!user) return false;
        if (!user.verifyPassword(password)) return false;
        return user;
    }

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
    username: ?string;


    verifyPassword(password: string): boolean {
        return this.password === User.encryption(password);
    }
}

User.init();


User.hook('beforeCreate', (user: User) => {
    user.password = User.encryption(user.password);
});


User.sync({ force: true });


export default User;
