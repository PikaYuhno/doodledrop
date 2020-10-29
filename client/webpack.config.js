const path = require("path");

module.exports = {
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    devServer: {
        contentBase: [
            path.join(__dirname, "/public/"),
            path.join(__dirname, "/dist/"),
        ],
        compress: true,
        port: 9000,
    },
};
