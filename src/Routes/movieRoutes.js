import express from 'express';
import { createMovie } from '../controllers/movieController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createMovie', authMiddleware, createMovie);

export default router;