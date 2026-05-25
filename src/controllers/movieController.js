import { prisma } from '../config/db.js';

const createMovie = async (req, res) => {
  try {

    const {
      title,
      overview,
      releaseYear,
      genre,
      runtime,
      posterUrl,
    } = req.body || {};

    const userId = req.user?.id;

    // validation
    if (!title || !releaseYear || !userId) {
      return res.status(400).json({
        error: 'title, releaseYear, and authenticated user are required',
      });
    }

    // ensure user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ error: 'Authenticated user not found' });
    }

    // create movie and connect to existing user
    const movie = await prisma.movie.create({
      data: {
        title,
        overview,
        releaseYear,
        genre: genre || [],
        runtime,
        posterUrl,
        creator: { connect: { id: userId } },
      },
    });

    res.status(201).json({
      message: 'movie created successfully',
      data: movie,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: 'internal server error',
    });
  }
};

export { createMovie };