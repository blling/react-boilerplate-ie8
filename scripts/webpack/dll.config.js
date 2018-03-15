/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */
const { resolve, join } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('../config');
const webpackBaseConfig = require('./base.config');

const pkg = require(join(config.rootPath, 'package.json'));

const { dllPlugin } = config;

if (!dllPlugin.defaults) {
  process.exit(0);
}

const dllConfig = dllPlugin.defaults;
const outputPath = resolve(config.rootPath, dllConfig.path);

module.exports = merge.smartStrategy({ entry: 'replace' })(webpackBaseConfig, {
  entry: dllPlugin.entry(pkg),

  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json'),
    }),
  ],

  context: config.rootPath,

  performance: {
    hints: false,
  },

  devtool: 'inline-source-map',
});
