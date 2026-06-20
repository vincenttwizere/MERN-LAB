import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { movies } from '../data/demoData'
import MovieCard from '../components/MovieCard'

export default function TranslatedMovies() {
  const { translatorName } = useParams()
  const filtered = useMemo(
    () => movies.filter((movie) => movie.language === 'Translated' && (!translatorName || movie.translatedBy === translatorName)),
    [translatorName]
  )

  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Translated Movies</h1>
        <p className="text-sm text-neutral-400">Showing movies translated by <span className="text-white">{translatorName || 'our top translators'}</span>.</p>
      </div>
      <div className="movie-grid">
        {filtered.length ? (
          filtered.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#09090f] p-8 text-neutral-400">No translated titles found for this translator.</div>
        )}
      </div>
    </div>
  )
}
