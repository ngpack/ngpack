import { Configuration, DefinePlugin } from 'webpack';
import { NgPack } from '@ngpack/ngpack';

const extractTextPlugin = require('extract-text-webpack-plugin');

export function provide(ngpack: NgPack): Configuration {
  // create the base webpack configuration
  const config: Configuration = {
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

        // Support for CSS as raw text
        // use 'null' loader in test mode
        // all css in src/style will be bundled in an external css file
        {
          exclude: ngpack.util.root('src', 'app'),
          loader: ngpack.util.isTest() ? 'null' :
            extractTextPlugin.extract('style', 'css?sourceMap!postcss'),
          test: /\.css$/,
        },
        // all css required in src/app files will be merged in js files
        {
          include: ngpack.util.root('src', 'app'), loader: 'raw!postcss',
          test: /\.css$/,
        },

        // support for .html as raw text
        // todo: change the loader to something that adds a hash to images
        {
          exclude: ngpack.util.root('src', 'public'),
          loader: 'raw',
          test: /\.html?$/,
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
    plugins: [
      // Define env variables to help with builds
      // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      new DefinePlugin({
        'process.env': JSON.stringify(ngpack.env),
      }),
    ],
    resolve: {
      extensions: [''],
    },
  };

  // add loader/plugin specific configurations
  Object.assign(config, {
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 version'],
      }),
    ],
  });

  return config;
}