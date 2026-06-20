import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { movies } from '../data/demoData'

export default function VideoPlayerPage() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const movie = useMemo(() => movies.find((item) => item.id === movieId), [movieId])

  if (!movie) return <div className="p-6">Movie not found.</div>

  return (
    <div className="px-6 pb-20 lg:px-10">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-neutral-400 hover:text-white">← Back</button>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-[32px] overflow-hidden border border-white/10 bg-black shadow-glow">
          <video controls className="h-[520px] w-full bg-black object-cover">
            <source src="https://cdn.coverr.co/videos/coverr-film-night-6178/1080p.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <h1 className="text-3xl font-semibold text-white">{movie.title}</h1>
            <p className="text-sm text-neutral-400 mt-3">{movie.genre?.join(' • ')} • {movie.year} • {movie.runtime} min</p>
            <p className="mt-4 text-neutral-300">{movie.overview || 'Enjoy this exclusive preview of your favorite title.'}</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <h2 className="text-lg font-semibold text-white">Playback details</h2>
            <ul className="mt-4 space-y-3 text-neutral-400 text-sm">
              <li>Resolution: 1080p</li>
              <li>Language: {movie.language}</li>
              <li>Translator: {movie.translatedBy || 'Original'}</li>
              <li>Status: {movie.status}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
