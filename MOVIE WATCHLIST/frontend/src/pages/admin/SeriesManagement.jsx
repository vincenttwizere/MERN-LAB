export default function SeriesManagement() {
  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Series Management</h1>
        <p className="text-sm text-neutral-400">Manage series collections, featured shows and series metadata.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-[28px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <div className="mb-4 h-40 rounded-3xl bg-white/5" />
            <h2 className="text-xl font-semibold text-white">Series {index + 1}</h2>
            <p className="mt-2 text-sm text-neutral-400">Manage seasons, episodes and release data.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
