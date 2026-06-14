import { useState } from 'react'
import { Clock, MapPin } from 'lucide-react'

const days = [
  { id: 1, label: 'Day 1 — Sept 15' },
  { id: 2, label: 'Day 2 — Sept 16' },
  { id: 3, label: 'Day 3 — Sept 17' },
]

const filters = ['All', 'Pitch', 'Hackathon', 'Keynote', 'Workshop', 'Networking']

const schedule = {
  1: [
    { time: '09:00 AM', title: 'Opening Ceremony', venue: 'Main Stage', track: 'All tracks' },
    { time: '10:30 AM', title: 'Startup Pitch — Round 1', venue: 'Hall A', track: 'Pitch' },
    { time: '11:00 AM', title: 'Founder Keynote: "From Zero to Series A"', venue: 'Main Stage', track: 'Keynote' },
    { time: '12:30 PM', title: 'Lunch & Networking Break', venue: 'Campus Ground', track: 'Networking' },
    { time: '02:00 PM', title: 'Hackathon Kickoff + Problem Reveal', venue: 'Tech Lab', track: 'Hackathon' },
    { time: '03:00 PM', title: 'Workshop: Fundraising 101', venue: 'Room B', track: 'Workshop' },
    { time: '05:00 PM', title: 'Innovation Fest Setup', venue: 'Exhibition Hall', track: 'All tracks' },
  ],
  2: [
    { time: '09:00 AM', title: 'Hackathon — Build Sprint continues', venue: 'Tech Lab', track: 'Hackathon' },
    { time: '10:00 AM', title: 'Startup Pitch — Semi Finals', venue: 'Hall A', track: 'Pitch' },
    { time: '11:30 AM', title: 'Founder Keynote: "Building in Public"', venue: 'Main Stage', track: 'Keynote' },
    { time: '01:00 PM', title: 'Investor Connect Sessions', venue: 'Board Room', track: 'Networking' },
    { time: '02:30 PM', title: 'Workshop: Product Thinking', venue: 'Room B', track: 'Workshop' },
    { time: '04:00 PM', title: 'Innovation Fest — Public Voting Opens', venue: 'Exhibition Hall', track: 'All tracks' },
    { time: '06:00 PM', title: 'Hackathon Submissions Close', venue: 'Tech Lab', track: 'Hackathon' },
  ],
  3: [
    { time: '09:30 AM', title: 'Hackathon Demo Day', venue: 'Main Stage', track: 'Hackathon' },
    { time: '11:00 AM', title: 'Startup Pitch — Grand Finale', venue: 'Main Stage', track: 'Pitch' },
    { time: '01:00 PM', title: 'Lunch & Founder Meetup', venue: 'Campus Ground', track: 'Networking' },
    { time: '02:30 PM', title: 'Workshop: Growth Hacking', venue: 'Room B', track: 'Workshop' },
    { time: '04:00 PM', title: 'Innovation Fest — Winners Announced', venue: 'Exhibition Hall', track: 'All tracks' },
    { time: '05:30 PM', title: 'Closing Ceremony & Prize Distribution', venue: 'Main Stage', track: 'All tracks' },
  ],
}

const trackColors = {
  Pitch: '#F5C842',
  Hackathon: '#E8304A',
  Keynote: '#A78BFA',
  Workshop: '#60A5FA',
  Networking: '#34D399',
  'All tracks': '#8A8F9E',
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1)
  const [activeFilter, setActiveFilter] = useState('All')

  const sessions = schedule[activeDay] || []
  const visibleCount = sessions.filter((session) => isVisible(session, activeFilter)).length

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className="tag">Sept 15-17, 2026</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
            Summit schedule
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 560 }}>
            Move through pitch rounds, build sprints, founder sessions, and the closing celebration.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10, marginBottom: 22 }}>
            {days.map((day) => {
              const selected = activeDay === day.id

              return (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  style={{
                    minHeight: 48,
                    padding: '12px 16px',
                    borderRadius: 6,
                    border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
                    background: selected ? 'rgba(232,48,74,0.12)' : 'var(--card)',
                    color: selected ? 'var(--text)' : 'var(--muted)',
                    fontSize: 14,
                    fontWeight: 700,
                    transition: 'all 0.2s',
                  }}
                >
                  {day.label}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
            {filters.map((filter) => {
              const selected = activeFilter === filter
              const color = filter === 'All' ? '#E8304A' : trackColors[filter]

              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 999,
                    border: `1px solid ${selected ? color : 'var(--border)'}`,
                    background: selected ? `${color}22` : 'transparent',
                    color: selected ? color : 'var(--muted)',
                    fontSize: 12,
                    fontWeight: 700,
                    transition: 'all 0.2s',
                  }}
                >
                  {filter}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 20, position: 'relative' }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: 8, bottom: 8, left: 88, width: 1, background: 'var(--border)' }} />

            {sessions.map((session) => {
              const color = trackColors[session.track]
              const visible = isVisible(session, activeFilter)

              return (
                <article
                  key={`${session.time}-${session.title}`}
                  style={{
                    display: 'contents',
                    pointerEvents: visible ? 'auto' : 'none',
                  }}
                >
                  <div
                    style={{
                      color: visible ? 'var(--muted)' : 'transparent',
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      paddingTop: visible ? 20 : 0,
                      maxHeight: visible ? 120 : 0,
                      opacity: visible ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {session.time}
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      maxHeight: visible ? 180 : 0,
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(-8px)',
                      marginBottom: visible ? 14 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.28s ease, opacity 0.22s ease, transform 0.22s ease, margin-bottom 0.28s ease',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 26,
                        left: -26,
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        background: color,
                        boxShadow: `0 0 0 5px ${color}22`,
                        zIndex: 1,
                      }}
                    />
                    <div
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderLeft: `3px solid ${color}`,
                        borderRadius: 8,
                        padding: '18px 20px',
                        transition: 'border-color 0.2s, transform 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', marginBottom: 10 }}>
                        <h2 style={{ fontSize: 'clamp(16px, 2vw, 21px)', lineHeight: 1.25, fontWeight: 700 }}>
                          {session.title}
                        </h2>
                        <span
                          style={{
                            flexShrink: 0,
                            color,
                            border: `1px solid ${color}55`,
                            background: `${color}14`,
                            borderRadius: 3,
                            padding: '3px 8px',
                            fontFamily: 'var(--mono)',
                            fontSize: 10,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {session.track}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, color: 'var(--muted)', fontSize: 13 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <Clock size={13} />
                          {session.time}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <MapPin size={13} />
                          {session.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {visibleCount === 0 && (
            <div style={{ border: '1px solid var(--border)', borderRadius: 8, background: 'var(--card)', padding: 24, color: 'var(--muted)', textAlign: 'center' }}>
              No sessions match this filter.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function isVisible(session, activeFilter) {
  return activeFilter === 'All' || session.track === activeFilter || session.track === 'All tracks'
}
