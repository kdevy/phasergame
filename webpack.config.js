var path = require("path");
var pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
var phaser = path.join(pathToPhaser, "dist/phaser.js");

module.exports = {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    watchOptions: {
        aggregateTimeout: 900,
        poll: 900,
        ignored: ["**/node_modules", "**/.git", "**/.vscode", "**/dist"],
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
            watch: false,
        },
        watchFiles: {
            paths: ["src/**/*"],
            options: {
                usePolling: true,
                interval: 1000,
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
