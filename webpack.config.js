'use strict';

const path = require('path');
const webpack = require('webpack');

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
                test: /\.jsx$/,
                loader: 'jsx-loader'
            }
        ]
    }
};