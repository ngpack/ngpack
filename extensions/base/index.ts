import { Configuration } from 'webpack';
import { NgPack, NgPackMode } from '@ngpack/ngpack';

export function provide(ngpack: NgPack): Configuration {
  return {
    debug: ngpack.env.mode === NgPackMode.DEV,
    entry: ngpack.env.mode === NgPackMode.TEST ? {} : {
      'main': './src/main',
      'polyfills': './src/polyfills',
      'vendor': './src/vendor',
    },
  };
}