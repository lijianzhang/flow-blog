/*
 * @Author: lijianzhang
 * @Date: 2018-01-01 19:18:15
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-06 11:02:03
 */

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import database from '../../config/db-config.json';


const env = process.env.NODE_ENV || 'development';

const config = database[env];
const basename = path.basename(module.filename);

let sequelize: Sequelize; // eslint-disable-line

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

export default sequelize;

fs
    .readdirSync(path.resolve(__dirname, '..', 'models'))
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        require(path.resolve(__dirname, '..', 'models', file)).default; //eslint-disable-line
    });

Object.keys(sequelize.models).forEach((modelName) => {
    if ('associate' in sequelize.models[modelName]) {
        sequelize.models[modelName].associate(sequelize.models);
    }
});
