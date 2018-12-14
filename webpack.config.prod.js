const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const path = require('path'); // 引入‘path’，为了在这里使用绝对路径，避免相对路径在不同系统时出现不必要的问题
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const publicPath = '';


module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    // 输出目录
    output: {
        publicPath: publicPath // 静态资源文件引用时的路径（加在引用静态资源前面的）
    }
});
