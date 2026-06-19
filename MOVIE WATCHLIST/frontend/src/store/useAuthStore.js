import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  token: localStorage.getItem('watchlist_token'),
  user: null,
  setAuth: (token, user) => {
    if (token) {
      localStorage.setItem('watchlist_token', token);
    }
    set({ token, user });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('watchlist_token');
    set({ token: null, user: null });
  },
  isLoggedIn: () => Boolean(get().token),
}));

export default useAuthStore;
