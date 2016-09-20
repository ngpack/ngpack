import { Configuration } from 'webpack';
import { NgPack } from '@ngpack/ngpack';

export function provide(ngpack: NgPack): Configuration {
  const config: Configuration = {
    module: {
      preLoaders: ngpack.util.isTest() ? [] : [
        { loader: 'tslint', test: /\.ts$/ },
      ],
    },
  };

  Object.assign(config, {
    tslint: {
      emitErrors: false,
      failOnHint: false,
    },
  });

  return config;
}