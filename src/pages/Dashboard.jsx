import { Link } from 'react-router-dom'
import { Calendar, Bell, Trophy, CheckCircle, Clock, MapPin, User, QrCode, Download } from 'lucide-react'

const registered = [
  { title: 'Startup Pitch Competition', date: 'Sept 15, 2026', venue: 'Hall B1', status: 'confirmed', badge: 'Semifinalist', color: '#E8304A' },
  { title: 'Build-a-thon', date: 'Sept 15, 2026', venue: 'Tech Arena', status: 'confirmed', badge: 'Registered', color: '#F5C842' },
  { title: 'Keynotes & Workshops', date: 'Sept 15–17', venue: 'Auditorium A', status: 'confirmed', badge: 'All-access', color: '#A78BFA' },
]

const upcoming = [
  { time: '09:30', title: 'Opening Keynote — Priya Kapoor', day: 'Day 1', type: 'keynote' },
  { time: '11:00', title: 'Pitch Round 1 Check-in', day: 'Day 1', type: 'important' },
  { time: '14:00', title: 'Build-a-thon Kickoff', day: 'Day 1', type: 'competition' },
  { time: '16:30', title: 'Workshop: Product Thinking', day: 'Day 1', type: 'workshop' },
]

const notifications = [
  { msg: 'Pitch deck submission opens in 48 hours.', time: '2h ago', type: 'alert' },
  { msg: 'Your team slot for Build-a-thon is confirmed: Team Alpha.', time: '1d ago', type: 'success' },
  { msg: 'Workshop: Product Thinking — seats almost full!', time: '2d ago', type: 'info' },
]

const typeColor = { keynote: '#A78BFA', important: '#E8304A', competition: '#F5C842', workshop: '#34D399' }

export default function Dashboard() {
  return (
    <main style={{ paddingTop: 64, minHeight: '100vh' }}>
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '40px 0 32px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(232,48,74,0.15)', border: '2px solid rgba(232,48,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} color="var(--accent)" />
                </div>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}>PARTICIPANT DASHBOARD</p>
                  <h1 style={{ fontSize: 24, fontWeight: 700 }}>Hey, Arihant 👋</h1>
                </div>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 14 }}>E-Summit 2026 · IIST Indore · Reg. ID: <span style={{ fontFamily: 'var(--mono)', color: 'var(--accent)' }}>ES26-7482</span></p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-outline" style={{ fontSize: 13, padding: '9px 18px' }}>
                <QrCode size={15} /> My QR Pass
              </button>
              <button className="btn btn-outline" style={{ fontSize: 13, padding: '9px 18px' }}>
                <Download size={15} /> Schedule PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container section-sm">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'start' }}>
          <div>
            {/* Registered Events */}
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Trophy size={18} color="var(--accent)" /> My Events
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {registered.map(ev => (
                <div key={ev.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 20, borderLeft: `3px solid ${ev.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{ev.title}</h3>
                      <div style={{ display: 'flex', gap: 16 }}>
                        <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} />{ev.date}</span>
                        <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{ev.venue}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: ev.color, border: `1px solid ${ev.color}44`, padding: '2px 9px', borderRadius: 2, letterSpacing: '0.07em' }}>{ev.badge}</span>
                      <CheckCircle size={15} color="#34D399" />
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/events" style={{ fontSize: 13, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 5, padding: '8px 0' }}>+ Add more events →</Link>
            </div>

            {/* Upcoming sessions */}
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={18} color="var(--accent)" /> Upcoming — Day 1
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {upcoming.map((u, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 16px', background: 'var(--card)', borderRadius: 6, border: '1px solid var(--border)', borderLeft: `3px solid ${typeColor[u.type]}`, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', minWidth: 45 }}>{u.time}</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{u.title}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: typeColor[u.type], border: `1px solid ${typeColor[u.type]}44`, padding: '1px 8px', borderRadius: 2, fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}>{u.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Stats */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 20 }}>
              <p style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 14 }}>YOUR STATS</p>
              {[
                { label: 'Events registered', val: '3' },
                { label: 'Days attending', val: '3 / 3' },
                { label: 'Profile completion', val: '85%' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                  <span style={{ color: 'var(--muted)' }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{s.val}</span>
                </div>
              ))}
            </div>

            {/* Notifications */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 20 }}>
              <p style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Bell size={12} />NOTIFICATIONS
              </p>
              {notifications.map((n, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: i < notifications.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5, marginBottom: 4 }}>{n.msg}</p>
                  <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{n.time}</p>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 20 }}>
              <p style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 12 }}>QUICK LINKS</p>
              {[
                { label: 'Submit pitch deck', to: '#' },
                { label: 'View full schedule', to: '/schedule' },
                { label: 'Speaker profiles', to: '/speakers' },
                { label: 'Venue & directions', to: '#' },
                { label: 'Contact team', to: '#' },
              ].map(l => (
                <Link key={l.label} to={l.to} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 13, color: 'var(--muted)', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                  {l.label} <span style={{ fontSize: 16 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
