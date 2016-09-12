import * as util from 'util';
import { Configuration } from 'webpack';
import * as merge from 'webpack-merge';
import { NgPack } from '@ngpack/ngpack';

export interface INgPackModifier {
  (config: Configuration, ngpack: NgPack): void;
}
export interface INgPackExtensionFunction {
  (ngpack: NgPack): Configuration;
}

export type NgPackExtension = string | INgPackExtensionFunction | Configuration;

interface INgPackItem {
  type: string;
  value: INgPackModifier | NgPackExtension;
}

function requireExt(extName: string) {
  return require.main.require(extName);
}

export class ConfigGenerator {
  private items: INgPackItem[] = [];

  public constructor(private ngpack: NgPack) { }

  public add(extension: NgPackExtension) {
    const type = (() => {
      if (typeof extension === 'string') {
        return 'extName';
      } else if (typeof extension === 'function') {
        return 'extFunction';
      } else if (typeof extension === 'object') {
        return 'extObject';
      } else {
        throw new Error('Invalid extension: ' + util.inspect(extension));
      }
    })();

    this.items.push({
      type: type,
      value: extension,
    });
  }

  public modify(modifier: INgPackModifier) {
    this.items.push({
      type: 'extModifier',
      value: modifier,
    });
  }

  public generate(): Configuration {
    return this.items.reduce((config, item) => {
      const extConfig = (() => {
        switch (item.type) {
          case 'extName':
            const ext = requireExt(item.value as string).provide(this.ngpack);
            return typeof ext === 'function' ? ext(this.ngpack) : ext;
          case 'extFunction':
            const extFunction = item.value as INgPackExtensionFunction;
            return extFunction(this.ngpack);
          case 'extObject':
            return item.value as Configuration;
          case 'extModifier':
            (item.value as INgPackModifier)(config, this.ngpack);
            return {};  // just a modification to original, not an extension
          default:
            throw new Error('Invalid ngpack item: ' + util.inspect(item.value));
        }
      })();

      return merge.smart(config, extConfig);
    }, {} as Configuration);
  }
}
