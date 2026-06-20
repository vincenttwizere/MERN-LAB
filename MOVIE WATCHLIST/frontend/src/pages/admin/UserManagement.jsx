export default function UserManagement() {
  return (
    <div className="px-6 pb-20 lg:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">User Management</h1>
        <p className="text-sm text-neutral-400">Monitor user accounts, roles, and watchlist activity.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { name: 'cinefan', role: 'user' },
          { name: 'admin', role: 'admin' },
          { name: 'moviebuff', role: 'user' },
        ].map((user) => (
          <div key={user.name} className="rounded-[28px] border border-white/10 bg-[#09090f] p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white">{user.name}</h2>
            <p className="mt-3 text-sm text-neutral-400">Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
