import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-white">Admin Dashboard</h1>
        <p className="text-sm text-neutral-400">Manage movies, series, translators, countries, users and analytics from one admin console.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { label: 'Movies', path: '/admin/movies' },
          { label: 'Series', path: '/admin/series' },
          { label: 'Translators', path: '/admin/translations' },
          { label: 'Countries', path: '/admin/countries' },
          { label: 'Users', path: '/admin/users' },
          { label: 'Analytics', path: '/admin/analytics' },
        ].map((card) => (
          <Link key={card.path} to={card.path} className="rounded-[28px] border border-white/10 bg-[#09090f] p-8 text-white transition hover:-translate-y-1 hover:border-brand/40">
            <p className="text-xl font-semibold">{card.label}</p>
            <p className="mt-3 text-sm text-neutral-400">View and update {card.label.toLowerCase()} settings.</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
