import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
  { label: 'Action', value: 1320 },
  { label: 'Drama', value: 980 },
  { label: 'Horror', value: 720 },
  { label: 'Sci-Fi', value: 540 },
  { label: 'Translated', value: 610 },
]

export default function Analytics() {
  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Analytics</h1>
        <p className="text-sm text-neutral-400">Review viewing trends and movie popularity across the platform.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-white/10 bg-[#09090f] p-8 shadow-glow">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-neutral-400">Monthly viewers</p>
              <p className="mt-2 text-4xl font-semibold text-white">72.4K</p>
            </div>
            <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-300">+12.4%</div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#2d2d35" strokeDasharray="3 3" />
              <XAxis dataKey="label" stroke="#8b8b9a" tick={{ fontSize: 12 }} />
              <YAxis stroke="#8b8b9a" />
              <Tooltip contentStyle={{ backgroundColor: '#09090f', border: '1px solid #2b2b34', borderRadius: 16 }} />
              <Bar dataKey="value" fill="#ff2d57" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-5">
          <div className="rounded-[32px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <p className="text-sm text-neutral-400">Active Users</p>
            <p className="mt-3 text-3xl font-semibold text-white">5.6K</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <p className="text-sm text-neutral-400">Watchlist Adds</p>
            <p className="mt-3 text-3xl font-semibold text-white">1.8K</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <p className="text-sm text-neutral-400">Downloads</p>
            <p className="mt-3 text-3xl font-semibold text-white">4.2K</p>
          </div>
        </div>
      </div>
    </div>
  )
}
