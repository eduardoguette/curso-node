import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRoutes } from './routes/movies.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())

  app.disable('x-powered-by')

  app.use(express.static('public'))

  app.get('/', (req, res) => {
    res.send('Hola mundo')
  })

  app.use('/movies', createMovieRoutes({ movieModel }))

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
  })
}
