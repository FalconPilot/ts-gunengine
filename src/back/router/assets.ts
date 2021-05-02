import * as fs from 'fs'
import * as path from 'path'
import { Express } from 'express'

export default (app: Express): void => {
  app.use('/assets/*', (req, res) => {
    const asset = fs.readFileSync(path.resolve(__dirname, '..', 'static', 'assets', req.params[0]))
    res.send(asset)
  })
}
