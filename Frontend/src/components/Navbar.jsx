import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Boxes, LogIn, LayoutDashboard, BarChart3, ScrollText, Menu, X } from 'lucide-react'

/* ────────────────────────────────────────────────────────────────────────
   AssetFlow — Navbar (single-file, drop-in)

   Self-contained top navigation bar. Requires `react-router-dom` (uses
   `NavLink`) and a <BrowserRouter> somewhere above it in the tree.
   Styled to the dark, outlined enterprise look — dark background, subtle
   borders, minimal fills, no gradients. Placeholder-only: no auth logic,
   no API calls.

   Drop this in as src/components/Navbar.jsx.
   ──────────────────────────────────────────────────────────────────────── */

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Report Analysis', path: '/analysis', icon: BarChart3 },
  { label: 'Audit', path: '/audit', icon: ScrollText },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gray-950 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Boxes className="h-4.5 w-4.5 text-gray-100" strokeWidth={2.25} />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-gray-100">AssetFlow</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-gray-100' : 'text-gray-400 hover:text-gray-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-lg bg-white/5 border border-white/10"
                        transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
                      />
                    )}
                    <item.icon className="h-4 w-4 relative z-10" strokeWidth={2} />
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-100 hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, i) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-gray-100 bg-white/5 border border-white/10'
                        : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-2.5"
                    >
                      <item.icon className="h-4 w-4" strokeWidth={2} />
                      {item.label}
                    </motion.span>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
