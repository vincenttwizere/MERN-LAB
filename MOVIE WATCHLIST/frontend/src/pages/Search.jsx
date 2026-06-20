import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { movies, seriesList } from '../data/demoData'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function Search() {
  const query = useQuery()
  const term = query.get('q') || ''
  const language = query.get('language')
  const genre = query.get('genre')

  const results = useMemo(() => {
    const matcher = term.toLowerCase()
    return [...movies, ...seriesList].filter((item) => {
      const matchesTerm = !matcher || item.title.toLowerCase().includes(matcher)
      const matchesLanguage = !language || item.language === language
      const matchesGenre = !genre || item.genre?.some((g) => g.toLowerCase() === genre.toLowerCase())
      return matchesTerm && matchesLanguage && matchesGenre
    })
  }, [term, language, genre])

  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Search results</h1>
        <p className="text-sm text-neutral-400">Showing {results.length} matches for “{term || 'all'}”.</p>
      </div>

      <div className="grid justify-center gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {results.length ? (
          results.map((item) => (
            <Link key={item.id} to={item.type === 'series' ? `/series/${item.id}/detail` : `/movies/${item.id}`} className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b11] p-4 transition hover:-translate-y-1 hover:border-brand/40">
              <img src={item.posterUrl} alt={item.title} className="h-56 w-full rounded-3xl object-cover" />
              <div className="mt-4 space-y-2">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="text-sm text-neutral-400">{item.genre?.slice(0, 3).join(' | ')}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#09090f] p-8 text-neutral-400">No results match your search. Try a different keyword.</div>
        )}
      </div>
    </div>
  )
}
