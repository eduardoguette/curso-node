import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'
// como leer un json en ESModules
// import fs from 'fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'))

const app = express()
app.use(json())
app.use(corsMiddleware())

app.disable('x-powered-by')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.use('/movies', moviesRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
