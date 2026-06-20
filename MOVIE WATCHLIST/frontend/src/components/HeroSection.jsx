import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa'
import { featuredMovies } from '../data/demoData'

export default function HeroSection() {
  const [index, setIndex] = useState(0)
  const current = featuredMovies[index]

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((value) => (value + 1) % featuredMovies.length),
      8000
    )
    return () => clearInterval(interval)
  }, [])

  const genreLabel = useMemo(() => current.genre.join(' · '), [current])

  return (
    <section className="landing-hero">
      <div className="landing-hero__content">
        <div className="landing-hero__copy">
          <span className="landing-hero__eyebrow">{genreLabel}</span>
          <h1 className="landing-hero__title">{current.title}</h1>
          <p className="landing-hero__overview">{current.overview}</p>
          <div className="landing-hero__meta">
            <span>⭐ {current.rating}</span>
            <span>{current.year}</span>
            <span>{current.runtime} min</span>
            <span>{current.language}</span>
          </div>
          <div className="landing-hero__actions">
            <Link to="/login" className="landing-hero__btn-primary">
              <FaPlay /> Watch Now
            </Link>
            <Link to="/login" className="landing-hero__btn-secondary">
              + Add to Watchlist
            </Link>
          </div>
        </div>
      </div>
      <div className="landing-hero__dots">
        {featuredMovies.map((movie, dotIndex) => (
          <button
            key={movie.id}
            type="button"
            aria-label={`Show ${movie.title}`}
            className={`landing-hero__dot${dotIndex === index ? ' is-active' : ''}`}
            onClick={() => setIndex(dotIndex)}
          />
        ))}
      </div>
    </section>
  )
}
