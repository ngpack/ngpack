import * as util from 'util';
import { Configuration } from 'webpack';
import * as merge from 'webpack-merge';
import { NgPack } from '@ngpack/ngpack';

export type NgPackExtension = string | Function | Configuration;

function requireExt(extName: string) {
  return require.main.require(extName);
}

export class ConfigGenerator {
  constructor(private extensions: NgPackExtension[]) { }

  public generate(ngpack: NgPack): Configuration {
    return this.extensions.reduce((config, extension) => {
      let extConfig: Configuration;

      if (typeof extension === 'string') {
        extConfig = requireExt(extension).provide(ngpack);
        extConfig = typeof extConfig === 'function' ?
          extConfig(ngpack) : extConfig;
      } else if (typeof extension === 'function') {
        extConfig = extension(ngpack);
      } else if (typeof extension === 'object') {
        extConfig = extension;
      } else {
        throw new Error('Invalid extension: ' + util.inspect(extension));
      }

      return merge.smart(config, extConfig);
    }, {} as Configuration);
  }
}
