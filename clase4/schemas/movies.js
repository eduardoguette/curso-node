import { z } from 'zod'
const movieSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }),
  director: z.string(),
  year: z.number().int().min(1888).max(2024),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'Horror',
      'Mystery',
      'Sci-Fi',
      'Thriller',
      'Western'
    ])
  ),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  })
})

export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}
