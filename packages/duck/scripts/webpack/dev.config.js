const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const merge = require('webpack-merge');

const config = require('../config');
const logger = require('../share/logger');
const webpackBaseConfig = require('./base.config');

const plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    filename: config.indexFile,
    template: config.indexFileFull,
    inject: 'body',
    chunks: [...config.allChunks],
    chunksSortMode: 'manual',
  }),
];

if (config.dllPlugin) {
  glob.sync(`${config.dllPlugin.defaults.path}/*.dll.js`).forEach((dllPath) => {
    plugins.push(new AddAssetHtmlPlugin({ filepath: dllPath, includeSourcemap: false }));
  });
}
/**
 * Select which plugins to use to optimize the bundle's handling of
 * third party dependencies.
 *
 * If there is a dllPlugin key on the project's package.json, the
 * Webpack DLL Plugin will be used.  Otherwise the CommonsChunkPlugin
 * will be used.
 *
 */
function dependencyHandlers() {
  if (!config.dllPlugin) {
    return [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
      }),
    ];
  }

  const dllPath = path.resolve(config.rootPath, config.dllPlugin.defaults.path);
  /**
   * Reminder: You need to exclude any server side dependencies by listing them in dllConfig.exclude
   */
  const manifestPath = path.resolve(dllPath, 'runtimeDeps.json');

  if (!fs.existsSync(manifestPath)) {
    logger.error('The DLL manifest is missing. Please run `npm run build:dll`', manifestPath);
    process.exit(0);
  }

  return [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath), // eslint-disable-line global-require
    }),
  ];
}

module.exports = merge(webpackBaseConfig, {
  entry: {
    vendor: ['eventsource-polyfill'], // Necessary for hot reloading with IE
    main: ['webpack-hot-middleware/client?reload=true'], // 注意: webpack-hot-middleware 2.8.1 以上不兼容IE8
  },

  output: {
    /** 这里本来应该是[chunkhash]的，但是由于[chunkhash]和HotModuleReplacementPlugin不兼容。只能妥协 */
    filename: '[name].[hash].js',
  },

  plugins: dependencyHandlers().concat(plugins),

  performance: {
    hints: false,
  },

  devtool: 'inline-source-map',
});
