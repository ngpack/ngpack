import * as webpack from 'webpack';
import { NgPack } from '@ngpack/ngpack';

const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const dashboardPlugin = require('webpack-dashboard/plugin');

export function provide(ngpack: NgPack): webpack.Configuration {
  // create the base webpack configuration
  const config: webpack.Configuration = {
    debug: ngpack.util.isDev(),
    devServer: {
      contentBase: './src/public',
      historyApiFallback: true,
      quiet: true,
      stats: 'minimal',
    },
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
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(ngpack.env),
      }),
    ],
    resolve: {
      alias: {
        'app': 'src/app',
        'common': 'src/common',
      },
      extensions: ['', '.js', '.json'],
      root: ngpack.util.root(),
    },
  };

  if (ngpack.util.isDev()) {
    config.plugins.push(new dashboardPlugin());
  }

  if (!ngpack.util.isTest()) {
    config.plugins.push(
      // Generate common chunks if necessary
      // Reference: https://webpack.github.io/docs/code-splitting.html
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'polyfills'],
      }),

      // Inject script and link tags into html files
      // Reference: https://github.com/ampedandwired/html-webpack-plugin
      new htmlWebpackPlugin({
        chunksSortMode: 'dependency',
        template: './src/public/index.html',
      }),

      // Extract css files
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Disabled when in test mode or not in build mode
      new extractTextPlugin('css/[name].[hash].css', {
        disable: !ngpack.util.isProd(),
      })
    );
  }

  // Add build specific plugins
  if (ngpack.util.isProd()) {
    config.plugins.push(
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({ mangle: { keep_fnames: true } }),

      // Copy assets from the public folder
      new copyWebpackPlugin([{
        from: ngpack.util.root('./src/public'),
      }])
    );
  }

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