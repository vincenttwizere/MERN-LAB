import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { movies } from '../api/api'

export default function MovieCard({ movie }){
  const { user } = useAuth()
  const navigate = useNavigate()

  const onDelete = async (e) =>{
    e.preventDefault(); e.stopPropagation();
    if (!confirm('Delete this movie?')) return
    try{
      await movies.remove(movie.id)
      window.location.reload()
    }catch(e){ console.error(e) }
  }

  return (
    <Link to={`/movie/${movie.id}`} className="block bg-neutral-800 rounded overflow-hidden shadow hover:scale-[1.01] transition-transform duration-150">
      <div className="h-56 bg-neutral-700 flex items-center justify-center text-neutral-400">{movie.posterUrl ? <img src={movie.posterUrl} alt={movie.title} className="object-cover w-full h-full"/> : 'No Poster'}</div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{movie.title}</h3>
          <span className="text-sm text-neutral-400">{movie.releaseYear}</span>
        </div>
        <div className="text-xs text-neutral-400 mt-2">{(movie.genre && Array.isArray(movie.genre) ? movie.genre.join(', ') : '')}</div>
        {user && movie.creator && user.id === movie.creator.id && (
          <div className="mt-3 flex gap-2">
            <button onClick={(e)=>{e.preventDefault(); e.stopPropagation(); navigate(`/edit-movie/${movie.id}`)}} className="text-sm px-2 py-1 bg-neutral-700 rounded">Edit</button>
            <button onClick={onDelete} className="text-sm px-2 py-1 bg-red-600 rounded">Delete</button>
          </div>
        )}
      </div>
    </Link>
  )
}
