'use strict';

const path = require('path');

module.exports = {
    entry: {
        'index': './src/index.jsx'
    },

    output: {
        path: path.join(__dirname + '/build'),
        publicPath: '/build/',
        filename: '[name].js',
        libraryTarget: 'commonjs'
    },

    externals: {
        "react": "react",
        "lodash.isobject": "lodash.isobject",
        "lodash.isfunction": "lodash.isfunction",
        "lodash.includes": "lodash.includes",
        "lodash.noop": "lodash.noop",
        "lodash.assign": "lodash.assign",
        "classnames": "classnames",
        "validator": "validator"
    },

    module: {
        loaders: [
            {
                test: /\.js+x?$/,
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