module.exports = require('@ngpack/ngpack').ngpack
  .add(require('./webpack.config.ext'))
  .configure({ port: 9090, root: __dirname })
  .add('@ngpack/base')
  .add('@ngpack/typescript')
  .make();

console.log(`=============== Generated Config ===============`);
console.log(require('util').inspect(module.exports))
console.log(`================================================\n\n`);