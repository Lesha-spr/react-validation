'use strict';

const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        'app': './src/app.jsx'
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    output: {
        path: path.join(__dirname + '/build'),
        publicPath: '/build/',
        filename: '[name].js',
        //libraryTarget: 'commonjs'
    },

    //externals: {
    //    "react": "react",
    //    "react-addons-pure-render-mixin": "react-addons-pure-render-mixin",
    //    "validator": "validator"
    //},

    plugins: require('./webpack/plugins'),

    module: {
        loaders: require('./webpack/loaders')
    },

    eslint: require('./webpack/eslint/.eslintrc.json')
};