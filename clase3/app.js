const express = require('express')
const movies = require('./movies.json')
const crypto = require('crypto')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:3000',
        'http://localhost:56119'
      ]

      if (ACCEPTED_ORIGINS.includes(origin)) return callback(null, true)

      if (!origin) return callback(null, true)

      callback(new Error('Not allowed by CORS'))
    }
  })
)
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ menssage: 'Hola mundo' })
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) => {
      return movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    })
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  // movies/:id/:mas/:otro   ->  const { id, mas, otro } = req.params
  // También puede ser regex ->  movies/:id(\d+)  ->  const { id } = req.params
  // O todo lo que termine con .dev ->  /.*dev$/  -> midudev, guettedev
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)

  if (movie) return res.json(movie)

  return res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)
  // update local file
  /* fs.writeFile('./movies.json', JSON.stringify(movies), (err) => {
    if (err) return res.status(500).json({ message: 'Error saving movie' })
    return res.status(201).json(newMovie)
  }) */

  return res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params

  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie

  return res.json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.options('/movies/:id', (req, res, next) => {
  res.status(200).json({})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
