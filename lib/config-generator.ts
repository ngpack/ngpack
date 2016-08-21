import * as util from 'util';
import { Configuration } from 'webpack';
import * as merge from 'webpack-merge';

import { requireExt } from './utils';

export type NgPackExtension = string | Function | Configuration;

export class ConfigGenerator {
  constructor(private extensions: NgPackExtension[]) { }

  public generate() {
    return this.extensions.reduce((config, extension) => {
      let extConfig: Configuration;

      if (typeof extension === 'string') {
        extConfig = requireExt(extension).provide();
      } else if (typeof extension === 'function') {
        extConfig = extension();
      } else if (typeof extension === 'object') {
        extConfig = extension;
      } else {
        throw new Error('Invalid extension: ' + util.inspect(extension));
      }

      return merge.smart(config, extConfig);
    }, {} as Configuration);
  }
}
