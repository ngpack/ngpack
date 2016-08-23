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
  };
}