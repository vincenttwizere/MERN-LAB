import express from 'express';
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/addToWatchlist', addToWatchlist);
router.delete('/removeFromWatchlist/:id', removeFromWatchlist);
router.put('/updateWatchlistItem/:id', updateWatchlistItem);
router.post('/updateWatchlistItem/:id', updateWatchlistItem);

export default router;
