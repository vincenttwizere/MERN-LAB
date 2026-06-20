import { useMemo } from 'react'
import { watchHistory } from '../data/demoData'

export default function Downloads() {
  const downloads = useMemo(
    () => watchHistory.map((item) => ({ ...item, size: `${Math.floor(300 + Math.random() * 700)} MB` })),
    []
  )

  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Downloads</h1>
        <p className="text-sm text-neutral-400">Offline access for your favorite films and series.</p>
      </div>
      <div className="movie-grid">
        {downloads.map((item) => (
          <div key={item.id} className="rounded-[32px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <div className="flex items-center gap-4">
              <img src={item.posterUrl} alt={item.title} className="h-24 w-16 rounded-xl object-cover" />
              <div>
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="text-sm text-neutral-400">Progress {item.progress}%</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-neutral-400">
              <span>{item.size}</span>
              <span className="rounded-full bg-white/5 px-3 py-1">Ready</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
