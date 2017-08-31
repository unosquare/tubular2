'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, "src/lib")],
                enforce: "pre",
                test: /\.ts$/,
                use: [
                    {

                        loader: 'tslint-loader',
                    }
                ]

            },
            {
                test: /\.(css|html)$/,
                use: [{ loader: 'raw-loader' }]
            },
            {
                include: [path.resolve(__dirname, "src/lib")],
                test: /\.ts$/,
                use: [{ loader: 'ts-loader' }]
            }
        ]

    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [path.resolve(__dirname, "src/lib"), 'node_modules']
    }
};