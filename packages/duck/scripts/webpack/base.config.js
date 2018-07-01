const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('../config');

const baseLoaders = [
  {
    test: /\.js$/,
    loaders: ['babel-loader?cacheDirectory=true'],
    include: config.srcDirFull,
  },
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader', 'postcss-loader'],
  },
  {
    test: /\.(png|jpg|gif|ico)$/,
    loader: 'url-loader?limit=8192',
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
];

/** Other loaders */
[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0];
  const mimetype = font[1];

  baseLoaders.push({
    test: new RegExp(`\\.${extension}$`),
    loader: 'url-loader',
    options: {
      name: 'fonts/[name].[ext]',
      limit: 10000,
      mimetype,
    },
  });
});

module.exports = {
  entry: {
    vendor: [...config.vendor],
    main: [config.entryFileFull],
  },
  output: {
    path: config.outDirFull,
    publicPath: config.publicPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].chunk.js',
  },

  module: {
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['export-from-ie8/loader'],
      },
    ],
    loaders: baseLoaders,
  },

  plugins: [
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.env),
    }),
    new CleanWebpackPlugin([config.outDir], { root: config.rootPath }),
    /** Add Es3ifyPlugin */
    new Es3ifyPlugin(),
    // Add CopyWebpackPlugin
    new CopyWebpackPlugin([
      {
        from: `${config.srcDirFull}/others`,
        to: `${config.outDirFull}`,
        toType: 'dir',
      },
    ]),
  ],

  resolve: {
    modulesDirectories: [config.srcDir, 'node_modules'],
    modules: [config.srcDir, 'node_modules'],
    mainFiles: ['index'],
  },

  performance: {
    hints: 'warnning',
  },

  stats: {
    // Add webpack version information
    version: true,
    // Add the hash of the compilation
    hash: true,
    // Add timing information
    timings: true,
    // Display the entry points with the corresponding bundles
    entrypoints: false,
    // Add --env information
    env: true,
    // Add errors
    errors: true,
    // Add details to errors (like resolving log)
    errorDetails: true,
    // Add warnings
    warnings: true,
    // Add children information
    children: false,
    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: false,
    // Add built modules information to chunk information
    chunkModules: false,
    // Add the origins of chunks and chunk merging info
    chunkOrigins: false,
    // `webpack --colors` equivalent
    colors: true,
    // Add built modules information
    modules: false,
  },
};
