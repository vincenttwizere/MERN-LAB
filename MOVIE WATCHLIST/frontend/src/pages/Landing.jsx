import HeroSection from '../components/HeroSection'
import MovieSectionGrid from '../components/MovieSectionGrid'
import { movies, seriesList } from '../data/demoData'

const sections = [
  {
    title: 'Trending Now',
    items: movies.filter((m) => m.status === 'Trending'),
    seeAllLink: '/search?type=movie',
  },
  {
    title: 'New Releases',
    items: movies.filter((m) => m.status === 'New'),
    seeAllLink: '/movies/english',
  },
  {
    title: 'Top Rated',
    items: movies.filter((m) => m.rating >= 8.5),
    seeAllLink: '/movies/english',
  },
  {
    title: 'English Movies',
    items: movies.filter((m) => m.language === 'English'),
    seeAllLink: '/movies/english',
  },
  {
    title: 'Translated Movies',
    items: movies.filter((m) => m.language === 'Translated'),
    seeAllLink: '/translated/Rocky',
  },
  {
    title: 'Featured Series',
    items: seriesList,
    seeAllLink: '/series',
  },
  {
    title: 'Action Movies',
    items: movies.filter((m) => m.genre.includes('Action')),
    seeAllLink: '/search?genre=Action',
  },
  {
    title: 'Comedy Movies',
    items: movies.filter((m) => m.genre.includes('Comedy')),
    seeAllLink: '/search?genre=Comedy',
  },
  {
    title: 'Horror Movies',
    items: movies.filter((m) => m.genre.includes('Horror')),
    seeAllLink: '/search?genre=Horror',
  },
  {
    title: 'Sci-Fi Movies',
    items: movies.filter((m) => m.genre.includes('Sci-Fi')),
    seeAllLink: '/search?genre=Sci-Fi',
  },
]

export default function Landing() {
  return (
    <div className="landing-page">
      <HeroSection />
      <div className="landing-sections">
        {sections.map((section) => (
          <MovieSectionGrid
            key={section.title}
            title={section.title}
            items={section.items}
            seeAllLink={section.seeAllLink}
          />
        ))}
      </div>
    </div>
  )
}
