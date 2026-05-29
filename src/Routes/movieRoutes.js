import express from 'express';
import { createMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/createMovie', createMovie);
router.put('/updateMovie/:id', updateMovie);
router.delete('/deleteMovie/:id', deleteMovie);

export default router;
