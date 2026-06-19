import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../api/api'

export default function Register(){
  const [form, setForm] = useState({ username:'', email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      const res = await auth.register(form)
      if (res.token){
        localStorage.setItem('token', res.token)
        navigate('/')
      } else {
        setError(res.message || 'Registration failed')
      }
    }catch(err){ setError(err.message || String(err)) }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-neutral-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-red-500">Create account</h1>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Username</label>
            <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} className="w-full px-3 py-2 rounded bg-neutral-700 border border-neutral-600" />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Email</label>
            <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} type="email" className="w-full px-3 py-2 rounded bg-neutral-700 border border-neutral-600" />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Password</label>
            <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} type="password" className="w-full px-3 py-2 rounded bg-neutral-700 border border-neutral-600" />
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button disabled={loading} type="submit" className="w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium">{loading? 'Creating...' : 'Create Account'}</button>

          <div className="text-center text-sm text-neutral-400">
            Already have an account? <a href="/login" className="text-red-400 hover:underline">Login</a>
          </div>
        </form>
      </div>
    </div>
  )
}
