import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { movies } from '../api/api'

export default function Dashboard(){
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    ;(async()=>{
      try{
        const res = await movies.list()
        // API returns array of movies
        if (mounted) setList(Array.isArray(res) ? res : (res || []))
      }catch(e){ console.error(e) }
      if (mounted) setLoading(false)
    })()
    return ()=> mounted = false
  },[])

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">CineWatch</h2>
        <div className="flex items-center gap-4">
          <input placeholder="Search movies" className="w-72 px-3 py-2 rounded bg-neutral-800" />
          <a href="/add-movie" className="py-2 px-3 bg-red-600 rounded text-sm">Add Movie</a>
        </div>
      </header>

      {loading ? <div>Loading...</div> : (
        list.length === 0 ? (
          <div className="text-center text-neutral-400 mt-16">
            <div className="text-2xl mb-4">Your watchlist is empty</div>
            <a href="/add-movie" className="py-2 px-4 bg-red-600 rounded">Add your first movie</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {list.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        )
      )}
    </div>
  )
}
