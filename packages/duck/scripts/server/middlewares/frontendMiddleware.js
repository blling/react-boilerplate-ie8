const config = require('../../config');
const proWebpackConfig = require('../../webpack/pro.config');
const proMiddleware = require('./prodMiddleware');
const devWebpackConfig = require('../../webpack/dev.config');
const devMiddleware = require('./devMiddleware');
/**
 * Front-end middleware
 */
module.exports = (app) => {
  const isProd = config.env === 'production';

  if (isProd) {
    proMiddleware(app, proWebpackConfig);
  } else {
    devMiddleware(app, devWebpackConfig);
  }

  return app;
};
