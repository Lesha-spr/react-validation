'use strict';

/**
 * Require Browsersync along with webpack and middleware for it
 */
const browserSync = require('browser-sync');
const webpack = require('webpack');
const historyApiFallback = require('connect-history-api-fallback');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * Require ./webpack.config.js and make a compiler from it
 */
const webpackConfig = require('./webpack/webpack.config.dev');
const compiler = webpack(webpackConfig);

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
    server: {
      baseDir: 'lib',

      middleware: [
        historyApiFallback(),
        webpackDevMiddleware(compiler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConfig.output.publicPath,

          // pretty colored output
            stats: {
                assets: false,
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false
            },

          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // compiler should be the same as above
        webpackHotMiddleware(compiler, {
            quiet: true,
            noInfo: true
        })
      ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'lib/*.html'
    ]
});
