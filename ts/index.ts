import * as early from '@pushrocks/early';
early.start('serverconfig')
import * as plugins from './serverconfig.plugins';
early.stop().then(() => {
  plugins;
  import('./serverconfig.cli');
});
