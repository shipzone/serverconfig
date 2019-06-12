import * as plugins from './serverconfig.plugins';
import { ServerConfig } from './serverconfig.classes.serverconfig';

import { coloredString as cs } from '@pushrocks/consolecolor';

const serverConfigCli = new plugins.smartcli.Smartcli();

serverConfigCli.standardTask().subscribe(async argvArg => {
  // check if server is already configured
  const serverConfig = await ServerConfig.getInstance();
  if (serverConfig.isConfigured) {
    console.log('Server is already configured! There is nothing to do here!');
    // TODO: Implement reconfiguration
    return;
  }

  const siInstance = new plugins.smartinteract.SmartInteract();
  siInstance.addQuestions([
    {
      message: 'Please enter the configly token:',
      default: 'ip based',
      name: 'token',
      type: "input"
    }
  ]);
  const answerBucket = await siInstance.runQueue();
  const token = answerBucket.getAnswerFor('token');
  
});
serverConfigCli.startParse();
