import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function NavBar(){
  const { user, logout } = useAuth()

  return (
    <nav className="bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-red-500 font-bold">CineWatch</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/add-movie" className="text-sm text-neutral-300 hover:text-white">Add Movie</Link>
          <Link to="/profile" className="text-sm text-neutral-300 hover:text-white">Profile</Link>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-sm text-white">{user.username ? user.username.charAt(0).toUpperCase() : 'U'}</div>
              <button onClick={logout} className="text-sm text-red-400">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="text-sm text-red-400">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
