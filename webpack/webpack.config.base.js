'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    debug: true,

    context: path.join(__dirname, '../lib', 'src'),

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
        alias: {

        }
    },

    plugins: require('./plugins'),

    module: {
        preLoaders: require('./preloaders'),
        loaders: require('./loaders')
    }
};
