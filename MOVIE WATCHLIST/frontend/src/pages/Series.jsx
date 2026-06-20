import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { seriesList, countries } from '../data/demoData'
import SeriesCard from '../components/SeriesCard'

export default function Series() {
  const { country } = useParams()
  const selectedCountry = country ? countries.find((item) => item.id === country) : null

  const series = useMemo(() => {
    if (!country) return seriesList
    return seriesList.filter((item) => item.country === country)
  }, [country])

  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Global Series</h1>
          <p className="text-sm text-neutral-400">Explore series from {selectedCountry?.label || 'around the world'}.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {countries.map((item) => (
            <span key={item.id} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">{item.flag} {item.label}</span>
          ))}
        </div>
      </div>

      <div className="grid justify-center gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {series.map((entry) => (
          <SeriesCard key={entry.id} series={entry} />
        ))}
      </div>
    </div>
  )
}
