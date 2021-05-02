import { Express } from 'express'

import assetsRouter from './assets'

export default (app: Express): void => {
  assetsRouter(app)
}
