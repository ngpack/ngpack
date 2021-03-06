import { join } from 'path';
import { argv } from 'yargs';
import { ngpack } from '@ngpack/ngpack';

import { NgPackMode } from './env-parser';

export class Util {
  public static isDev() {
    return ngpack.env.mode === NgPackMode.DEV;
  }

  public static isProd() {
    return ngpack.env.mode === NgPackMode.PROD;
  }

  public static isTest() {
    return ngpack.env.mode === NgPackMode.TEST;
  }

  public static isTestWatch() {
    return this.isTest() && argv['auto-watch'] === true;
  }

  public static root(...paths: string[]) {
    return join(ngpack.env.root, ...paths);
  }
}