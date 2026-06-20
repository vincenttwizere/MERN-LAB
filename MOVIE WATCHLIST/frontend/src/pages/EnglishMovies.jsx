import { Link } from 'react-router-dom'
import { movies } from '../data/demoData'
import MovieCard from '../components/MovieCard'

export default function EnglishMovies() {
  const items = movies.filter((movie) => movie.language === 'English')

  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">English Movies</h1>
          <p className="text-sm text-neutral-400">Browse the latest English titles, curated for a cinematic streaming experience.</p>
        </div>
        <Link to="/search?language=English" className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">Browse All</Link>
      </div>
      <div className="grid justify-center gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {items.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
