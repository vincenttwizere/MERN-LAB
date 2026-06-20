import { create } from 'zustand'

const initialUser = JSON.parse(localStorage.getItem('cine_user') || 'null')
const initialToken = localStorage.getItem('cine_token')
const initialRole = localStorage.getItem('cine_role') || (initialUser?.role || 'guest')

const useAuthStore = create((set, get) => ({
  token: initialToken,
  user: initialUser,
  role: initialRole,
  setAuth: (token, user) => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
    localStorage.setItem('cine_user', JSON.stringify(user))
    localStorage.setItem('cine_role', user?.role || 'user')
    set({ token, user, role: user?.role || 'user' })
  },
  logout: () => {
    localStorage.removeItem('cine_token')
    localStorage.removeItem('cine_user')
    localStorage.removeItem('cine_role')
    set({ token: null, user: null, role: 'guest' })
  },
  isLoggedIn: () => Boolean(get().token),
  isAdmin: () => get().role === 'admin',
}))

export default useAuthStore
