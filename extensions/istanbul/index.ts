import { Configuration } from 'webpack';
import { NgPack } from '@ngpack/ngpack';

export function provide(ngpack: NgPack): Configuration {
  const config: Configuration = { module: {} };

  if (!ngpack.util.isTest()) {
    return config;
  }

  config.module.postLoaders = [{
    exclude: [/\.spec\.js$/, /\.e2e\.js$/, /node_modules/],
    include: ngpack.util.root('src'),
    loader: 'istanbul-instrumenter-loader',
    test: /\.js$/,
  }];

  if (ngpack.snapshot.resolve.extensions.includes('.ts')) {
    config.module.postLoaders.push({
      exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/],
      include: ngpack.util.root('src'),
      loader: 'istanbul-instrumenter-loader',
      test: /\.ts$/,
    });

    (config as any).ts = {
      compilerOptions: {
        inlineSourceMap: true,
        sourceMap: false,
        sourceRoot: './src',
      },
    };
  }

  return config;
}