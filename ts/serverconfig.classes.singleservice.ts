import * as plugins from './serverconfig.plugins';

export interface ISingleServiceConfig {
  dockerImage: string;
  dockerRegistry: string;
  dockerUser: string;
  dockerPass: string;
}

export class SingleService {
  config: ISingleServiceConfig;
  constructor(configArg: ISingleServiceConfig) {
    this.config = configArg;
  };

  async deploy() {
    const smartshellInstance = new plugins.smartshell.Smartshell({
      executor: 'bash'
    });
    
    // lets put the server into swarm mode
    await smartshellInstance.exec('(docker swarm init )');

    await smartshellInstance.exec('docker network create -d overlay --attachable webgateway')

    // lets install the traefik stack
    await smartshellInstance.exec('(cd cd assets/singleservice && chmod 600 ./configs/acme.json )');
    await smartshellInstance.exec('(cd assets/singleservice && docker stack deploy --compose-file docker-compose.yml traefikstack)');

  }
}
