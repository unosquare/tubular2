'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {

    devtool: 'inline-source-map',
    module: {
        loaders: [
            { loader: 'raw', test: /\.(css|html)$/ },
            { exclude: /node_modules/, loader: 'ts-loader', test: /\.ts$/ }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};