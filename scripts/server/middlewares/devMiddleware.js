const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function createWebpackDevMiddleware(compiler, webpackConfig) {
  return webpackDevMiddleware(compiler, {
    hot: true, // Enable hot load
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    quiet: false,
    stats: 'errors-only',
  });
}

module.exports = (app, webpackConfig) => {
  const compiler = webpack(webpackConfig);

  const middleware = createWebpackDevMiddleware(compiler, webpackConfig);

  app.use(middleware);
  app.use(
    webpackHotMiddleware(compiler, {
      heartbeat: 2000,
    })
  );

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('*', (req, res) => {
    fs.readFile(compiler.outputPath, (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
