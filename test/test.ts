import { expect, tap } from 'tapbundle'
import * as serverconfig from '../ts/index'

tap.test('first test', async () => {
  console.log(serverconfig.standardExport)
})

tap.start()
