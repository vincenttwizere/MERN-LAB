import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaChevronDown, FaMoon, FaSun, FaUserCircle } from 'react-icons/fa'
import useAuthStore from '../store/authStore'
import SearchBar from './SearchBar'

const translators = ['Rocky', 'Junior', 'Younger', 'Savimbi', 'Pick', 'Sankara']
const seriesCountries = [
  { label: 'All Series', path: '/series' },
  { label: 'Rwandan Series', path: '/series/rwanda' },
  { label: 'Korean Series', path: '/series/korea' },
  { label: 'Indian Series', path: '/series/india' },
  { label: 'Nigerian Series', path: '/series/nigeria' },
]

export default function NavBar() {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const isAdmin = useAuthStore((state) => state.role === 'admin')
  const logout = useAuthStore((state) => state.logout)
  const [translatedOpen, setTranslatedOpen] = useState(false)
  const [seriesOpen, setSeriesOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [theme, setTheme] = useState('dark')

  const menuOptions = useMemo(() => {
    if (!token) return []
    return [
      { label: 'My Profile', url: '/profile' },
      ...(isAdmin ? [{ label: 'Admin Dashboard', url: '/admin' }] : []),
      { label: 'My Watchlist', url: '/watchlist' },
      { label: 'Downloads', url: '/downloads' },
      { label: 'Settings', url: '/profile' },
    ]
  }, [token, isAdmin])

  useEffect(() => {
    const preferredScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const savedTheme = localStorage.getItem('theme')
    const initial = savedTheme || preferredScheme
    setTheme(initial)
    document.body.classList.toggle('theme-light', initial === 'light')
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.body.classList.toggle('theme-light', nextTheme === 'light')
    localStorage.setItem('theme', nextTheme)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl">
      <div className="navbar-inner mx-auto flex items-center gap-4 py-3 lg:gap-5">
        <Link to="/" className="text-xl font-bold tracking-wide text-white">🎬 CineWatch</Link>

        <nav className="hidden flex-1 items-center gap-4 lg:flex">
          <Link to="/" className="text-sm text-neutral-300 transition hover:text-white">Home</Link>
          <Link to="/movies/english" className="text-sm text-neutral-300 transition hover:text-white">English Movies</Link>

          <div className="relative">
            <button type="button" onClick={() => setTranslatedOpen((value) => !value)} className="inline-flex items-center gap-1 text-sm text-neutral-300 transition hover:text-white">
              Translated <FaChevronDown className="text-xs" />
            </button>
            {translatedOpen && (
              <div className="absolute left-0 mt-3 w-44 rounded-3xl dropdown-panel">
                {translators.map((translator) => (
                  <Link key={translator} to={`/translated/${translator}`} className="block rounded-2xl px-4 py-3 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white">👤 {translator}</Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button type="button" onClick={() => setSeriesOpen((value) => !value)} className="inline-flex items-center gap-1 text-sm text-neutral-300 transition hover:text-white">
              Series <FaChevronDown className="text-xs" />
            </button>
            {seriesOpen && (
              <div className="absolute left-0 mt-3 w-56 rounded-3xl dropdown-panel">
                {seriesCountries.map((country) => (
                  <Link key={country.path} to={country.path} className="block rounded-2xl px-4 py-3 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white">{country.label}</Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden lg:block w-full max-w-lg"><SearchBar /></div>
          {!token ? (
            <div className="flex items-center gap-3">
              <Link to="/login" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">Account</Link>
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-full border transition"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          ) : (
            <div className="relative">
              <button onClick={() => setMenuOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
                <FaUserCircle /> {user?.username || 'User'}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-3xl bg-[#0b0b0f] p-3 shadow-glow">
                  {menuOptions.map((option) => (
                    <Link key={option.url} to={option.url} className="block rounded-2xl px-4 py-3 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white">{option.label}</Link>
                  ))}
                  <button onClick={handleLogout} className="mt-2 w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
