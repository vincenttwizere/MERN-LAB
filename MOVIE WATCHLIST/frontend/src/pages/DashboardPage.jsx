import { useEffect, useMemo, useState } from 'react';
import { fetchWatchlist } from '../api/watchlistApi';
import { addToWatchlist, removeFromWatchlist, updateWatchlistItem } from '../api/watchlistApi';
import useAuthStore from '../store/useAuthStore';
import MovieCard from '../components/MovieCard';

const statusGroups = ['Planned', 'Watching', 'Completed', 'Dropped'];

const DashboardPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const loadWatchlist = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetchWatchlist();
        setWatchlist(res.data.data || []);
      } catch (err) {
        setError(err?.response?.data?.error || 'Unable to load watchlist');
      } finally {
        setLoading(false);
      }
    };

    loadWatchlist();
  }, []);

  const filteredItems = useMemo(() => {
    return watchlist.filter((item) => {
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesSearch = item.movie?.title?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [watchlist, statusFilter, search]);

  const grouped = useMemo(() => {
    return statusGroups.map((status) => ({
      status,
      items: filteredItems.filter((item) => item.status === status),
    }));
  }, [filteredItems]);

  return (
    <div className="page-shell">
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>{user?.username || 'Movie Fan'}'s Watchlist</h1>
          <p className="hero-copy">Track your next films, update progress, and keep ratings in one cinematic dashboard.</p>
        </div>
        <div className="dashboard-actions">
          <input
            type="search"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All statuses</option>
            {statusGroups.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="card skeleton-card" />
          ))}
        </div>
      ) : (
        grouped.map((group) => (
          <section key={group.status} className="status-group">
            <div className="group-header">
              <h2>{group.status}</h2>
              <span>{group.items.length} movies</span>
            </div>
            {group.items.length === 0 ? (
              <div className="empty-state">
                <p>No movies in {group.status.toLowerCase()} yet.</p>
              </div>
            ) : (
              <div className="movie-grid">
                {group.items.map((item) => (
                  <MovieCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>
        ))
      )}

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default DashboardPage;
