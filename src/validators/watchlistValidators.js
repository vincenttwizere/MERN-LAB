import { z } from 'zod';

const VALID_STATUSES = ['Planned', 'Watching', 'Completed', 'Dropped'];

export const addToWatchlistSchema = z.object({
  movieId: z.string().uuid('movieId must be a valid UUID'),
  status: z.enum(VALID_STATUSES).optional(),
  rating: z.coerce.number().int('Rating must be an integer').min(0, 'Rating must be at least 0').max(10, 'Rating cannot exceed 10').optional(),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
}).strict();

export const updateWatchlistItemSchema = z.object({
  status: z.enum(VALID_STATUSES).optional(),
  rating: z.coerce.number().int('Rating must be an integer').min(0, 'Rating must be at least 0').max(10, 'Rating cannot exceed 10').optional(),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
})
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Provide at least one field to update',
  })
  .strict();
