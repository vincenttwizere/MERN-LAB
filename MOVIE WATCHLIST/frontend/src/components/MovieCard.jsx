import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  const label = movie.genre?.[0] || 'Movie'
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="movie-card group w-full max-w-full shadow-glow transition hover:-translate-y-1"
    >
      <div className="poster-wrapper">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="poster-overlay" />
        <div className="label-pill">{label}</div>
        <div className="play-center">
          <div className="play-button">
            <FaPlay />
          </div>
        </div>
        <div className="bottom-copy">
          <h3>{movie.title}</h3>
          <p>{movie.year || movie.releaseYear || 'Unknown year'}</p>
        </div>
      </div>
    </Link>
  )
}
