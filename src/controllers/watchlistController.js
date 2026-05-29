import { prisma } from '../config/db.js';

const addToWatchlist = async (req, res) => {
  try {
    const { movieId, status, rating, notes } = req.body || {};

    if (!movieId) {
      return res.status(400).json({ error: 'movieId is required' });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(404).json({ error: 'movie not found' });
    }

    const existingInWatchlist = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId,
        },
      },
    });

    if (existingInWatchlist) {
      return res.status(400).json({ error: 'movie already in watchlist' });
    }

    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId: req.user.id,
        movieId,
        status: status || 'Planned',
        rating: rating ?? null,
        notes,
      },
    });

    res.status(201).json({
      message: 'movie added to watchlist',
      data: { watchlistItem },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const { id } = req.params;

    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id },
    });

    if (!watchlistItem) {
      return res.status(404).json({ error: 'item not found' });
    }

    if (watchlistItem.userId !== req.user.id) {
      return res.status(403).json({ error: 'not authorized to remove this item' });
    }

    await prisma.watchlistItem.delete({
      where: { id },
    });

    res.status(200).json({ message: 'item removed from watchlist' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' });
  }
};

const updateWatchlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rating, notes } = req.body || {};

    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id },
    });

    if (!watchlistItem) {
      return res.status(404).json({ error: 'item not found' });
    }

    if (watchlistItem.userId !== req.user.id) {
      return res.status(403).json({ error: 'not authorized to update this item' });
    }

    const updated = await prisma.watchlistItem.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(rating !== undefined && { rating }),
        ...(notes !== undefined && { notes }),
      },
    });

    res.status(200).json({
      message: 'watchlist item updated',
      data: { watchlistItem: updated },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' });
  }
};

export { addToWatchlist, removeFromWatchlist, updateWatchlistItem };
