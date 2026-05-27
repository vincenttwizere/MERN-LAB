import express from 'express';
import { createMovie } from '../controllers/movieController.js';

const router = express.Router();

router.post('/createMovie',  createMovie);

export default router;