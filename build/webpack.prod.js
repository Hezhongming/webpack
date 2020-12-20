const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash].css"
        }),
        new CleanWebpackPlugin({
            //日志打印
            verbose: true
        }),
        new HtmlWebpackPlugin({
            template: "./template/index.html",
            favicon: "fav.ico",
            filename: "index.html",
            minify: {
                //出掉html注释
                removeComments: true,
                //去除html空格
                collapseWhitespace: true,
                //去除引号
                removeAttributeQuotes: true,
            }
        })
    ],
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                //开启缓存
                cache: true,
                //开启多进程打包
                parallel: true,
                terserOptions:{
                    compress: {
                        warnings: false,
                        //禁用console
                        // drop_console: true
                    }
                }
            }),
            new OptimizeCssAssetsWebpackPlugin({}),
        ]
    }
})