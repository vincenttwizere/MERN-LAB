import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuthStore from '../store/authStore'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!form.email || !form.password) {
      setError('Email and password are required.')
      setLoading(false)
      return
    }

    if (mode === 'register' && !form.username.trim()) {
      setError('Please choose a username.')
      setLoading(false)
      return
    }

    try {
      const user = {
        id: form.email,
        username: mode === 'register' ? form.username.trim() : form.email.split('@')[0] || 'User',
        email: form.email,
        role: form.email.includes('admin') ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
      }
      setAuth('demo-token', user)
      toast.success(mode === 'register' ? 'Account created successfully' : 'Logged in successfully')
      navigate('/')
    } catch (err) {
      setError(err?.message || 'Authentication failed')
      toast.error('Authentication failed')
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-neutral-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-red-500">CineWatch</h1>
          <p className="text-sm text-neutral-300 mt-2">
            {mode === 'login' ? 'Sign in to continue' : 'Create your new account'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          {mode === 'register' && (
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Username</label>
              <input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                type="text"
                placeholder="Choose a username"
                className="w-full px-3 py-2 rounded bg-neutral-700 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded bg-neutral-700 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Password</label>
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded bg-neutral-700 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button disabled={loading} type="submit" className="w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium">
            {loading ? (mode === 'register' ? 'Creating account...' : 'Signing in...') : (mode === 'register' ? 'Create account' : 'Login')}
          </button>

          <div className="text-center text-sm text-neutral-400">
            {mode === 'login' ? (
              <>New here? <button type="button" onClick={() => setMode('register')} className="text-red-400 hover:underline">Create account</button></>
            ) : (
              <>Already have an account? <button type="button" onClick={() => setMode('login')} className="text-red-400 hover:underline">Login</button></>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
