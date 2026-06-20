import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { seriesList } from '../data/demoData'

export default function SeriesDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const series = useMemo(() => seriesList.find((item) => item.id === id), [id])
  if (!series) return <div className="p-6">Series not found.</div>

  return (
    <div className="px-6 pb-20 lg:px-10">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-neutral-400 hover:text-white">← Back to series</button>
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <div className="rounded-[32px] overflow-hidden border border-white/10 bg-[#09090f] shadow-glow">
          <img src={series.posterUrl} alt={series.title} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-white">{series.title}</h1>
            <div className="flex flex-wrap gap-3 text-sm text-neutral-400">
              <span>{series.country.toUpperCase()}</span>
              <span>{series.seasons} Seasons</span>
              <span>⭐ {series.rating}</span>
              <span>{series.status}</span>
            </div>
            <p className="text-neutral-400">A premium streaming series handpicked for our CineWatch audience.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#0c0c11] p-5">
              <p className="text-sm text-neutral-400">Genre</p>
              <p className="mt-3 text-white">{series.genre.join(' • ')}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#0c0c11] p-5">
              <p className="text-sm text-neutral-400">Status</p>
              <p className="mt-3 text-white">{series.status}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('/login')} className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600">Watch Trailer</button>
            <button onClick={() => navigate('/login')} className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10">Add to Watchlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}
