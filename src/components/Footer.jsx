import { Link } from 'react-router-dom'
import { Mail, Globe, Link2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', padding: '56px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13, color: '#fff', borderRadius: 4 }}>E</div>
              <span style={{ fontWeight: 700, fontSize: 15 }}>E-SUMMIT 2026</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              The flagship entrepreneurship summit of E-Cell IIST Indore — building the founders of tomorrow.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[Globe, Link2, Mail].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, border: '1px solid var(--border2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--muted)'; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: 'Summit', links: ['Events', 'Speakers', 'Schedule', 'Sponsors'] },
            { title: 'Participate', links: ['Register', 'Dashboard', 'Competitions', 'Workshops'] },
            { title: 'About', links: ['E-Cell IIST', 'Contact', 'Press Kit', 'FAQ'] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 16 }}>{col.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <Link key={l} to="/" style={{ fontSize: 14, color: 'var(--muted)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>{l}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>© 2026 E-Cell IIST Indore. All rights reserved.</p>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>Indore Institute of Science & Technology</p>
        </div>
      </div>
    </footer>
  )
}
