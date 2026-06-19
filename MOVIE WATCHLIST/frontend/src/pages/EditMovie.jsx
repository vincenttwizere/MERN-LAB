import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { movies } from '../api/api'

export default function EditMovie(){
  const { id } = useParams()
  const [form, setForm] = useState({ title:'', overview:'', releaseYear:'', genre:[], runtime:'', posterUrl:'' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    let mounted = true
    ;(async()=>{
      try{
        const res = await movies.get(id)
        if (mounted && res){
          setForm({
            title: res.title || '',
            overview: res.overview || '',
            releaseYear: res.releaseYear || '',
            genre: Array.isArray(res.genre) ? res.genre : (res.genre || []),
            runtime: res.runtime || '',
            posterUrl: res.posterUrl || ''
          })
        }
      }catch(e){ console.error(e) }
      if (mounted) setLoading(false)
    })()
    return ()=> mounted = false
  },[id])

  const submit = async (e) =>{
    e.preventDefault()
    setSaving(true)
    try{
      const payload = { ...form, releaseYear: parseInt(form.releaseYear,10), runtime: form.runtime ? parseInt(form.runtime,10) : undefined }
      const res = await movies.update(id, payload)
      if (res && res.id){
        navigate(`/movie/${id}`)
      }
    }catch(e){ console.error(e) }
    setSaving(false)
  }

  const updateField = (k,v) => setForm(prev=> ({...prev,[k]:v}))

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Movie</h2>
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

        <div className="flex gap-2">
          <button disabled={saving} className="py-2 px-4 bg-red-600 rounded">{saving? 'Saving...' : 'Save Changes'}</button>
          <button type="button" onClick={()=>navigate(-1)} className="py-2 px-4 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
