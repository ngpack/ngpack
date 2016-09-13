/*
  npm run build --env.mode=dev  / development
  npm run build --env.mode=prod / production
  npm run build --env.mode=test / testing
*/

import { argv } from 'yargs';

const args = argv as any;
args.env = args.env || {};

export interface INgPackEnv {
  mode: NgPackMode;
  root: string;
  port: number;
}

export interface INgPackEnvConfig {
  port?: number;
  root?: string;
}

export class NgPackMode {
  public static DEV = 'development';
  public static PROD = 'production';
  public static TEST = 'testing';
}

export class EnvParser {
  private config: INgPackEnvConfig = {};

  public configure(config: INgPackEnvConfig) {
    this.config = Object.assign({}, this.config, config);
  }

  public parse(): INgPackEnv {
    return {
      mode: this.getMode(),
      port: this.config.port || 8080,
      root: this.config.root || process.cwd(),
    };
  }

  private getMode() {
    const accepted = [NgPackMode.DEV, NgPackMode.PROD, NgPackMode.TEST];
    const mode = args.env.mode || NgPackMode.DEV;

    if (accepted.indexOf(mode) === -1) {
      throw new Error(
        `Unrecognised mode: ${mode}. Accepted values: ${accepted.join(', ')}`);
    }

    return mode;
  }
}