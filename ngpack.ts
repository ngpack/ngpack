import {
  NgPackExtension,
  INgPackModifier,
  ConfigGenerator,
} from './lib/config-generator';
import { EnvParser, INgPackEnvConfig } from './lib/env-parser';
import { Util } from './lib/util';

export class NgPack {
  private envParser = new EnvParser();
  private generator = new ConfigGenerator(this);

  public get snapshot() {
    return this.generator.current;
  }

  public get env() {
    return this.envParser.parse();
  }

  public get util() {
    return Util;
  }

  public add(extension: NgPackExtension) {
    this.generator.add(extension);
    return this;
  }

  public modify(modifier: INgPackModifier) {
    this.generator.modify(modifier);
    return this;
  }

  public configure(config: INgPackEnvConfig) {
    this.envParser.configure(config);
    return this;
  }

  public make() {
    return this.generator.generate();
  }
}

export const ngpack = new NgPack();
export default ngpack;
