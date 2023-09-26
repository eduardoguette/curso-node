import { MovieModel } from '../models/local-file-system/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { readJSON } from '../utils/index.js'
const movies = readJSON('../movies.json')

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    // movies/:id/:mas/:otro   ->  const { id, mas, otro } = req.params
    // También puede ser regex ->  movies/:id(\d+)  ->  const { id } = req.params
    // O todo lo que termine con .dev ->  /.*dev$/  -> midudev, guettedev
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)

    return res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ movie: result.data })

    return res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    movies.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted' })
  }

  static async update (req, res) {
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
