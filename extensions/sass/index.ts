import { Configuration } from 'webpack';
import { NgPack } from '@ngpack/ngpack';

const extractTextPlugin = require('extract-text-webpack-plugin');

export function provide(ngpack: NgPack): Configuration {
  const config: Configuration = {
    module: {
      loaders: [
        // support for .scss/.sass files
        // use 'null' loader in test mode
        // all css in src/style will be bundled in an external css file
        {
          exclude: ngpack.util.root('src', 'app'),
          loader: ngpack.util.isTest() ? 'null' :
            extractTextPlugin.extract('style', 'css?sourceMap!postcss!sass'),
          test: /\.s[ac]ss$/,
        },
        // all css required in src/app files will be merged in js files
        {
          exclude: ngpack.util.root('src', 'style'),
          loader: 'raw!postcss!sass',
          test: /\.s[ac]ss$/,
        },
      ],
    },
  };

  Object.assign(config,
    /**
     * Sass
     * Reference: https://github.com/jtangelder/sass-loader
     * Transforms .scss/.sass files to .css
     */
    {
      sassLoader: {
        // includePaths: [
        //   path.resolve(__dirname, 'node_modules/foundation-sites/scss'),
        // ],
      },
    });

  return config;
}