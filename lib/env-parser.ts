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

export enum NgPackMode {
  DEV = 1,
  PROD = 2,
  TEST = 3,
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
    switch ((args.env.mode || '').toLowerCase()) {
      case 'dev': case 'development':
        return NgPackMode.DEV;
      case 'prod': case 'production':
        return NgPackMode.PROD;
      case 'test': case 'testing':
        return NgPackMode.TEST;
      default:
        return NgPackMode.DEV;
    }
  }
}