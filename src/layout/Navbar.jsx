import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import { useData } from '../utils/useData.js'

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-white/10' : 'hover:bg-white/5'} `

export default function Navbar() {
  const { user, loginAs, logout } = useAuth()
  const { data: site } = useData('site')
  const brand = site.brand || {}
  const logos = Array.isArray(brand.logos) ? brand.logos.slice(0,3) : []
  const logoHeight = brand.logoHeight ?? 28

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/60 border-b border-white/10">
      <div className="container-wide flex items-center justify-between h-16">
  <Link to="/" aria-label="Go to homepage" className="flex items-center gap-3">
          {logos.length ? (
            <div className="flex items-center gap-3">
              {logos.map((l, i) => (
                <img key={i} src={l.src} alt={l.alt || 'logo'} style={{ height: logoHeight, width: 'auto' }} className="block cursor-pointer select-none" />
              ))}
            </div>
          ) : (
            <>
              <div className="w-9 h-9 bg-primary rounded-sm grid place-content-center font-display text-xl">A</div>
              <div>
                <div className="font-display text-xl leading-4">ADV Juansiksty</div>
                <div className="text-xs text-white/60 leading-4">Nation RT</div>
              </div>
            </>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/news" className={navLinkClass}>News & Events</NavLink>
          <NavLink to="/partners" className={navLinkClass}>Partners</NavLink>
          <NavLink to="/core-groups" className={navLinkClass}>Core Groups</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>Member</NavLink>
              <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
              {user.role === 'admin' && (
                <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {!user ? (
            <Link to="/login" className="btn btn-primary">Login</Link>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70 hidden sm:block">{user.name} ({user.role})</span>
              <button onClick={logout} className="btn btn-outline text-white">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
