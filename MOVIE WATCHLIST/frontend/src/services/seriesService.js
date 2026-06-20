import api from './api'

export const getSeries = async () => {
  try {
    return await api.get('/series')
  } catch (error) {
    return []
  }
}

export const getSeriesById = async (id) => {
  try {
    return await api.get(`/series/${id}`)
  } catch (error) {
    return null
  }
}
