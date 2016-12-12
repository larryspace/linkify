const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const connectHistoryApiFallback = require('connect-history-api-fallback');

const bundler = webpack(webpackConfig);

browserSync({
    server: {
        baseDir: 'src',
        middleware: [
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                noInfo: false,
                quiet: true,
                stats: {
                    colors: true
                }
            }),
            webpackHotMiddleware(bundler),
            connectHistoryApiFallback({
              index: './',
            })
        ],
        files: [
          'src/*.html'
        ]
    }
});
