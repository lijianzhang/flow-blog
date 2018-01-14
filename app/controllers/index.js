/*
 * @Author: lijianzhang
 * @Date: 2018-01-14 17:11:25
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-14 17:14:07
 * @flow
 */


import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import Controller from '../lib/base-controller';

const basename = path.basename(module.filename);
const router = new Router();
fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const route: typeof Controller = require(path.join(__dirname, file)).default;
        router.use(route.routes());
    });
export default router;
