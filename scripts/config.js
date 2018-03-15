const { resolve, join } = require('path');
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

const config = {
  /** Root path */
  rootPath: resolve(__dirname, '../'),
  /** The environment to use when building the project */
  env: process.env.NODE_ENV || 'development',
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The name of the directory containing the application source code */
  srcDirFull: resolve(__dirname, '../', 'src'),
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The name of the directory in which to emit compiled assets */
  outDirFull: resolve(__dirname, '../', 'dist'),
  /** Index file name */
  indexFile: 'index.html',
  /** Index file full path */
  indexFileFull: join(__dirname, '../', 'src', 'index.html'),
  /** Entry, eg: main.js */
  entryFile: 'main.js',
  /** EntryFull */
  entryFileFull: join(__dirname, '../', 'src', 'main.js'),
  /** Publish context */
  publicPath: '/',
  /** The list of modules to bundle separately from the core application code */
  vendor: ['core-js', 'has', 'react', 'react-dom', 'redux', 'react-redux', 'react-router-dom'],
  // All chunks generated by webpack, must keep order
  allChunks: ['manifest', 'vendor', 'main'],
  /**
   * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
   * by caching the module metadata for all of our npm dependencies. We enable it by default
   * in development.
   *
   *
   * To disable the DLL Plugin, set this value to false.
   */
  dllPlugin: {
    defaults: {
      /**
       * we need to exclude dependencies which are not intended for the browser
       * by listing them here.
       */
      exclude: ['bootstrap'],

      /**
       * Specify any additional dependencies here. We include core-js and lodash
       * since a lot of our dependencies depend on them and they get picked up by webpack.
       */
      include: ['eventsource-polyfill'],

      // The path where the DLL manifest and bundle will get built
      path: 'node_modules/runtime-dlls',
    },

    entry(pkg) {
      const dependencyNames = Object.keys(pkg.dependencies);
      const { exclude } = config.dllPlugin.defaults;
      const { include } = config.dllPlugin.defaults;
      const includeDependencies = uniq(dependencyNames.concat(include));

      return {
        runtimeDeps: pullAll(includeDependencies, exclude),
      };
    },
  },
};

module.exports = config;
