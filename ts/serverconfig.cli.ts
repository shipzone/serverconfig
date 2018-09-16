import * as plugins from './serverconfig.plugins';
import { ServerConfig } from './serverconfig.classes.serverconfig';
import { SingleService } from './serverconfig.classes.singleservice';

import { coloredString as cs } from '@pushrocks/consolecolor';

const serverConfigCli = new plugins.smartcli.Smartcli();

serverConfigCli.standardTask().subscribe(async argvArg => {
  // check if server is already configured
  const serverConfig = ServerConfig.getDefaultInstance();
  if(serverConfig.serverAlreadyConfigured()) {
    console.log('Server is already configured! Nothing ti di here!')
    return
  }

  const siInstance = new plugins.smartinteract.SmartInteract();
  siInstance.addQuestions([
    {
      message: 'What is the purpose of this server?',
      choices: [
        'single service configured through cli',
        'single service configured through configly',
        'stack.yml versioned in git',
        'servezone node'
      ],
      default: 'single service',
      name: 'purpose',
      type: 'list'
    }
  ]);
  const answerBucket = await siInstance.runQueue();
  const purpose = answerBucket.getAnswerFor('purpose');
  if(purpose === 'single service configured through cli') {
    console.log(`You selected ${cs('SINGLE SERVICE CONFIGURED THROUGH CLI', "green")} as purpose of this server.`)
    console.log(`This will install ${cs('traefik', "pink")} with automatic ${cs('letsencrypt', "pink")} on this server`);
    const dockerLoginBool = await siInstance.askQuestion({
      message: 'do you want to log in to a private docker registry?',
      type: 'confirm',
      default: true,
      name: 'dockerLoginBool'
    });
    if(dockerLoginBool.value) {
      console.log('great! Lets start your service: please enter your service info in the following format:');
      console.log(`${cs('REGISTRY_URL', 'pink')}|${cs('REGISTRY_USERNAME', 'pink')}|${cs('REGISTRY_PASSWORD', 'pink')}`);
      const dockerCredentialsAnswer = await siInstance.askQuestion({
        message: 'Please provide the docker registry credentials as shown above',
        type: 'input',
        default: '',
        name: 'docker credentials'
      });
      const dockerCredentialsArray: string[] = dockerCredentialsAnswer.value.split('|');

      console.log('great! Lets start your service: please enter your service info in the following format:');
      console.log(`${cs('serviceImage', 'pink')}|${cs('serviceName', 'pink')}|${cs('serviceDomain', 'pink')}`);
      const serviceInfoAnswer = await siInstance.askQuestion({
        message: 'Please provide the service info as shown above',
        type: 'input',
        default: '',
        name: 'docker credentials'
      });
      const serviceInfoArray: string[] = serviceInfoAnswer.value.split('|');

      const singleServiceInstance = new SingleService({
        dockerRegistry: dockerCredentialsArray[0],
        dockerUser: dockerCredentialsArray[1],
        dockerPass: dockerCredentialsArray[2],
        serviceImage: serviceInfoArray[0],
        serviceName: serviceInfoArray[1],
        serviceDomain: serviceInfoArray[2]
      });
      singleServiceInstance.deploy();
    }
  }

});
serverConfigCli.startParse();
