import { useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import MovieCard from './MovieCard'

export default function MovieRow({ title, items, seeAllLink }) {
  const scroller = useRef(null)

  const scroll = (direction) => {
    if (!scroller.current) return
    scroller.current.scrollBy({ left: direction === 'left' ? -520 : 520, behavior: 'smooth' })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-3 text-sm text-neutral-300">
          {seeAllLink && <a href={seeAllLink} className="hover:text-white">See All</a>}
          <button onClick={() => scroll('left')} className="rounded-full bg-white/5 p-2 text-neutral-300 transition hover:bg-white/10"><FaChevronLeft /></button>
          <button onClick={() => scroll('right')} className="rounded-full bg-white/5 p-2 text-neutral-300 transition hover:bg-white/10"><FaChevronRight /></button>
        </div>
      </div>
      <div ref={scroller} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </section>
  )
}
