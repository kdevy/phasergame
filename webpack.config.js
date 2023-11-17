var path = require("path");
var pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
var phaser = path.join(pathToPhaser, "dist/phaser.js");

module.exports = {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" },
            {
                test: /phaser\.js$/,
                loader: "expose-loader",
                options: {
                    exposes: ["phaser"],
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "./"),
            watch: {
                usePolling: true,
            },
        },
        devMiddleware: {
            publicPath: "/dist/",
        },

        host: "0.0.0.0",
        port: 9000,
        open: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            phaser: phaser,
        },
    },
};
