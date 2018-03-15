const chalk = require('chalk');
const express = require('express');
const ip = require('ip');

const logger = require('../share/logger');

const argv = require('../share/argv');
const setup = require('./middlewares/frontendMiddleware');

const divider = chalk.gray('-----------------------------------');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app);

// Get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || '127.0.0.1';

const port = parseInt(argv.port || process.env.PORT || '3000', 10);

// Called when express.js app starts on given port w/o errors
const appStarted = (startedPort, startedHost) => {
  logger.success('Server started !');

  logger.log(chalk.bold('Access URLs:'));
  logger.log(divider);
  logger.log(`Localhost: ${chalk.magenta(`http://${startedHost}:${startedPort}`)}`);
  logger.log(`LAN: ${chalk.magenta(`http://${ip.address()}:${startedPort}`)}`);
  logger.log(divider);
  logger.log(`${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}`);
};

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    logger.error(err.message);
    return;
  }

  appStarted(port, prettyHost);
});
