import { Configuration } from 'webpack';
import { NgPack } from '@ngpack/ngpack';

const forkCheckerPlugin = require(
  'awesome-typescript-loader').ForkCheckerPlugin;

export function provide(ngpack: NgPack): Configuration {
  const devtool =
    ngpack.util.isProd() ? 'source-map' :
      ngpack.util.isTest() ? 'inline-source-map' : 'eval-source-map';

  let atlOptions = '';
  let isTest = ngpack.util.isTest();
  var isTestWatch = ngpack.util.isTestWatch();

  if (isTest && !isTestWatch) {
    // awesome-typescript-loader needs to output inlineSourceMap
    // for code coverage to work with source maps.
    atlOptions = 'inlineSourceMap=true&sourceMap=false';
  }

  return {
    devtool,
    module: {
      loaders: [{
        exclude: [
          /node_modules\/(?!(ng2-.+))/,
          isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/,
        ],
        loaders: ['awesome-typescript-loader?' + atlOptions],
        test: /\.ts$/,
      }],
      postLoaders: isTest && !isTestWatch ? [{
        exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/],
        include: ngpack.util.root('src'),
        loader: 'istanbul-instrumenter-loader',
        test: /\.ts$/,
      }] : [],
    },
    plugins: isTest ? [] : [
      new forkCheckerPlugin(),
    ],
    resolve: {
      extensions: ['.ts'],
    },
  };
}