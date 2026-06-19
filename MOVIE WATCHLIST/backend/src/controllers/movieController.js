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

    if (!title || !releaseYear || !userId) {
      return res.status(400).json({
        error: 'title, releaseYear, and authenticated user are required',
      });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ error: 'Authenticated user not found' });
    }

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

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, overview, releaseYear, genre, runtime, posterUrl } = req.body || {};

    const movie = await prisma.movie.findUnique({ where: { id } });

    if (!movie) {
      return res.status(404).json({ error: 'movie not found' });
    }

    if (movie.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'not authorized to update this movie' });
    }

    const updated = await prisma.movie.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(overview !== undefined && { overview }),
        ...(releaseYear !== undefined && { releaseYear }),
        ...(genre !== undefined && { genre }),
        ...(runtime !== undefined && { runtime }),
        ...(posterUrl !== undefined && { posterUrl }),
      },
    });

    res.status(200).json({
      message: 'movie updated successfully',
      data: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await prisma.movie.findUnique({ where: { id } });

    if (!movie) {
      return res.status(404).json({ error: 'movie not found' });
    }

    if (movie.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'not authorized to delete this movie' });
    }

    await prisma.movie.delete({ where: { id } });

    res.status(200).json({ message: 'movie deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: { creator: { select: { id: true, username: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ message: 'movies fetched', data: movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: { creator: { select: { id: true, username: true } } },
    });
    if (!movie) {
      return res.status(404).json({ error: 'movie not found' });
    }
    res.status(200).json({ message: 'movie fetched', data: movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' });
  }
};

export { createMovie, updateMovie, deleteMovie, getMovies, getMovieById };
