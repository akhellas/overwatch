import http from 'http'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import compress from 'compression'
import helmet from 'helmet'
import router from './routes'
import { MongoClient } from 'mongodb'
import 'babel-polyfill'
import eaa from 'express-async-await'
import ws from 'socket.io'

import db from './db'

const delay = 0

const port = process.env.port || 7000
const app = eaa(express())
app.server = http.createServer(app)

app.use(morgan('dev'))
app.use(compress())
app.use(helmet())
app.use(cors({ exposedHeaders: ['X-Paging-Total'] }))
app.use(
  bodyParser.json({
    limit: '10mb'
  })
)

if (delay && delay > 0) {
  app.use((req, res, next) => setTimeout(next, delay))
}

// const io = ws(app.server)

// io.on('connection', function(socket) {
//   console.log('a user connected')
//   socket.on('disconnect', function() {
//     console.log('user disconnected')
//   })
// })

const init = async () => {
  try {
    const _db = await db()
    app.use('/api', router(_db))
    app.use((err, req, res, next) => {
      console.error(err)
      res.status(500).send('Something broke!!')
    })
    app.server.listen(port, () => {
      console.info(`server started on port ${port}`)
    })
  } catch (err) {
    console.error('Failed to make database connection!')
    console.error(err)
  }
}

init()

export default app
