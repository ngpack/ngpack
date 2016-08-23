import { NgPackExtension, ConfigGenerator } from './lib/config-generator';
import { EnvParser, INgPackEnvConfig } from './lib/env-parser';
import { Util } from './lib/util';

export class NgPack {
  private extensions: NgPackExtension[] = [];
  private envParser = new EnvParser();

  public get env() {
    return this.envParser.parse();
  }

  public get util() {
    return Util;
  }

  public add(extension: NgPackExtension) {
    this.extensions.push(extension);
    return this;
  }

  public configure(config: INgPackEnvConfig) {
    this.envParser.configure(config);
    return this;
  }

  public make() {
    const configGenerator = new ConfigGenerator(this.extensions);
    return configGenerator.generate(this);
  }
}

export const ngpack = new NgPack();
export default ngpack;
