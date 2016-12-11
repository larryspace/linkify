const path = require('path');
const webpack = require('webpack');
const args = require('minimist')(process.argv.slice(2));

const allowedEnvs = ['dev', 'dist', 'test'];
let env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}
process.env.REACT_WEBPACK_ENV = env;

let port = 3000;

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './dist/assets');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(env) }
  }),
  //new webpack.NamedModulesPlugin(),
];

const config = {
  devtool: 'source-map',
  context: sourcePath,
  entry: {
    app: './index.js',
    vendor: ['react']
  },
  output: {
    path: staticsPath,
    filename: '[name].bundle.js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      /*{
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "eslint-loader"
      },*/
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
      {
        test: /\.html$/,
        use: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
  		  test: /\.(eot|ttf|svg|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader']
  		}
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ]
  },
  plugins
};

if(env === 'dev'){
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
  config.entry.app = './hot.js';
  config.entry.vendor.push(
    'react-hot-loader/patch',
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  );

  Object.assign(config, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './src',
      publicPath: '/assets/',
      historyApiFallback: true,
      port: 3000,
      compress: false,
      inline: true,
      hot: true,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        }
      },
    }
  });
}

if(env === 'dist'){
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    })
  );

  Object.assign(config, {

  });
}

module.exports = config;
