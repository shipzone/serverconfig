import * as plugins from './serverconfig.plugins';

const serverConfigCli = new plugins.smartcli.Smartcli();

serverConfigCli.standardTask().subscribe(argvArg => {
  
});

/**
 * stack command
 * adds ability to start stacks on server like a simple traffic server
 */
serverConfigCli.addCommand('stack').subscribe(argvArg => {
  
})
