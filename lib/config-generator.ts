import * as merge from 'webpack-merge';

import { requireExt } from './utils';

export class ConfigGenerator {
  constructor(private extensions: string[]) { }

  public generate() {
    return this.extensions.reduce((config, extName) => {
      const extConfig = requireExt(extName).provide();
      return merge.smart(config, extConfig);
    }, {} as Object);
  }
}
