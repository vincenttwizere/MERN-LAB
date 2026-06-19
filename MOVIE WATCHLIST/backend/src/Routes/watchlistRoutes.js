import express from 'express';
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
  getWatchlist,
} from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateRequest.js';
import {
  addToWatchlistSchema,
  updateWatchlistItemSchema,
} from '../validators/watchlistValidators.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getWatchlist);
router.post('/addToWatchlist', validate(addToWatchlistSchema), addToWatchlist);
router.delete('/removeFromWatchlist/:id', removeFromWatchlist);
router.put('/updateWatchlistItem/:id', validate(updateWatchlistItemSchema), updateWatchlistItem);
router.post('/updateWatchlistItem/:id', validate(updateWatchlistItemSchema), updateWatchlistItem);

export default router;
