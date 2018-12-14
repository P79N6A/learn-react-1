/**
 * @file env.js
 * @author lixiaoqin@baidu.com
 */

const fs = require('fs');
const paths = require('./paths');
const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
    throw new Error(
        'The NODE_ENV environment variable is required but was not specified.'
    );
}

const dotenvFile = `${paths.dotenv}.${NODE_ENV}`;
if (fs.existsSync(dotenvFile)) {
    let result = require('dotenv').config({path: dotenvFile});
}
const REACT_APP = /^REACT_APP_/i;

const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => Object.assign({}, env, {
        [key]: process.env[key]
    }), {
        NODE_ENV: process.env.NODE_ENV,
        PUBLIC_URL: process.env.PUBLIC_URL
    });

// Stringify all values so we can feed into Webpack DefinePlugin
const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => Object.assign({}, env, {
        [key]: JSON.stringify(raw[key])
    }), {})
};
module.exports = {raw, stringified};
