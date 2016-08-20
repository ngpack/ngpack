import { Configuration } from 'webpack';

export function provide(): Configuration {
  return {
    entry: {
      'main': './src/main.browser'
    }
  };
}