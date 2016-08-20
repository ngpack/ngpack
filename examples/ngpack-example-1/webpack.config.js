module.exports = require('@ngpack/ngpack').ngpack
  .add('@ngpack/base')
  .make();

console.log(`=============== Generated Config ===============`);
console.log(require('util').inspect(module.exports))
console.log(`================================================`);

console.log('\nExample not yet ready - exiting...\n');
process.exit();