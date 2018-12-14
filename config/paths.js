/**
 * @file paths.js
 * @author lixiaoqin@baidu.com
 */

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appSrc: resolveApp('src'),
    appHtml: resolveApp('public/index.html'),
    dotenv: resolveApp('.env'),
    appBuild: resolveApp('build'),
    appIndexJs: resolveApp('src/index.js'),
    appPackageJson: resolveApp('package.json'),
    appPublic: resolveApp('public'),
    appNodeModules: resolveApp('node_modules'),
    appUILib: resolveApp('node_modules/sumoon')
};
