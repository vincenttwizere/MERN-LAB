import http from './http';

export const fetchMovies = () => http.get('/movies');
export const fetchMovieById = (id) => http.get(`/movies/${id}`);
export const createMovie = (payload) => http.post('/movies/createMovie', payload);
