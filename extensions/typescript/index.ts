import { Configuration } from 'webpack';
import { NgPack } from '@ngpack/ngpack';

export function provide(ngpack: NgPack): Configuration {
  return {
    devtool: ngpack.util.isTest() ? 'eval-source-map' : 'source-map',
    module: {
      loaders: [{
        exclude: [
          /node_modules\/(?!(ng2-.+))/,
          ngpack.util.isTest() ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/,
        ],
        loaders: ['ts'],
        test: /\.ts$/,
      }],
    },
    resolve: {
      extensions: ['.ts'],
    },
  };
}