import { Configuration } from 'webpack';
import { NgPackExtension, ConfigGenerator } from './lib/config-generator';
import { EnvParser, INgPackEnv } from './lib/env-parser';

export class NgPack {
  private extensions: NgPackExtension[] = [];

  public add(extension: NgPackExtension) {
    this.extensions.push(extension);
    return this;
  }

  public make(): Configuration {
    const configGenerator = new ConfigGenerator(this.extensions);
    return configGenerator.generate(this);
  }

  public get env(): INgPackEnv {
    return EnvParser.parse();
  }
}

export const ngpack = new NgPack();
export default ngpack;
export * from './lib';