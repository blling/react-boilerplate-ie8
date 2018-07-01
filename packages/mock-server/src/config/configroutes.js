const configMock = require('./config.json');

const queryroutes = req => {
  return configMock;
}

module.exports = queryroutes;