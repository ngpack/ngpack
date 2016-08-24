import { Configuration } from 'webpack';
import { NgPack } from '@ngpack/ngpack';

export function provide(ngpack: NgPack): Configuration {
  return {
    debug: ngpack.util.isDev(),
    entry: ngpack.util.isTest() ? {} : {
      'main': './src/main',
      'polyfills': './src/polyfills',
      'vendor': './src/vendor',
    },
    output: ngpack.util.isTest() ? {} : {
      chunkFilename: ngpack.util.isProd() ?
        '[id].[hash].chunk.js' : '[id].chunk.js',
      filename: ngpack.util.isProd() ? 'js/[name].[hash].js' : 'js/[name].js',
      path: ngpack.util.root('dist'),
      publicPath: ngpack.util.isProd() ?
        '/' : `http://localhost:${ngpack.env.port}/`,
    },
    resolve: {
      extensions: [''],
    },
  };
}