import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 py-10 text-sm text-neutral-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-2xl font-semibold text-white">CineWatch</p>
            <p className="mt-3 max-w-sm text-neutral-400">Stream your favorite English and translated movies, keep a curated watchlist, and explore series from around the world.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-4">Company</p>
            <div className="space-y-3">
              <a href="#" className="block hover:text-white">About</a>
              <a href="#" className="block hover:text-white">Contact</a>
              <a href="#" className="block hover:text-white">Terms</a>
              <a href="#" className="block hover:text-white">Privacy</a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-white mb-4">Follow Us</p>
            <div className="flex items-center gap-3">
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 text-white grid place-items-center hover:bg-white/10"><FaFacebookF /></a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 text-white grid place-items-center hover:bg-white/10"><FaTwitter /></a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 text-white grid place-items-center hover:bg-white/10"><FaInstagram /></a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 text-white grid place-items-center hover:bg-white/10"><FaYoutube /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-neutral-500">© 2025 CineWatch. All rights reserved.</div>
      </div>
    </footer>
  )
}
