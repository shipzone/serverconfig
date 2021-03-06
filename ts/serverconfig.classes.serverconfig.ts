import * as plugins from './serverconfig.plugins';
import { Server } from 'http';

export class ServerConfig {
  // STATIC
  private static defaultInstance: ServerConfig
  public static async getInstance() {
    if (!ServerConfig.defaultInstance) {
      ServerConfig.defaultInstance = new ServerConfig();
    }
    return ServerConfig.defaultInstance;
  };

  // INSTANCE
  configObject: any;
  constructor() {

  }

  get isConfigured (): boolean {
    return this.configObject ? true : false;
  }
}
