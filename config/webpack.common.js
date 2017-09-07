const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require("glob");

var pages = glob.sync(path.resolve(__dirname, '../src/view/**/*.js'));

let config = {
    entry: {},
    module: {
        rules: [{
            test: /.js?$/,
            include: [
                path.resolve(__dirname, '../src')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'bower_components')
            ],
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.(css|sass|scss)$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            })
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[hash].[ext]',
                    outputPath: '/images/'
                }
            }]
        }, {
            test: /\.(pug|jade)$/,
            use: [{
                loader: 'html-loader',
                options: {}
            }, {
                loader: 'pug-html-loader',
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[hash].[ext]',
                    outputPath: '/fonts/'
                }
            }]
        }]
    },
    plugins: [

    ],
    resolve: {
        alias: {
            lib: path.join(__dirname, '../src/public/lib'),
        },
        extensions: ['.json', '.js', '.jsx', '.css']
    }
};

// 遍历并输出到文件，多入口配置
for (var i in pages) {
    let chunks = path.basename(path.join(pages[i], '..'));
    let conf = {
        filename: chunks + '.html',
        template: path.join(pages[i], '..') + '/' + chunks + '.pug',
        chunks: [chunks],
        favicon: './favicon.ico',
        "css": [chunks + ".css"],
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
    config.entry[chunks] = pages[i];
}

module.exports = config;