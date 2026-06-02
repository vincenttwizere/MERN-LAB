import express from 'express';
import { createMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateRequest.js';
import { createMovieSchema, updateMovieSchema } from '../validators/movieValidators.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/createMovie', validate(createMovieSchema), createMovie);
router.put('/updateMovie/:id', validate(updateMovieSchema), updateMovie);
router.delete('/deleteMovie/:id', deleteMovie);

export default router;
