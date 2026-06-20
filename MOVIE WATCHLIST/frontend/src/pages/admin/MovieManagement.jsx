import { Link } from 'react-router-dom'

export default function MovieManagement() {
  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Movie Management</h1>
          <p className="text-sm text-neutral-400">Add, edit and remove titles from the CineWatch movie library.</p>
        </div>
        <Link to="/admin/movies/add" className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600">Add New Movie</Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-[28px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <div className="mb-4 h-40 rounded-3xl bg-white/5" />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Movie title {index + 1}</h2>
              <p className="text-sm text-neutral-400">Action · Drama · 2025</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">Edit</button>
                <button className="rounded-full border border-red-600 text-red-400 px-4 py-2 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
