import * as plugins from './serverconfig.plugins';
import { Server } from 'http';

export class ServerConfig {
  public static getDefaultInstance = () => {
    return defaultServerConfigInstance;
  };

  public async serverAlreadyConfigured(): Promise<boolean> {
    return false;
  }
}

const defaultServerConfigInstance = new ServerConfig();
