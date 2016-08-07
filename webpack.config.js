'use strict';

const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        'index': './src/validation.jsx'
    },

    output: {
        path: path.join(__dirname + '/build'),
        publicPath: '/build/',
        filename: '[name].js',
        libraryTarget: 'commonjs'
    },

    externals: {
        "react": "react"
    },

    plugins: require('./webpack/plugins'),

    module: {
        loaders: require('./webpack/loaders')
    },

    eslint: require('./webpack/eslint/.eslintrc.json')
};