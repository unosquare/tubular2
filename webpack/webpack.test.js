'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {

    devtool: 'inline-source-map',
    module: {
        
        loaders: [
            { loader: 'raw', test: /\.(css|html)$/ },
            { exclude: /node_modules/, loader: 'ts-loader', test: /\.spec\.ts$/ },
            { test: /\.ts$/, loader: 'awesome-typescript-loader' }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        //modulesDirectories: ['node_modules'],
        //root: path.resolve('.')
    }
};