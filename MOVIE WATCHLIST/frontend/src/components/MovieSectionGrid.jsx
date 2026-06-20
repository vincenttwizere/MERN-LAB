import { Link } from 'react-router-dom'
import MovieCard from './MovieCard'

export default function MovieSectionGrid({ title, items = [], seeAllLink, limit = 6 }) {
  const display = items.slice(0, limit)

  if (!display.length) return null

  return (
    <section>
      <div className="landing-section-header">
        <h2>{title}</h2>
        {seeAllLink && (
          <Link to={seeAllLink}>See all</Link>
        )}
      </div>
      <div className="landing-grid">
        {display.map((it) => (
          <MovieCard key={it.id} movie={it} />
        ))}
      </div>
    </section>
  )
}
