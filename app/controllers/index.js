
import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
// import {index} from '../Controller/home';
const basename = path.basename(module.filename);
const router = Router();
fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const route = require(path.join(__dirname, file)).default;
        router.use(route.routes());
    });
// router.get('/', index);
export default router;
