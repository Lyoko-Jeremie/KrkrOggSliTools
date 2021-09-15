// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

// const stylesHandler = "style-loader";
const stylesHandler = MiniCssExtractPlugin.loader;
// const stylesHandler = new MiniCssExtractPlugin.loader();

const config = {
    // devtool: "cheap-module-source-map",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        open: false,
        host: "localhost",
        port: 38080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/


        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, "css-loader", "sass-loader"],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/

            // // https://getbootstrap.com/docs/4.0/getting-started/webpack/
            // // https://stackoverflow.com/questions/64768568/using-bootstrap-4-5-2-with-webpack
            // {
            //     loader: 'sass-loader' // compiles Sass to CSS
            // },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
