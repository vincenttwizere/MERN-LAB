import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../api/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      const res = await auth.login({ email, password })
      if (res.token){
        localStorage.setItem('token', res.token)
        navigate('/')
      } else {
        setError(res.message || 'Login failed')
      }
    }catch(err){ setError(err.message || String(err)) }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-neutral-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-red-500">CineWatch</h1>
          <p className="text-sm text-neutral-300 mt-2">Sign in to continue</p>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full px-3 py-2 rounded bg-neutral-700 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded bg-neutral-700 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button disabled={loading} type="submit" className="w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium">{loading ? 'Signing in...' : 'Login'}</button>

          <div className="text-center text-sm text-neutral-400">
            Don't have an account? <a href="/register" className="text-red-400 hover:underline">Register</a>
          </div>
        </form>
      </div>
    </div>
  )
}
