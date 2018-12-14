const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const webpack = require('webpack');
const publicPath = '/';

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'sourcemap',
    // 输出目录
    output: {
        publicPath: publicPath // 静态资源文件引用时的路径（加在引用静态资源前面的）
    },
    devServer: {
        // 开发服务运行时的文件根目录
        contentBase: path.resolve(__dirname, 'dist'),
        // spa不跳转,history模式的路由需要true
        historyApiFallback: true,
        host: 'localhost',
        // 实时刷新
        inline: true,
        // Enable gzip compression for everything served
        compress: true,
        // Shows a full-screen overlay in the browser
        overlay: true,
        // To show only errors in your bundle
        stats: 'errors-only',
        // When open is enabled, the dev server will open the browser.
        open: true,
        host: 'localhost',
        headers: {
            // CORS跨域
            'Access-Control-Allow-Origin': '*'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                NODE_CRS: '"development"'
            }
        })
    ]
});