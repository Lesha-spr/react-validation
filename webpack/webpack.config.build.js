'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = Object.assign({}, require('./webpack.config.base'), {
    devtool: null,

    entry: {
        'validation': './validation.jsx',
        'validation.rc': './validation.rc.jsx'
    },

    output: {
        path: path.join(__dirname, '../', 'lib', 'build'),
        publicPath: '/build/',
        filename: '[name].js',
        libraryTarget: 'umd'
    },

    externals: {
        "react": "react",
        "classnames": "classnames"
    },

    eslint: {
        configFile: path.join(__dirname, 'eslint', '.eslintrc'),
        emitWarning: true
    }
});

Array.prototype.push.apply(module.exports.module.loaders, [
    require('./loaders/js-build')
]);

Array.prototype.push.apply(module.exports.plugins, [
    require('./plugins/define-build')
]);
