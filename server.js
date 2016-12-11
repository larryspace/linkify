var browserSync,
    webpack,
    webpackDevMiddleware,
    webpackHotMiddleware,
    webpackConfig,
    bundler;

browserSync = require('browser-sync');
webpack = require('webpack');
webpackDevMiddleware = require('webpack-dev-middleware');
webpackHotMiddleware = require('webpack-hot-middleware');
webpackConfig = require('./webpack.config');
bundler = webpack(webpackConfig);

browserSync({
    server: {
        baseDir: './dist/',

        middleware: [
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                noInfo: false,
                quiet: false,
                stats: {
                    colors: true
                }
            }),
            webpackHotMiddleware(bundler)
        ]
    },

    files: [
        './dist/assets/*.css'
    ]
});
