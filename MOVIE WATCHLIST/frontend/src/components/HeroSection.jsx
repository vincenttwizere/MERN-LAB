import { useEffect, useMemo, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { featuredMovies } from '../data/demoData'

export default function HeroSection() {
  const [index, setIndex] = useState(0)
  const current = featuredMovies[index]

  useEffect(() => {
    const interval = setInterval(() => setIndex((value) => (value + 1) % featuredMovies.length), 8000)
    return () => clearInterval(interval)
  }, [])

  const genreLabel = useMemo(() => current.genre.join(' | '), [current])

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-black shadow-glow">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      <img src={current.backdrops[0]} alt={current.title} className="h-[720px] w-full object-cover object-center opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-y-0 left-0 flex w-full items-center px-6 md:px-16">
        <div className="max-w-2xl space-y-5">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-neutral-300">{genreLabel}</span>
          <h1 className="text-5xl font-extrabold leading-[1.02] md:text-6xl">{current.title}</h1>
          <p className="max-w-xl text-sm leading-7 text-neutral-300 md:text-base">{current.overview}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-300">
            <span className="rounded-full bg-white/5 px-3 py-2">⭐ {current.rating}</span>
            <span className="rounded-full bg-white/5 px-3 py-2">📅 {current.year}</span>
            <span className="rounded-full bg-white/5 px-3 py-2">⏱ {current.runtime} min</span>
            <span className="rounded-full bg-white/5 px-3 py-2">🌍 {current.language}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/login" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-red-600"><FaPlay /> Watch Now</a>
            <a href="/login" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40">+ Add to Watchlist</a>
          </div>
        </div>
      </div>
    </section>
  )
}
