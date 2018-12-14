
const path = require('path');
const DIST_PATH = path.resolve(__dirname, 'dist');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');
const publicPath = process.env.PUBLIC_PATH;

module.exports = {
    devtool: 'source-map',
    // 应用入口
    // entry: {
    //     app: path.join(__dirname, '../src/index.js') // app.js作为打包的入口
    // },
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'), // 打包好之后的输出路径
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        publicPath,
        devtoolModuleFilenameTemplate:
        info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        plugins: [
            // Prevents users from importing files from outside of src/ (or node_modules/).
            // This often causes confusion because we only process files within src/ with babel.
            // new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
        ],
        alias: {
            actions: path.resolve(__dirname, '../src/actions'),
            common: path.resolve(__dirname, '../src/common'),
            components: path.resolve(__dirname, '../src/components'),
            containers: path.resolve(__dirname, '../src/containers'),
            reducers: path.resolve(__dirname, '../src/reducers'),
            style: path.resolve(__dirname, '../src/style')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true
    },
    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }, {
                test: /\.(js|jsx)$/,
                include: [paths.appSrc, paths.appUILib],
                loader: 'babel-loader',
                options: {
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?sourceMap',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader?sourceMap!less-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader?sourceMap!sass-loader',
                include: [
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, './styles')
                ]
            },
            {
                test: require.resolve('zepto'),
                use: 'imports-loader?this=>window'
            },
            {
                test: /\.md$/,
                use: [{
                    loader: 'html-loader'
                }, {
                    loader: 'markdown-loader',
                    options: {}
                }]
            }, {
                exclude: [
                    /\.md$/,
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.less$/,
                    /\.css$/,
                    /\.scss$/,
                    /\.json$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/
                ],
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public', 'index.html'),//模板
            // template: path.resolve(__dirname, '../src', 'index.html'),//模板
            filename: 'index.html',
            inject: false, //允许插件修改哪些内容，包括head与body
            hash: true, //是否添加hash值
            minify: { //压缩HTML文件
                removeComments: true,//移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            },
            chunksSortMode: 'none' //如果使用webpack4将该配置项设置为'none'
        }),
         new ExtractTextPlugin({
            filename: 'static/css/styles.css',
            allChunks: true
        }),
    ]
};