import * as early from '@pushrocks/early';
early.start('serverconfig');
import './serverconfig.plugins';

early.stop().then(() => {
  import('./serverconfig.cli');
});
