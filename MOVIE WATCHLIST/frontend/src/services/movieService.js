import api from './api'

export const getMovies = async () => {
  try {
    return await api.get('/movies')
  } catch (error) {
    return []
  }
}

export const getMovieById = async (id) => {
  try {
    return await api.get(`/movies/${id}`)
  } catch (error) {
    return null
  }
}

export const likeMovie = async (id) => {
  try {
    return await api.post(`/movies/${id}/like`)
  } catch (error) {
    return null
  }
}

export const downloadMovie = async (id) => {
  try {
    return await api.post(`/movies/${id}/download`)
  } catch (error) {
    return null
  }
}
