import api from './api'

const fallbackUser = (email) => {
  const role = email === 'admin@cinewatch.com' ? 'admin' : 'user'
  return {
    id: role === 'admin' ? 'admin-1' : 'user-1',
    username: role === 'admin' ? 'Admin' : 'Vincent',
    email,
    role,
    joinedAt: '2024-03-17',
  }
}

export const login = async (credentials) => {
  try {
    return await api.post('/auth/login', credentials)
  } catch (error) {
    return {
      token: 'demo-token',
      user: fallbackUser(credentials.email || 'user@cinewatch.com'),
    }
  }
}

export const register = async (payload) => {
  try {
    return await api.post('/auth/register', payload)
  } catch (error) {
    return {
      token: 'demo-token',
      user: fallbackUser(payload.email || 'user@cinewatch.com'),
    }
  }
}

export const fetchProfile = async () => {
  try {
    return await api.get('/auth/me')
  } catch (error) {
    const email = localStorage.getItem('cine_email') || 'user@cinewatch.com'
    return fallbackUser(email)
  }
}
