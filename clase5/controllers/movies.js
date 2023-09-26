import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { readJSON } from '../utils/index.js'
const movies = readJSON('../movies.json')

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
    console.log(this.movieModel)
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    // movies/:id/:mas/:otro   ->  const { id, mas, otro } = req.params
    // También puede ser regex ->  movies/:id(\d+)  ->  const { id } = req.params
    // O todo lo que termine con .dev ->  /.*dev$/  -> midudev, guettedev
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)

    return res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const newMovie = await this.movieModel.create({ movie: result.data })

    return res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    movies.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    const updatedMovie = {
      ...movies[movieIndex],
      ...result.data
    }

    movies[movieIndex] = updatedMovie

    return res.json(updatedMovie)
  }
}
