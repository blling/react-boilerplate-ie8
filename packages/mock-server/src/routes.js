const configroutes = require('./config/configroutes');

const routes = [{
    "path": "/",
    "payLoad": () => "Welcome to mock server, please enter an exact path for visiting!"
  },
  {
    "path": "/config",
    "payLoad": configroutes
  }
];

module.exports = routes;
