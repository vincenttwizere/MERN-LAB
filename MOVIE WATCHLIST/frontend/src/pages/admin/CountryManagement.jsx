export default function CountryManagement() {
  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Country Management</h1>
        <p className="text-sm text-neutral-400">Configure available countries and streaming regions.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {['Rwanda', 'Korea', 'India', 'Nigeria'].map((country) => (
          <div key={country} className="rounded-[28px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white">{country}</h2>
            <p className="mt-3 text-sm text-neutral-400">Manage regional series availability and titles.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
