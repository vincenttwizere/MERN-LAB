import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="movie-card group min-w-[220px] max-w-[220px] shadow-glow transition hover:-translate-y-1"
    >
      <div className="relative h-72 overflow-hidden">
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs text-white">{movie.status || 'Movie'}</div>
      </div>
      <div className="movie-meta p-4 flex min-h-[140px] flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-white overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{movie.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {movie.genre?.slice(0, 3).map((genre) => (
              <span key={genre} className="genre-tag">{genre}</span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          {movie.rating ? <span className="rating-pill">{movie.rating}</span> : <span className="text-xs text-neutral-500">No rating</span>}
          <span className="text-xs text-neutral-400">{movie.year || movie.releaseYear || ''}</span>
        </div>
      </div>
    </Link>
  )
}
