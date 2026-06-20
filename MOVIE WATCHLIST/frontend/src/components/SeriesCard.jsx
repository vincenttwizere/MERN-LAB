import { Link } from 'react-router-dom'

export default function SeriesCard({ series }) {
  return (
    <Link
      to={`/series/${series.id}/detail`}
      className="series-card group min-w-[220px] max-w-[220px] shadow-glow transition hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={series.posterUrl} alt={series.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4 text-sm text-white">
          <span className="rounded-full bg-black/70 px-3 py-1">{series.country.toUpperCase()}</span>
          <span className="rounded-full bg-black/70 px-3 py-1">{series.status}</span>
        </div>
      </div>
      <div className="space-y-3 p-4 min-h-[140px]">
        <h3 className="text-base font-semibold text-white overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{series.title}</h3>
        <p className="text-sm text-neutral-400">{series.genre.join(' | ')}</p>
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-300">
          <span>{series.seasons} Seasons</span>
          <span>⭐ {series.rating}</span>
        </div>
      </div>
    </Link>
  )
}
