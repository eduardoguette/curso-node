import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moviesdb',
  port: 3307
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      if (genres.length === 0) return []
      // select all movies with that genre
      const sqlQuery = `
      SELECT movie.title, movie.year, movie.duration, movie.poster, movie.rate, GROUP_CONCAT(genre.name) as genres
      FROM movie
      INNER JOIN movie_genres ON movie.id = movie_genres.movie_id
      INNER JOIN genre ON movie_genres.genre_id = genre.id
      WHERE movie.id IN (
        SELECT movie.id
        FROM movie
        INNER JOIN movie_genres ON movie.id = movie_genres.movie_id
        INNER JOIN genre ON movie_genres.genre_id = genre.id
        WHERE genre.name = ?
      )
      GROUP BY movie.title, movie.year, movie.duration, movie.poster, movie.rate;`

      const [rows] = await connection.query(sqlQuery, [genres[0].name])

      return rows.map((movie) => ({
        ...movie,
        genres: movie.genres.split(',')
      }))
    }

    const [rows] = await connection.query(
      'SELECT title, year, duration, poster, rate, BIN_TO_UUID(id) id FROM movie'
    )
    return rows
  }

  static getById = async ({ id }) => {
    const [rows] = await connection.execute(
      'SELECT title, year, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)',
      [id]
    )
    if (rows.length === 0) return null

    return rows[0]
  }

  static create = async ({ movie }) => {
    const { title, year, duration, poster, director, rate } = movie

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?)`,
        [title, year, director, duration, poster, rate]
      )

      const [movies] = await connection.query(
        'SELECT title, year, duration, poster, director, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
        [uuid]
      )

      return movies[0]
    } catch (error) {
      console.log(error)
      return null
    }
  }

  static delete = async ({ id }) => {
    const [rows] = await connection.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?);', [id])
    if (rows.affectedRows === 0) return null

    return rows
  }

  static update = async ({ id, ...movie }) => {}
}
