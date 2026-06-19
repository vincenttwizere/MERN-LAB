import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { movies } from '../api/api'

export default function AddMovie(){
  const [form, setForm] = useState({ title:'', overview:'', releaseYear:'', genre:[], runtime:'', posterUrl:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      const payload = { ...form, releaseYear: parseInt(form.releaseYear,10), runtime: form.runtime ? parseInt(form.runtime,10) : undefined }
      const res = await movies.create(payload)
      if (res && res.id){
        navigate(`/movie/${res.id}`)
      } else {
        setError('Failed to create movie')
      }
    }catch(err){ setError(err.message || String(err)) }
    setLoading(false)
  }

  const updateField = (k,v) => setForm(prev=> ({...prev,[k]:v}))

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add a New Movie</h2>
      <form onSubmit={submit} className="space-y-4 bg-neutral-800 p-4 rounded">
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Title</label>
          <input required value={form.title} onChange={e=>updateField('title', e.target.value)} className="w-full px-3 py-2 rounded bg-neutral-700" />
        </div>
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Overview</label>
          <textarea value={form.overview} onChange={e=>updateField('overview', e.target.value)} className="w-full px-3 py-2 rounded bg-neutral-700" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Release Year</label>
            <input required value={form.releaseYear} onChange={e=>updateField('releaseYear', e.target.value)} type="number" className="w-full px-3 py-2 rounded bg-neutral-700" />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Runtime (minutes)</label>
            <input value={form.runtime} onChange={e=>updateField('runtime', e.target.value)} type="number" className="w-full px-3 py-2 rounded bg-neutral-700" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Genres (comma separated)</label>
          <input value={form.genre} onChange={e=>updateField('genre', e.target.value.split(',').map(s=>s.trim()))} className="w-full px-3 py-2 rounded bg-neutral-700" />
        </div>
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Poster URL</label>
          <input value={form.posterUrl} onChange={e=>updateField('posterUrl', e.target.value)} className="w-full px-3 py-2 rounded bg-neutral-700" />
        </div>

        {error && <div className="text-sm text-red-400">{error}</div>}
        <div className="flex gap-2">
          <button disabled={loading} className="py-2 px-4 bg-red-600 rounded">{loading? 'Adding...' : 'Add Movie'}</button>
          <button type="button" onClick={()=>navigate(-1)} className="py-2 px-4 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
