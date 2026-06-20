import HeroSection from '../components/HeroSection'
import MovieRow from '../components/MovieRow'
import { featuredMovies, movies, seriesList } from '../data/demoData'

export default function Landing() {
  return (
    <div className="space-y-12 px-6 pb-20 lg:px-10">
      <HeroSection />
      <div className="space-y-10">
        <MovieRow title="🔥 Trending Now" items={movies.filter((m) => m.status === 'Trending')} seeAllLink="/search?type=movie" />
        <MovieRow title="🆕 New Releases" items={movies.filter((m) => m.status === 'New')} seeAllLink="/movies/english" />
        <MovieRow title="⭐ Top Rated" items={movies.filter((m) => m.rating >= 8.5)} seeAllLink="/movies/english" />
        <MovieRow title="🎬 English Movies" items={movies.filter((m) => m.language === 'English')} seeAllLink="/movies/english" />
        <MovieRow title="🌍 Translated Movies" items={movies.filter((m) => m.language === 'Translated')} seeAllLink="/translated/Rocky" />
        <MovieRow title="📺 Featured Series" items={seriesList} seeAllLink="/series" />
        <MovieRow title="🎭 Action Movies" items={movies.filter((m) => m.genre.includes('Action'))} seeAllLink="/search?genre=Action" />
        <MovieRow title="😂 Comedy Movies" items={movies.filter((m) => m.genre.includes('Comedy'))} seeAllLink="/search?genre=Comedy" />
        <MovieRow title="😱 Horror Movies" items={movies.filter((m) => m.genre.includes('Horror'))} seeAllLink="/search?genre=Horror" />
        <MovieRow title="🚀 Sci-Fi Movies" items={movies.filter((m) => m.genre.includes('Sci-Fi'))} seeAllLink="/search?genre=Sci-Fi" />
      </div>
    </div>
  )
}
