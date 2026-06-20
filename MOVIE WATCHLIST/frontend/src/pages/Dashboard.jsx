import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import Footer from '../components/Footer'
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
    <div className="page-shell">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Movie Watchlist</p>
          <h1>Latest films on your list</h1>
          <p className="hero-copy">Explore your current collection, update status, and return to the stories you love.</p>
        </div>
        <div className="dashboard-actions">
          <input placeholder="Search movies" className="search-input" />
          <a href="/add-movie" className="btn-primary">Add Movie</a>
        </div>
      </header>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="skeleton-card" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No movies in your watchlist yet.</div>
          <a href="/add-movie" className="btn-primary">Add your first movie</a>
        </div>
      ) : (
        <div className="movie-grid">
          {list.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}

      <Footer />
    </div>
  )
}
