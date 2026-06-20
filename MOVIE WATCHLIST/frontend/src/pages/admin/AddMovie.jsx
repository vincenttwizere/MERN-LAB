import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddMovie() {
  const [form, setForm] = useState({ title: '', year: '', genre: '', posterUrl: '' })
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setSaving(false)
    navigate('/admin/movies')
  }

  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Add New Movie</h1>
        <p className="text-sm text-neutral-400">Create a new movie entry for the CineWatch catalog.</p>
      </div>
      <form onSubmit={submit} className="grid gap-6 rounded-[32px] border border-white/10 bg-[#09090f] p-8 shadow-glow">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-neutral-300">
            Title
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-2 w-full rounded-3xl bg-black/60 border border-white/10 px-4 py-3 text-white" />
          </label>
          <label className="block text-sm text-neutral-300">
            Year
            <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required type="number" className="mt-2 w-full rounded-3xl bg-black/60 border border-white/10 px-4 py-3 text-white" />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-neutral-300">
            Genre
            <input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} required className="mt-2 w-full rounded-3xl bg-black/60 border border-white/10 px-4 py-3 text-white" />
          </label>
          <label className="block text-sm text-neutral-300">
            Poster URL
            <input value={form.posterUrl} onChange={(e) => setForm({ ...form, posterUrl: e.target.value })} className="mt-2 w-full rounded-3xl bg-black/60 border border-white/10 px-4 py-3 text-white" />
          </label>
        </div>

        <button disabled={saving} className="w-full rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white transition hover:bg-red-600">{saving ? 'Saving...' : 'Publish Movie'}</button>
      </form>
    </div>
  )
}
