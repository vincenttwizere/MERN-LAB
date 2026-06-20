import { useMemo } from 'react'
import { watchHistory } from '../data/demoData'
import MovieCard from '../components/MovieCard'

export default function Watchlist() {
  const items = useMemo(() => watchHistory, [])

  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">My Watchlist</h1>
        <p className="text-sm text-neutral-400">Keep track of your saved movies and continue right where you left off.</p>
      </div>
      <div className="grid justify-center gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {items.length ? (
          items.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#09090f] p-8 text-neutral-400">Your watchlist is empty. Add movies to get started.</div>
        )}
      </div>
    </div>
  )
}
