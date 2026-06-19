import http from './http';

export const loginUser = (payload) => http.post('/auth/login', payload);
export const registerUser = (payload) => http.post('/auth/register', payload);
export const fetchCurrentUser = () => http.get('/auth/me');
