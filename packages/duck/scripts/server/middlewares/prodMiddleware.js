const express = require('express');
const compression = require('compression');

const config = require('../../config');

module.exports = (app, webpackConfig) => {
  const { publicPath } = webpackConfig.output;
  const outputPath = config.outDirFull;

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get(`${publicPath}*`, (req, res) => res.sendFile(`${outputPath}/index.html`));
};
