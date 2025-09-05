import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-black/60">
      <div className="container-wide py-8 grid sm:grid-cols-3 gap-6 text-sm text-white/70">
        <div>
          <div className="font-display text-xl mb-2">ADV Juansiksty Nation RT</div>
          <p className="text-white/60">Philippine motorcycle riding team. Ride safe. One nation, one passion.</p>
        </div>
        <nav className="grid grid-cols-2 gap-2">
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/news" className="hover:text-white">News</Link>
          <Link to="/partners" className="hover:text-white">Partners</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </nav>
        <div className="space-y-2">
          <div className="text-white/80">Follow</div>
          <div className="flex gap-3">
            <a href="#" target="_blank" className="hover:text-white">Facebook</a>
            <a href="#" target="_blank" className="hover:text-white">Instagram</a>
            <a href="#" target="_blank" className="hover:text-white">YouTube</a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-white/50 py-4">© {new Date().getFullYear()} ADV Juansiksty Nation RT. All rights reserved.</div>
    </footer>
  )
}
