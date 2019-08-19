import * as plugins from './serverconfig.plugins';

export const logger = new plugins.smartlog.Smartlog({
  minimumLogLevel: 'silly',
  logContext: {
    company: 'Some Company',
    companyunit: 'Some Cloud',
    containerName: 'server',
    environment: 'production',
    runtime: 'node',
    zone: 'shipzone'
  }
});

logger.addLogDestination(new plugins.smartlogDestinationLocal.DestinationLocal());
