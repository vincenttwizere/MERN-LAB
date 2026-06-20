import { useMemo } from 'react'
import useAuthStore from '../store/authStore'
import { watchHistory } from '../data/demoData'

export default function Profile() {
  const user = useAuthStore((state) => state.user)

  const stats = useMemo(() => {
    return watchHistory.reduce(
      (acc, item) => {
        acc.total++
        acc[item.status] = (acc[item.status] || 0) + 1
        if (item.rating) {
          acc.sumRating += item.rating
          acc.countRating++
        }
        return acc
      },
      { total: 0, Planned: 0, Watching: 0, Completed: 0, Dropped: 0, sumRating: 0, countRating: 0 }
    )
  }, [])

  const avgRating = stats.countRating ? (stats.sumRating / stats.countRating).toFixed(1) : '—'

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-neutral-800 p-6 rounded">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="w-16 h-16 rounded-full bg-neutral-700 flex items-center justify-center text-xl text-white">{user?.username ? user.username.charAt(0).toUpperCase() : 'U'}</div>
          <div>
            <div className="text-xl font-semibold text-white">{user?.username || 'Movie Fan'}</div>
            <div className="text-sm text-neutral-400">{user?.email || 'No email provided'}</div>
            <div className="text-sm text-neutral-500">Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-sm text-neutral-400">Total saved</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-sm text-neutral-400">Average rating</div>
            <div className="text-2xl font-bold text-white">{avgRating}</div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-sm text-neutral-400">Watching</div>
            <div className="text-2xl font-bold text-white">{stats.Watching}</div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-sm text-neutral-400">Completed</div>
            <div className="text-2xl font-bold text-white">{stats.Completed}</div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-sm text-neutral-400">Planned</div>
            <div className="text-2xl font-bold text-white">{stats.Planned}</div>
          </div>
          <div className="bg-neutral-900 p-4 rounded">
            <div className="text-sm text-neutral-400">Dropped</div>
            <div className="text-2xl font-bold text-white">{stats.Dropped}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
