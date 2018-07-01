const config = require('../config');
const path = require('path');
const fs = require('fs');
const { mkdir, echo, exec } = require('shelljs');

const exists = fs.existsSync;
const writeFile = fs.writeFileSync;

const pkg = require(path.join(config.rootPath, 'package.json'));
const dllConfig = config.dllPlugin.defaults;
const outputPath = path.join(config.rootPath, dllConfig.path);
const dllManifestPath = path.join(outputPath, 'package.json');

/**
 * I use node_modules/react-boilerplate-dlls by default just because
 * it isn't going to be version controlled and babel wont try to parse it.
 */
mkdir('-p', outputPath);

echo('Building the Webpack DLL...');

/**
 * Create a manifest so npm install doesn't warn us
 */
if (!exists(dllManifestPath)) {
  writeFile(
    dllManifestPath,
    JSON.stringify(
      {
        name: 'runtime-dlls',
        private: true,
        version: pkg.version,
      },
      null,
      2
    ),
    'utf8'
  );
}

// the BUILDING_DLL env var is set to avoid confusing the development environment
exec('webpack --config scripts/webpack/dll.config.js --progress');
