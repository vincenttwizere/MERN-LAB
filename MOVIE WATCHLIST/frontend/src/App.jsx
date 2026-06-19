import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MovieDetail from './pages/MovieDetail'
import AddMovie from './pages/AddMovie'
import Profile from './pages/Profile'
import EditMovie from './pages/EditMovie'
import NavBar from './components/NavBar'
import { AuthProvider } from './contexts/AuthContext'

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <div className="min-h-screen bg-neutral-900 text-white">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/movie/:id" element={<MovieDetail/>} />
            <Route path="/add-movie" element={<AddMovie/>} />
            <Route path="/edit-movie/:id" element={<EditMovie/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
