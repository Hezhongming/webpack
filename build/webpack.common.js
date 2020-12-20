const path = require("path");
const devMode = process.env.NODE_ENV !== "production";
const CopyWebpackPlugin = require("copy-webpack-plugin");

function resolve(name) {
    return path.resolve(__dirname, name);
}

module.exports = {
    //配置entry， loaders
    context: resolve("../"),
    entry: {
        //entry 默认为 ./src/index.js   
        //entry只能设置在context设置的目录下
        "app": "./src/main.js"
    },
    output: {
        filename: "js/[name].[hash:8].js",
        path: resolve("../dist")
    },
    module: {
        rules: [
            {
                test: /\.html/,
                use: "html-loader"
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                include: [resolve("../src")],
                loader: 'eslint-loader',
                options: {
                    fix: true,   // 自动修复 eslint的 错误,
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                
                use: {
                    loader: "babel-loader",
                }
                

            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8 * 1024,
                    name: "img/[name].[hash:8].[ext]"
                }
            }
        ]
    },
    plugins:[
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve("../static"),
                    to: resolve("../dist/static")
                }
            ]
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        }
    }
};