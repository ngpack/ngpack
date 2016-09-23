var config = module.exports = require('@ngpack/ngpack').ngpack
  // configure first
  .configure({
    // port: 9090,
    root: __dirname,
  })
  .add('@ngpack/base')
  .add('@ngpack/hmr')
  .add('@ngpack/sass')
  .modify(overwritePostCSS)
  .add('@ngpack/typescript')
  .add('@ngpack/tslint')
  .add('@ngpack/istanbul')   // order matters: this has to be after typescript
  .add(extendWithAngular2TemplateLoader)
  .make();

function overwritePostCSS(config) {
  config.postcss = [
    require('autoprefixer')({
      browsers: ['last 4 version'],
    }),
  ];
}

function extendWithAngular2TemplateLoader(ngpack) {
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