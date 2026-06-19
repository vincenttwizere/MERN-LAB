import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { movies } from '../api/api'

export default function MovieDetail(){
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    let mounted = true
    ;(async()=>{
      try{
        const res = await movies.get(id)
        if (mounted) {
          setMovie(res)
          const wl = await fetchWatchlist()
          const found = Array.isArray(wl) ? wl.find(i => i.movieId === id || (i.movie && i.movie.id === id)) : null
          setWatchlistItem(found)
        }
      }catch(e){ console.error(e) }
    })()
    return ()=> mounted = false
  },[id])

  if (!movie) return <div className="p-6">Loading...</div>

  const onAddToWatchlist = async () => {
    try{
      const payload = { movieId: movie.id, status: statusState, rating: ratingState, notes: notes }
      const res = await import('../api/api').then(m=>m.watchlist.add(payload))
      if (res && res.watchlistItem) setWatchlistItem(res.watchlistItem)
    }catch(e){ console.error(e) }
  }

  const onUpdateWatchlist = async () => {
    if (!watchlistItem) return
    try{
      const res = await import('../api/api').then(m=>m.watchlist.update(watchlistItem.id, { status: statusState, rating: ratingState, notes }))
      if (res && res.watchlistItem) setWatchlistItem(res.watchlistItem)
    }catch(e){ console.error(e) }
  }

  const onRemove = async () => {
    if (!watchlistItem) return
    try{
      await import('../api/api').then(m=>m.watchlist.remove(watchlistItem.id))
      setWatchlistItem(null)
    }catch(e){ console.error(e) }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={()=>navigate(-1)} className="text-sm text-neutral-400 mb-4">← Back</button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <img src={movie.posterUrl} alt={movie.title} className="w-full rounded" />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
          <div className="text-sm text-neutral-400 mb-4">{movie.releaseYear} • {movie.runtime} min</div>
          <div className="mb-4">{movie.overview}</div>

          <div className="flex gap-3 items-center">
            <select value={statusState} onChange={e=>setStatusState(e.target.value)} className="bg-neutral-800 p-2 rounded">
              <option>Planned</option>
              <option>Watching</option>
              <option>Completed</option>
              <option>Dropped</option>
            </select>
            <input type="number" value={ratingState||''} onChange={e=>setRatingState(e.target.value?parseInt(e.target.value,10):null)} placeholder="Rating 1-10" className="w-28 p-2 bg-neutral-800 rounded" />
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Your notes" className="bg-neutral-800 p-2 rounded w-1/2" />
            {watchlistItem ? (
              <>
                <button onClick={onUpdateWatchlist} className="py-2 px-4 bg-red-600 rounded">Save</button>
                <button onClick={onRemove} className="py-2 px-4 border border-neutral-700 rounded">Remove</button>
              </>
            ) : (
              <button onClick={onAddToWatchlist} className="py-2 px-4 bg-red-600 rounded">Add to Watchlist</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

async function fetchWatchlist(){
  try{
    const m = await import('../api/api')
    const res = await m.watchlist.get()
    return res
  }catch(e){ return [] }
}
