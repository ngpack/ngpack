module.exports = require('@ngpack/ngpack').ngpack
  .configure({
    // port: 9090,
    root: __dirname,
  })
  .add('@ngpack/base')
  .add('@ngpack/typescript')
  .add(require('./webpack.config.ext'))
  .make();

console.log(`=============== Generated Config ===============`);
console.log(require('util').inspect(module.exports))
console.log(`================================================\n\n`);