import * as plugins from './serverconfig.plugins';
import { SingleService } from './serverconfig.classes.singleservice';

import { coloredString as cs } from '@pushrocks/consolecolor';

const serverConfigCli = new plugins.smartcli.Smartcli();

serverConfigCli.standardTask().subscribe(async argvArg => {
  const siInstance = new plugins.smartinteract.SmartInteract();
  siInstance.addQuestions([
    {
      message: 'What is the purpose of this server?',
      choices: ['single service', 'servezone node'],
      default: 'single service',
      name: 'purpose',
      type: 'list'
    }
  ]);
  const answerBucket = await siInstance.runQueue();
  const purpose = answerBucket.getAnswerFor('purpose');
  if(purpose === 'single service') {
    console.log(`You selected ${cs('SINGLE SERVICE', "green")} as purpose of this server.`)
    console.log(`This will install ${cs('traefik', "pink")} with automatic ${cs('letsencrypt', "pink")} on this server`);
    const dockerLoginBool = await siInstance.askQuestion({
      message: 'do you want to log in to a private docker registry?',
      type: 'confirm',
      default: true,
      name: 'dockerLoginBool'
    });
    if(dockerLoginBool) {
      console.log('great! Lets start your service: please enter your service info in the following format:');
      console.log(`${cs('REGISTRY_URL', 'pink')}|${cs('REGISTRY_USERNAME', 'pink')}|${cs('REGISTRY_PASSWORD', 'pink')}|${cs('IMAGE_NAME', 'pink')}|${cs('URL_TO_SERVE_UNDER', 'pink')}`);
      const singleServiceInstance = new SingleService({
        dockerImage: '',
        dockerPass: '',
        dockerRegistry: '',
        dockerUser: ''
      });
      singleServiceInstance.deploy();
    }
  }

  // install traefik stack

});

/**
 * stack command
 * adds ability to start stacks on server like a simple traffic server
 */
serverConfigCli.addCommand('stack').subscribe(argvArg => {
  
});

serverConfigCli.startParse();
