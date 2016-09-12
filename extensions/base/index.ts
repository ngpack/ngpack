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
    module: {
      loaders: [
        // copy those assets to output
        {
          loader: 'file?name=assets/[name].[hash].[ext]?',
          // tslint:disable-line:max-line-length
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        },

        // Support for *.json files.
        {
          loader: 'json',
          test: /\.json$/,
        },
      ],
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