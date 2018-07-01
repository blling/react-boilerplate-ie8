const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');

const routes = require('./routes.js');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || 'http://127.0.0.1:3000');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Request-ID, Content-Type, Accept");
  next();
});

routes.forEach( route => {
  const methods = (route.method || 'get').split('|');
  methods.forEach( m => {
    app[m](route.path, (req, res) => {
      res.header("IsMock", true);
      res.setHeader('Content-Type', 'application/json;charset=UTF-8');
      res.send(route.payLoad(req, res));
    });
  });
});

function serveFromThisServer(pathname){
  const route = routes.find(
    x => pathname && x.path.toLowerCase() === pathname.toLowerCase()
  );

  if(route === null || route === undefined) {
    return false;
  }

  return true;
}

const filter = (pathname, req) => {
  if(serveFromThisServer(pathname)) {
    return false;
  }
  return true;
};

// TODO Add your target url here. eg: http://xxx.x.x/
const target = 'http://xxx.x.x';
const apiProxy = proxy(filter, {
  target,
  changeOrigin: true,
  onProxyReq : (proxyReq, req, res) => {
    console.log(`Proxy [ ${req.url} ] to target [ ${target} ] `);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`Response from [ ${target}${req.url} ]`, JSON.stringify(proxyRes.headers, true, 2));
  }
});
app.use("/xxx", apiProxy);


app.listen(12000, () => console.log('Mocker listening on http://127.0.0.1:12000 !'))
