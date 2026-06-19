const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

async function request(path, options = {}){
  const headers = options.headers || {}
  const token = localStorage.getItem('token')
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!headers['Content-Type'] && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json'

  const res = await fetch(API_BASE + path, {
    ...options,
    headers,
  })

  const text = await res.text()
  let parsed
  try { parsed = JSON.parse(text) } catch(e){ parsed = text }

  // If backend returns { message, data }, unwrap data
  if (parsed && typeof parsed === 'object' && 'data' in parsed) return parsed.data
  return parsed
}

export const auth = {
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request('/auth/me'),
  logout: () => request('/auth/logout', { method: 'POST' }),
}

export const movies = {
  list: () => request('/movies'),
  get: (id) => request(`/movies/${id}`),
  create: (data) => request('/movies/createMovie', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/movies/updateMovie/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/movies/deleteMovie/${id}`, { method: 'DELETE' }),
}

export const watchlist = {
  get: () => request('/watchlist'),
  add: (payload) => request('/watchlist/addToWatchlist', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/watchlist/updateWatchlistItem/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => request(`/watchlist/removeFromWatchlist/${id}`, { method: 'DELETE' }),
}

export default { auth, movies, watchlist }
