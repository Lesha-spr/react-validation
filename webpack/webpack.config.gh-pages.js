'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = Object.assign({}, require('./webpack.config.base'), {
    devtool: 'source-map',

    entry: [
        './gh-pages/main'
    ],

    output: {
        path: path.join(__dirname, '../', 'gh-compile'),
        publicPath: '/src/',
        filename: '[name].js'
    },

    eslint: {
        configFile: path.join(__dirname, 'eslint', '.eslintrc'),
        emitWarning: true
    }
});

Array.prototype.push.apply(module.exports.module.loaders, [
    require('./loaders/js-build')
]);
