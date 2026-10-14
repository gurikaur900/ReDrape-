import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1440px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-gutter">
        {/* Logo */}
        <div className="flex items-center gap-space-sm">
          <Link to="/" className="font-headline-sm text-headline-sm text-primary tracking-tight font-medium">
            ReDrape
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-space-sm">
          <NavLink to="/" label="Home" />
          <NavLink to="/explore" label="Explore" />
          <NavLink to="/find-my-look" label="Find My Look Quiz" />
          <NavLink to="/list-outfit" label="List an Outfit" />
          <NavLink to="/rent-vs-buy" label="Rent vs Buy" />
          <NavLink to="/trust-safety" label="Trust & Safety" />
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs">
            <button
              aria-label="Search"
              className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
            </Link>
            <button aria-label="Notifications" className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-space-sm">
              <Link
                to="/profile"
                className="flex items-center ring-2 ring-primary/10 rounded-full transition-transform hover:scale-105"
              >
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary-container transition-colors">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider hover:text-primary transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-space-sm">
              <Link to="/login" className="px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all shadow-sm">
                Join
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="xl:hidden p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined text-[22px]">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-outline-variant/30 bg-surface px-margin-mobile md:px-margin py-3">
          <input
            autoFocus
            type="text"
            placeholder="Search occasion, designer, or style..."
            className="w-full max-w-2xl px-4 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
      )}

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="xl:hidden bg-surface border-t border-outline-variant/30 px-margin-mobile py-space-md space-y-space-sm">
          {[
            { to: '/', label: 'Home' },
            { to: '/explore', label: 'Explore' },
            { to: '/find-my-look', label: 'Find My Look Quiz' },
            { to: '/list-outfit', label: 'List an Outfit' },
            { to: '/rent-vs-buy', label: 'Rent vs Buy' },
            { to: '/trust-safety', label: 'Trust & Safety' },
            { to: '/wishlist', label: 'Wishlist' },
            user ? { to: '/profile', label: 'My Profile' } : { to: '/login', label: 'Login' },
            user ? { to: '/my-wardrobe', label: 'My Wardrobe' } : { to: '/register', label: 'Join ReDrape' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors hover:bg-surface-container-high rounded-lg"
    >
      {label}
    </Link>
  )
}
