import express from 'express';
import { createMovie } from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createMovie', protect, createMovie);

export default router;