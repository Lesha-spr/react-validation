'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = Object.assign({}, require('./webpack.config.base'), {
    devtool: 'source-map',

    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './gh-pages/main'
    ],

    output: {
        path: path.join(__dirname, '../', 'lib', 'src'),
        publicPath: '/src/',
        filename: '[name].js'
    },

    eslint: {
        configFile: path.join(__dirname, 'eslint', '.eslintrc'),
        emitWarning: true
    }
});

Array.prototype.push.apply(module.exports.module.loaders, [
    require('./loaders/js-dev')
]);

Array.prototype.push.apply(module.exports.plugins, [
    require('./plugins/hot-module-replacement'),
    require('./plugins/define-dev')
]);
