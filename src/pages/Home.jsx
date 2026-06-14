import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Users, Trophy, Mic, Globe, TrendingUp } from 'lucide-react'

function useCountdown(target) {
  const [time, setTime] = useState({})
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date()
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}

const stats = [
  { value: '5000+', label: 'Registrations' },
  { value: '40+', label: 'Speakers' },
  { value: '₹10L+', label: 'Prize Pool' },
  { value: '3', label: 'Days' },
]

const highlights = [
  { icon: Trophy, title: 'Startup Pitch', desc: 'Present your idea to top investors and win up to ₹5L in funding.' },
  { icon: Zap, title: 'Hackathon', desc: '36-hour build sprint to solve real-world problems with tech.' },
  { icon: Mic, title: 'Founder Keynotes', desc: 'Hear directly from founders who\'ve built from zero to scale.' },
  { icon: Users, title: 'Investor Connect', desc: 'Curated 1:1 meetings with angel investors and VCs.' },
  { icon: Globe, title: 'Innovation Fest', desc: 'Exhibit your project and get feedback from industry experts.' },
  { icon: TrendingUp, title: 'Workshops', desc: 'Hands-on sessions on fundraising, product, growth, and more.' },
]

function CountBox({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 6, fontFamily: 'var(--mono)' }}>{label}</div>
    </div>
  )
}

export default function Home() {
  const time = useCountdown('2026-09-15T09:00:00')

  return (
    <main>
      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 64 }}>
        {/* BG grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 0 }} />
        {/* BG glow */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(232,48,74,0.12) 0%, transparent 70%)', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 60, paddingBottom: 80 }}>
          <div className="tag">E-Cell IIST Indore — Flagship Summit</div>

          <h1 style={{ fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: 28 }}>
            Where Ideas<br />
            <span style={{ color: 'var(--accent)', position: 'relative' }}>
              Become
              <span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 3, background: 'var(--accent)', opacity: 0.4 }} />
            </span>{' '}
            Empires.
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--muted)', maxWidth: 520, marginBottom: 40, lineHeight: 1.7 }}>
            E-Summit 2026 is IIST's largest entrepreneurship summit — 3 days of pitches, keynotes, hackathons, and connections that change trajectories.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
            <Link to="/register" className="btn btn-primary">
              Register Now <ArrowRight size={16} />
            </Link>
            <Link to="/events" className="btn btn-outline">
              Explore Events
            </Link>
          </div>

          {/* COUNTDOWN */}
          <div>
            <p style={{ fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 20 }}>
              — Summit begins in
            </p>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
              <CountBox value={time.d ?? '--'} label="Days" />
              <span style={{ color: 'var(--border2)', fontSize: 36, fontFamily: 'var(--mono)', marginBottom: 14 }}>:</span>
              <CountBox value={time.h ?? '--'} label="Hours" />
              <span style={{ color: 'var(--border2)', fontSize: 36, fontFamily: 'var(--mono)', marginBottom: 14 }}>:</span>
              <CountBox value={time.m ?? '--'} label="Minutes" />
              <span style={{ color: 'var(--border2)', fontSize: 36, fontFamily: 'var(--mono)', marginBottom: 14 }}>:</span>
              <CountBox value={time.s ?? '--'} label="Seconds" />
            </div>
          </div>
        </div>

        {/* Date badge */}
        <div style={{ position: 'absolute', top: 100, right: 40, textAlign: 'right', display: 'none' }} className="date-badge">
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 4 }}>SEPT 15–17, 2026</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>IIST Campus, Indore</div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '36px 24px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', borderRight: '1px solid var(--border)' }}>
              <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, fontFamily: 'var(--mono)', color: 'var(--accent)' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4, letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="tag">What's happening</div>
            <h2>Six tracks.<br />One summit.</h2>
            <p>From pitching to investors to building in a hackathon — every track is designed to push you further.</p>
          </div>

          <div className="grid-3">
            {highlights.map((h, i) => (
              <Link to="/events" key={h.title} style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: 28,
                display: 'block',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,48,74,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: i % 2 === 0 ? 'var(--accent)' : 'var(--accent2)', opacity: 0.6 }} />
                <div style={{ width: 44, height: 44, background: 'rgba(232,48,74,0.1)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <h.icon size={20} color="var(--accent)" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{h.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{h.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 20, fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>
                  Learn more <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '80px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <div className="tag">Limited seats</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
              Ready to build<br />something great?
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 16 }}>Sept 15–17, 2026 · IIST Campus, Indore</p>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
              Secure Your Spot <ArrowRight size={16} />
            </Link>
            <Link to="/schedule" className="btn btn-outline" style={{ fontSize: 15, padding: '14px 32px' }}>
              View Schedule
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
