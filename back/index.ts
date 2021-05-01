import * as path from 'path'
import * as ejs from 'ejs'
import * as express from 'express'

import { langs, defaultLang } from '$common/constants'

const PORT = 8789

const app = express()

app.get('/', (req, res) => {
  res.redirect(`/${defaultLang}`)
})

langs.forEach(lang => {
  app.get(`/${lang}`, (req, res) => {
    ejs.renderFile(path.resolve(__dirname, '..', 'ejs', 'frame.ejs'), {
      lang
    }).then(html => { res.send(html) }).catch(err => {
      res.status(500).send(err.message)
    })
  })
})

app.listen(PORT, () => {
  console.log(`> App listening on port ${PORT}`)
})
