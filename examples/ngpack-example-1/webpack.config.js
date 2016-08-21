module.exports = require('@ngpack/ngpack').ngpack
  .add('@ngpack/base')
  .add(require('./webpack.config.ext'))
  .make();

console.log(`=============== Generated Config ===============`);
console.log(require('util').inspect(module.exports))
console.log(`================================================\n\n`);