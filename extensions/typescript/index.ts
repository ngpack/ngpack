import { Configuration } from 'webpack';
import { NgPack, NgPackMode } from '@ngpack/ngpack';

export function provide(ngpack: NgPack): Configuration {
  return {
    devtool: ngpack.env.mode === NgPackMode.TEST ?
      'eval-source-map' : 'source-map',
  };
}