'use strict';

module.exports = {
    test: /\.js+x?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
    query: {
        presets: [require.resolve('babel-preset-react'), require.resolve('babel-preset-es2015')],
        plugins: [require.resolve('babel-plugin-transform-runtime')]
    }
};