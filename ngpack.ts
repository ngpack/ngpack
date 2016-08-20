import { ConfigGenerator } from './lib/config-generator';

class NgPack {
  private extensions: string[] = [];

  public add(extension: string) {
    this.extensions.push(extension);
    return this;
  }

  public make() {
    const configGenerator = new ConfigGenerator(this.extensions);
    return configGenerator.generate();
  }
}

export const ngpack = new NgPack();
export default ngpack;