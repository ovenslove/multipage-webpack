const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

let config = Merge(CommonConfig, {
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },

    devtool: 'source-map',
    devServer: {
        host: "127.0.0.1",
        contentBase: 'dist',
        port: 8080
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[hash].css',
            allChunks: true
        })
    ]
});
module.exports = config;