const { createHash } = require('crypto');

class HashedModuleIdsPlugin {
  constructor(options) {
    this.options = {
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 4,
      ...options,
    };
  }

  apply(compiler) {
    const { options } = this;
    compiler.plugin('compilation', (compilation) => {
      const usedIds = new Set();
      compilation.plugin('before-module-ids', (modules) => {
        modules.forEach((module) => {
          if (module.id === null && module.libIdent) {
            const id = module.libIdent({
              context: this.options.context || compiler.options.context,
            });

            const hash = createHash(options.hashFunction);
            hash.update(id);
            const hashId = hash.digest(options.hashDigest);
            let len = options.hashDigestLength;
            while (usedIds.has(hashId.substr(0, len))) {
              len++;
            }
            /* eslint-disable-next-line no-param-reassign */
            module.id = hashId.substr(0, len);
            usedIds.add(module.id);
          }
        });
      });
    });
  }
}

module.exports = HashedModuleIdsPlugin;
