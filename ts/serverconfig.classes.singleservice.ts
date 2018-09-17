import * as plugins from './serverconfig.plugins';
import * as paths from './serverconfig.classes.paths';
import { memory } from '@pushrocks/smartfile';

export interface ISingleServiceConfig {
  // authenticating against the registry
  /**
   * the dockerregistry to log into
   */
  dockerRegistry: string;

  /**
   * the docker user to use
   */
  dockerUser: string;

  /**
   * the docker pass
   */
  dockerPass: string;

  // service deployment settings
  serviceImage: string;
  serviceName: string;
  serviceDomain: string;
}

export class SingleService {
  config: ISingleServiceConfig;
  constructor(configArg: ISingleServiceConfig) {
    this.config = configArg;
  }

  async deploy() {
    const smartshellInstance = new plugins.smartshell.Smartshell({
      executor: 'bash'
    });

    const templateString = plugins.smartfile.fs.toStringSync(
      plugins.path.join(paths.singleServiceDir, 'stack-template.yml')
    );
    const mustacheTemplate = new plugins.smartmustache.SmartMustache(templateString);
    const stringForDisk = mustacheTemplate.applyData({
      serviceImage: this.config.serviceImage,
      serviceName: this.config.serviceName,
      serviceDomain: this.config.serviceDomain
    });
    plugins.smartfile.memory.toFs(
      stringForDisk,
      plugins.path.join(paths.singleServiceDir, 'stack.yml')
    );

    // lets put the server into swarm mode
    await smartshellInstance.exec('(docker swarm init )');

    // lets login to the docker registry
    await smartshellInstance.exec(
      `(docker login -u ${this.config.dockerUser} -p ${this.config.dockerPass} ${
        this.config.dockerRegistry
      })`
    );

    await smartshellInstance.exec('docker network create -d overlay --attachable webgateway');

    // lets install the traefik stack
    await smartshellInstance.exec(
      `(cd ${paths.singleServiceDir} && chmod 600 ${paths.singleServiceDir}/configs/acme.json)`
    );
    await smartshellInstance.exec(
      `(cd ${
        paths.singleServiceDir
      } && docker stack deploy --with-registry-auth --compose-file stack.yml traefikstack)`
    );
  }
}
