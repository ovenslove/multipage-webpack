const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

let config = Merge(CommonConfig, {
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        // 清除dist目录
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '../'),
            verbose: true,
            dry: false,
            exclude: []
        }),
        // 导出css文件
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('[name].css').replace('', 'css/');
            },
            allChunks: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        // 压缩混淆类操作
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
});

module.exports = config;