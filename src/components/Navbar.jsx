import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/speakers', label: 'Speakers' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/features', label: 'Features' },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(8,10,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, background: 'var(--gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13, color: '#fff', borderRadius: 4
          }}>E</div>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
            <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em' }}>E-SUMMIT IIST</span>
            <span style={{ color: 'var(--accent2)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', marginTop: 3 }}>UDAAN</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-links">
          {links.map(l => {
            const active = pathname === l.to

            return (
              <Link key={l.to} to={l.to} onClick={closeMenu} style={{
                position: 'relative',
                fontSize: 14, fontWeight: 500,
                color: active ? 'var(--text)' : 'var(--muted)',
                transition: 'color 0.2s',
                paddingBottom: 8,
              }}>
                {l.label}
                {active && <span style={{ position: 'absolute', left: '50%', bottom: 0, width: 4, height: 4, borderRadius: '50%', background: 'var(--accent2)', transform: 'translateX(-50%)' }} />}
              </Link>
            )
          })}
        </div>

        <Link to="/register" onClick={closeMenu} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: 13 }}>
          Register Now
        </Link>

        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)' }} className="hamburger">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={closeMenu} style={{ fontSize: 15, color: pathname === l.to ? 'var(--accent2)' : 'var(--text)' }}>{l.label}</Link>
          ))}
          <Link to="/register" onClick={closeMenu} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14, textAlign: 'center', justifyContent: 'center' }}>Register Now</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          nav > .container > a.btn { display: none; }
        }
      `}</style>
    </nav>
  )
}
