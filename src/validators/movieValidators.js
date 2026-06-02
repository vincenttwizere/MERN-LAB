import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  overview: z.string().optional(),
  releaseYear: z.coerce.number().int('Release year must be an integer').min(1888, 'Release year must be a valid year').max(new Date().getFullYear() + 1, 'Release year must be current or next year'),
  genre: z.array(z.string()).optional(),
  runtime: z.coerce.number().int('Runtime must be an integer').positive('Runtime must be positive').optional(),
  posterUrl: z.string().url('Poster URL must be valid').optional(),
}).strict();

export const updateMovieSchema = createMovieSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided to update',
  }
);
