# NgPack

Opinionated webpack configuration generator for Angular 2 web applications

## Installation

```
npm install @ngpack/ngpack @ngpack/base -D

# npm install @ngpack/typescript
# npm install @ngpack/tslint
# npm install @ngpack/postcss
```

## Usage

Create your webpack configuration file (`webpack.config.js`) as you normally
would, but instead of creating the config object directly, let `ngpack`
create it for you, and make your own modifications where necessary. Here is
how it might look (from [examples/angular2-webpack-clone](examples/angular2-webpack-clone/webpack.config.js)):

```js
var config = module.exports = require('@ngpack/ngpack').ngpack
  // configure first
  .configure({
    // port: 9090,
    root: __dirname,
  })
  .add('@ngpack/base')
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
        loaders: ['angular2-template-loader', '@angularclass/hmr-loader'],
        test: /\.ts$/,
      }],
    },
  };
}
```

### `ngpack#configure`

Allows configuring the `port` and the `root` of the project. That's all for now.

### `ngpack.add()`

Adds an extension to the webpack configuration. The final config is generated
by [smart-merging](https://github.com/survivejs/webpack-merge) various configs.

The method accepts one parameter, which can be any of the following:

- a string: name of an ngpack extension module installed via NPM
- a function: a function with the same signature as an [ngpack extension](#Extensions)
- an object: just a config object

### `ngpack.modify()`

This differs from `add`, in that it allows you to modify the configuration
object directly, without merging. It accepts a function with the following
signature:

```ts
(config: Configuration, ngpack: NgPack): void;
```

The function receives the config object as its first argument, which it can
freely modify. The second argument is the insntace of `ngpack`.

The return value of the function is ignored.

### `ngpack.util`

Provides access to the following utility functions:

- `ngpack.util.isDev()`: We're in development mode
- `ngpack.util.isProd()`: We're in production mode
- `ngpack.util.isTest()`: We're in testing mode
- `ngpack.util.isTestWatch()`: We're in testing + watch mode
- `ngpack.util.root(...paths: string[])`: generate an absolute path from the
root of the project

## Extensions

An ngpack extension is a simple NPM module that exports a function with the
following signature:

```ts
(ngpack?: NgPack): Configuration;
```

The function must return a configuration object, which will be merged using
[webpack-merge](https://github.com/survivejs/webpack-merge). There is just
one parameter: the insntace of `ngpack`.

If you create a module, please add the `ngpack-ext` keyword to make it easier
to find.