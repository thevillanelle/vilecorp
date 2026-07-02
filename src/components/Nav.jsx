import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle, { useTheme } from './ThemeToggle'

const links = [
  { to: '/content', label: 'CONTENT' },
  { to: '/ritualware', label: 'RITUALWARE' },
  { to: '/shop', label: 'SHOP' },
  { to: '/bio', label: 'BIO' },
  { to: '/links', label: 'LINKS' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { light, toggle } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-noir-border/60"
      style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-3xl text-crimson tracking-widest">VILECORP</Link>

        {/* Desktop nav — all items in one flex row, vertically centered */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) =>
                `font-mono text-xs tracking-[0.2em] transition-colors pb-1 border-b-2 ${isActive ? 'text-crimson border-crimson' : 'text-cream-muted border-transparent hover:text-cream-DEFAULT'}`}>
              {l.label}
            </NavLink>
          ))}
          <ThemeToggle light={light} toggle={toggle} />
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" style={{ color: '#E8E3DC' }} onClick={() => setOpen(!open)}>
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-transform origin-center ${open ? 'rotate-45 translate-y-2' : ''}`}/>
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-opacity ${open ? 'opacity-0' : ''}`}/>
          <div className={`w-6 h-0.5 bg-current transition-transform origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`}/>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="md:hidden overflow-hidden border-t border-noir-border">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="block px-6 py-4 font-mono text-xs tracking-[0.2em] text-cream-muted hover:text-crimson border-b border-noir-border">
                {l.label}
              </NavLink>
            ))}
            <div className="px-6 py-4">
              <ThemeToggle light={light} toggle={toggle} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
