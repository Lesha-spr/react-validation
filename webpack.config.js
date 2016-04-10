'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'demo': './demo.js'
    },

    output: {
        path: path.join(__dirname + '/build'),
        publicPath: '/build/',
        filename: '[name].js'
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    }
};