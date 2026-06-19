import http from './http';

export const fetchWatchlist = () => http.get('/watchlist');
export const addToWatchlist = (payload) => http.post('/watchlist/addToWatchlist', payload);
export const updateWatchlistItem = (id, payload) => http.put(`/watchlist/updateWatchlistItem/${id}`, payload);
export const removeFromWatchlist = (id) => http.delete(`/watchlist/removeFromWatchlist/${id}`);
