import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Landing from './pages/Landing'
import EnglishMovies from './pages/EnglishMovies'
import TranslatedMovies from './pages/TranslatedMovies'
import Series from './pages/Series'
import SeriesDetail from './pages/SeriesDetail'
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Watchlist from './pages/Watchlist'
import Downloads from './pages/Downloads'
import VideoPlayerPage from './pages/VideoPlayer'
import AdminDashboard from './pages/admin/AdminDashboard'
import MovieManagement from './pages/admin/MovieManagement'
import AddMovie from './pages/admin/AddMovie'
import EditMovie from './pages/admin/EditMovie'
import SeriesManagement from './pages/admin/SeriesManagement'
import TranslatorManagement from './pages/admin/TranslatorManagement'
import CountryManagement from './pages/admin/CountryManagement'
import UserManagement from './pages/admin/UserManagement'
import Analytics from './pages/admin/Analytics'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell min-h-screen">
        <NavBar />
        <main className="pt-24">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/movies/english" element={<EnglishMovies />} />
            <Route path="/translated/:translatorName" element={<TranslatedMovies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/series/:country" element={<Series />} />
            <Route path="/series/:id/detail" element={<SeriesDetail />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
            <Route path="/downloads" element={<ProtectedRoute><Downloads /></ProtectedRoute>} />
            <Route path="/watch/:movieId" element={<ProtectedRoute><VideoPlayerPage /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/movies" element={<AdminRoute><MovieManagement /></AdminRoute>} />
            <Route path="/admin/movies/add" element={<AdminRoute><AddMovie /></AdminRoute>} />
            <Route path="/admin/movies/edit/:id" element={<AdminRoute><EditMovie /></AdminRoute>} />
            <Route path="/admin/series" element={<AdminRoute><SeriesManagement /></AdminRoute>} />
            <Route path="/admin/translations" element={<AdminRoute><TranslatorManagement /></AdminRoute>} />
            <Route path="/admin/countries" element={<AdminRoute><CountryManagement /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
            <Route path="/admin/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  )
}
