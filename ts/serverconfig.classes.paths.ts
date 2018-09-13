import * as plugins from './serverconfig.plugins';

export const packageDir = plugins.path.join(__dirname, '../');
export const assetDir = plugins.path.join(packageDir, 'assets');
export const singleServiceDir = plugins.path.join(assetDir, 'singleservice');
