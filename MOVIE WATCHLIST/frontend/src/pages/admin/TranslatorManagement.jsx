export default function TranslatorManagement() {
  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Translator Management</h1>
        <p className="text-sm text-neutral-400">Manage translators, language support and translation credits.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {['Rocky', 'Junior', 'Savimbi', 'Pick', 'Younger', 'Sankara'].map((name) => (
          <div key={name} className="rounded-[28px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white">{name}</h2>
            <p className="mt-3 text-sm text-neutral-400">Manage translator profile and movie assignments.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
