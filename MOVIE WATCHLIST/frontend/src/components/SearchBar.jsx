import { useEffect, useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { movies, seriesList } from '../data/demoData'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!query) return []
    const lower = query.toLowerCase()
    return [...movies, ...seriesList]
      .filter((item) => item.title.toLowerCase().includes(lower))
      .slice(0, 6)
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSearch} className="relative">
        <label className="sr-only" htmlFor="hero-search">Search movies or series</label>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 focus-within:border-brand">
          <FaSearch className="text-neutral-400" />
          <input
            id="hero-search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(Boolean(e.target.value)) }}
            onFocus={() => setOpen(Boolean(query))}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
            placeholder="Search movies, series, translators..."
          />
        </div>
      </form>
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-3xl border border-white/10 bg-[#07070f] p-3 shadow-glow">
          {results.map((item) => (
            <a key={item.id} href={item.type === 'series' ? `/series/${item.id}/detail` : `/movies/${item.id}`} className="flex items-center gap-3 rounded-3xl px-4 py-3 transition hover:bg-white/5">
              <img src={item.posterUrl} alt={item.title} className="h-12 w-20 rounded-xl object-cover" />
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-xs text-neutral-400">{item.genre?.slice(0,2).join(' | ')}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
