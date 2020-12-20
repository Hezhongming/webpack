const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },
    devServer: {
        open: true,
        hot: true,
        //跨域
        //proxy:{}
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./template/index.html",
            favicon: "fav.ico",
            filename: "index.html"
        })
    ]
});