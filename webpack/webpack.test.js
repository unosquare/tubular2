'use strict';

const path = require('path');
const webpack = require('webpack');

var _root = path.resolve(__dirname, '..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}


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
