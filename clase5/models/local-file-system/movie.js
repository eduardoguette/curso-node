import { randomUUID } from 'crypto'
import { readJSON } from '../../utils/index.js'
const movies = readJSON('../movies.json')

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      const filteredMovies = movies.filter((movie) => {
        return movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      })
      return filteredMovies
    }
    return movies
  }

  static getById = async ({ id }) => {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static create = async ({ movie }) => {
    const newMovie = {
      id: randomUUID(),
      ...movie
    }
    movies.push(newMovie)
    return newMovie
  }

  static delete = async ({ id }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) {
      return false
    }
    movies.splice(movieIndex, 1)
    return true
  }

  static update = async ({ id, ...movie }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) {
      return null
    }
    const updatedMovie = {
      ...movies[movieIndex],
      ...movie
    }
    movies[movieIndex] = updatedMovie
    return updatedMovie
  }
}
