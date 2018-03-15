const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const HashedModuleIdsPlugin = require('./plugins/HashedModuleIdsPlugin');

const config = require('../config');
const webpackBaseConfig = require('./base.config');

module.exports = merge(webpackBaseConfig, {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
    ],
  },

  plugins: [
    /** Add UglifyJSPlugin */
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
      mangle: {
        screw_ie8: false,
      },
      mangleProperties: {
        screw_ie8: false,
      },
      compress: {
        warnings: false,
        screw_ie8: false,
      },
      output: {
        screw_ie8: false,
      },
    }),
    /** Add CommonsChunkPlugin */
    new HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    /** Add ExtractTextPlugin */
    new ExtractTextPlugin('[name].[contenthash:5].css'),

    /** Add HtmlWebpackPlugin */
    new HtmlWebpackPlugin({
      filename: config.indexFile,
      template: config.indexFileFull,
      inject: 'body',
      chunks: [...config.allChunks],
      chunksSortMode: 'manual',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],

  // Make web variables accessible to webpack, e.g. window
  target: 'web',

  performance: {
    hints: 'error',
    assetFilter: (assetFilename) => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
