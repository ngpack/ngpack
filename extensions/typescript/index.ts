import { Configuration } from 'webpack';
import { NgPack } from '@ngpack/ngpack';

export function provide(ngpack: NgPack): Configuration {
  return {
    devtool: ngpack.util.isTest() ? 'eval-source-map' : 'source-map',
    resolve: {
      extensions: ['.ts'],
    },
  };
}