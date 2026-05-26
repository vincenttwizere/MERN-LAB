import { prisma } from '../config/db.js';

const addToWatchlist = async(req, res) => {

    const { movieId, status, rating, notes } = req.body || {};


    // verify if the movie exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
    });

    if(!movie) {

        return res.status(404).json({ error: 'movie not found'});
    }
    // check if the movie is already in the user's watchlist

    const existingInWatchlist = await prisma.watchlistItem.findUnique({

        where: {
             userId_movieId: {
                 userId: req.user.id,
                  movieId
                }, 
            },
    });

    if(existingInWatchlist) {

        return res.status(400).json({ error: 'movie already in watchlist'});
    }
    // add the movie to the watchlist

    const watchlistItem = await prisma.watchlistItem.create({

        data: {
            userId: req.user.id,
            movieId,
            status: status || 'Planned',
            rating: rating || null,
            notes,
        }
    });

    res.status(201).json({ message: 'movie added to watchlist', 
        data: {
            watchlistItem,
        }
    });
};

export { addToWatchlist };