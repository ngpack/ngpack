var config = module.exports = require('@ngpack/ngpack').ngpack
  .configure({
    // port: 9090,
    root: __dirname,
  })
  .add('@ngpack/base')
  .add('@ngpack/sass')
  .add('@ngpack/typescript')
  .add('@ngpack/tslint')
  .add('@ngpack/istanbul')
  .add(angular2TemplateLoaderExt)
  .modify(configurePostCSS)
  .make();

console.log(`=============== Generated Config ===============`);
console.log(require('util').inspect(module.exports))
console.log(`================================================\n\n`);

function configurePostCSS(config) {
  config.postcss = [
    require('autoprefixer')({
      browsers: ['last 4 version'],
    }),
  ];
}

function angular2TemplateLoaderExt(ngpack) {
  return {
    module:
    {
      loaders: [{
        loaders: ['angular2-template-loader'],
        test: /\.ts$/,
      }],
    },
  };
}