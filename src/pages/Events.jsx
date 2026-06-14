import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Zap, Mic, Users, Globe, TrendingUp, ArrowRight, Clock, Calendar, Award } from 'lucide-react'

const events = [
  {
    id: 1, icon: Trophy, color: '#F5C842', tag: 'Competition',
    title: 'Startup Pitch Competition',
    tagline: 'Present. Persuade. Prevail.',
    desc: 'The centerpiece of E-Summit. Teams of 2–4 pitch their startup idea to a panel of investors and industry leaders. Shortlisted teams get mentoring sessions before the final pitch.',
    date: 'Sept 15, 2026', duration: '8 hours',
    prize: '₹5,00,000', seats: 80,
    format: 'Team (2–4)', rounds: ['Screening Deck', 'Semi-Final Pitch', 'Grand Finale'],
    highlights: ['Live VC feedback', 'Mentoring before finals', 'Investor intros post-event'],
  },
  {
    id: 2, icon: Zap, color: '#E8304A', tag: 'Build',
    title: 'Build-a-thon (Hackathon)',
    tagline: '36 hours. One problem. Your solution.',
    desc: 'A 36-hour product sprint where teams build tech solutions to real-world problem statements released at the start. Judged on impact, feasibility, and execution.',
    date: 'Sept 15–16, 2026', duration: '36 hours',
    prize: '₹2,50,000', seats: 200,
    format: 'Team (2–5)', rounds: ['Problem reveal', 'Build sprint', 'Demo Day'],
    highlights: ['Cloud credits provided', 'Mentor support throughout', 'Best use-of-AI award'],
  },
  {
    id: 3, icon: Mic, color: '#A78BFA', tag: 'Keynote',
    title: 'Founder Keynotes',
    tagline: 'Real stories. No filters.',
    desc: 'Unscripted conversations with founders who\'ve built from scratch — covering failure, funding, and what they wish they\'d known. Open to all registered participants.',
    date: 'Sept 15–17, 2026', duration: 'All 3 days',
    prize: 'Free access', seats: 500,
    format: 'Individual', rounds: [],
    highlights: ['10+ speakers', 'Live Q&A sessions', 'Recorded for all registrants'],
  },
  {
    id: 4, icon: Users, color: '#34D399', tag: 'Networking',
    title: 'Investor Connect',
    tagline: 'The right room changes everything.',
    desc: 'Curated 1:1 speed-networking sessions with angel investors, VCs, and startup ecosystem players. Slots are allocated based on registration and pitch quality.',
    date: 'Sept 16, 2026', duration: '4 hours',
    prize: 'Curated access', seats: 60,
    format: 'Individual', rounds: ['Application', 'Profile review', 'Session'],
    highlights: ['15+ investors present', 'Pre-scheduled 8-min slots', 'Follow-up facilitation'],
  },
  {
    id: 5, icon: Globe, color: '#F59E0B', tag: 'Exhibition',
    title: 'Innovation Fest',
    tagline: 'Show the world what you\'re building.',
    desc: 'An open exhibition floor where student innovators, startups, and college projects display their work. Attendees vote for their favorites alongside expert judges.',
    date: 'Sept 17, 2026', duration: '6 hours',
    prize: '₹1,00,000', seats: 150,
    format: 'Individual / Team', rounds: [],
    highlights: ['People\'s choice award', 'Expert evaluation', 'Media coverage'],
  },
  {
    id: 6, icon: TrendingUp, color: '#60A5FA', tag: 'Workshop',
    title: 'Growth Workshops',
    tagline: 'Learn from the ones who\'ve done it.',
    desc: 'Parallel hands-on workshops running across all 3 days: Fundraising 101, Product Thinking, Growth Hacking, and No-Code Prototyping. Limited seats per session.',
    date: 'Sept 15–17, 2026', duration: '2 hrs each',
    prize: 'Certificate', seats: 40,
    format: 'Individual', rounds: [],
    highlights: ['4 workshop tracks', 'Practical exercises', 'Certificate of completion'],
  },
]

export default function Events() {
  const [active, setActive] = useState(null)
  const selected = active !== null ? events.find(e => e.id === active) : null

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className="tag">E-Summit 2026</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>6 Events.<br />Every Ambition Covered.</h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 500 }}>From pitching to building to networking — pick your track and go all in.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 24, transition: 'all 0.3s' }}>
            <div className="grid-2" style={{ alignContent: 'start' }}>
              {events.map(ev => (
                <div key={ev.id}
                  onClick={() => setActive(active === ev.id ? null : ev.id)}
                  style={{
                    background: 'var(--card)', border: `1px solid ${active === ev.id ? ev.color : 'var(--border)'}`,
                    borderRadius: 8, padding: 24, cursor: 'pointer', transition: 'all 0.2s',
                    borderLeft: `3px solid ${ev.color}`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = ev.color}
                  onMouseLeave={e => { if (active !== ev.id) e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.borderLeftColor = ev.color; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ width: 40, height: 40, background: `${ev.color}18`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ev.icon size={18} color={ev.color} />
                    </div>
                    <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: ev.color, border: `1px solid ${ev.color}44`, padding: '2px 8px', borderRadius: 2, letterSpacing: '0.08em' }}>{ev.tag}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{ev.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>{ev.tagline}</p>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
                      <Award size={12} color={ev.color} />{ev.prize}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
                      <Users size={12} />{ev.seats} seats
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selected && (
              <div style={{ position: 'sticky', top: 80, background: 'var(--card)', border: `1px solid ${selected.color}44`, borderRadius: 10, padding: 28, height: 'fit-content' }}>
                <div style={{ height: 3, background: selected.color, borderRadius: 2, marginBottom: 20, opacity: 0.8 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <selected.icon size={20} color={selected.color} />
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>{selected.title}</h3>
                </div>
                <p style={{ fontSize: 13, color: selected.color, marginBottom: 16, fontStyle: 'italic' }}>{selected.tagline}</p>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>{selected.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  {[
                    { icon: Calendar, label: 'Date', val: selected.date },
                    { icon: Clock, label: 'Duration', val: selected.duration },
                    { icon: Award, label: 'Prize', val: selected.prize },
                    { icon: Users, label: 'Format', val: selected.format },
                  ].map(row => (
                    <div key={row.label} style={{ background: 'var(--bg)', borderRadius: 6, padding: '10px 12px' }}>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                        <row.icon size={11} />{row.label}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{row.val}</div>
                    </div>
                  ))}
                </div>

                {selected.highlights.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 10 }}>HIGHLIGHTS</p>
                    {selected.highlights.map(h => (
                      <div key={h} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', marginBottom: 7, alignItems: 'center' }}>
                        <span style={{ color: selected.color, fontSize: 16 }}>›</span>{h}
                      </div>
                    ))}
                  </div>
                )}

                <Link to="/register" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}>
                  Register for this event <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
