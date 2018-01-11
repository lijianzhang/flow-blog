const path = require('path');
const childProcess = require('child_process');

// 编译输出目录
const DIST_PATH = path.join(__dirname, '..', 'dist');

// CDN 目录
const CDN_PATH = 'cdn:/service/libcdn/hlg-scadmin';

childProcess.exec(`rsync -Rr . ${CDN_PATH}`, {
    cwd: DIST_PATH,
}, (errors) => {
    if (errors) throw errors;
});
