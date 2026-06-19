import { ExternalLink } from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'

const speakers = [
  { name: 'Priya Kapoor', role: 'Founder & CEO', company: 'TechNova Labs', topic: 'Building AI Products at Scale', initials: 'PK', color: '#E8304A' },
  { name: 'Rahul Mehta', role: 'Investment Partner', company: 'Aarambh Ventures', topic: 'What Investors Look For in 2026', initials: 'RM', color: '#F5C842' },
  { name: 'Anika Singh', role: 'Co-founder', company: 'GreenLoop Energy', topic: 'Climate Tech & Sustainable Startups', initials: 'AS', color: '#34D399' },
  { name: 'Vikram Nair', role: 'CTO', company: 'FinGrid Systems', topic: 'Engineering Culture That Scales', initials: 'VN', color: '#60A5FA' },
  { name: 'Shreya Joshi', role: 'Managing Partner', company: 'Riverstone Capital', topic: 'The Indian Startup Decade Ahead', initials: 'SJ', color: '#A78BFA' },
  { name: 'Arjun Patel', role: 'Founder', company: 'QuickKart', topic: 'From Campus Idea to First 10,000 Users', initials: 'AP', color: '#F59E0B' },
  { name: 'Meera Iyer', role: 'VP Product', company: 'ScaleNest', topic: 'Product Management for Hypergrowth', initials: 'MI', color: '#EC4899' },
  { name: 'Dev Sharma', role: 'Angel Investor', company: 'Indore Startup Circle', topic: 'What I Learned From 20 Investments', initials: 'DS', color: '#FF6B35' },
]

export default function Speakers() {
  const revealRef = useScrollReveal()

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className="tag">Lineup</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>The people<br />worth listening to.</h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 480 }}>Founders, investors, and operators who've been in the room where it happens.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-4">
            {speakers.map((speaker, index) => (
              <article
                key={speaker.name}
                ref={revealRef(index)}
                className="polish-card reveal"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}
                onMouseEnter={(event) => { event.currentTarget.style.borderColor = `${speaker.color}55` }}
                onMouseLeave={(event) => { event.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <div style={{ height: 5, background: speaker.color, opacity: 0.8 }} />
                <div style={{ padding: 20 }}>
                  <div style={{ width: 56, aspectRatio: 1, borderRadius: '50%', background: `${speaker.color}22`, border: `2px solid ${speaker.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 16, color: speaker.color, marginBottom: 14 }}>{speaker.initials}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{speaker.name}</h3>
                  <p style={{ fontSize: 12, color: speaker.color, marginBottom: 2 }}>{speaker.role}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>{speaker.company}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, borderTop: '1px solid var(--border)', paddingTop: 12, fontStyle: 'italic' }}>"{speaker.topic}"</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <a
                      href="#"
                      aria-label={`${speaker.name} profile`}
                      style={{ width: 32, aspectRatio: 1, border: '1px solid var(--border)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', transition: 'all 0.15s' }}
                      onMouseEnter={(event) => { event.currentTarget.style.color = speaker.color; event.currentTarget.style.borderColor = `${speaker.color}55` }}
                      onMouseLeave={(event) => { event.currentTarget.style.color = 'var(--muted)'; event.currentTarget.style.borderColor = 'var(--border)' }}
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 40, textAlign: 'center' }}>More speakers to be announced. <a href="#" style={{ color: 'var(--accent)' }}>Get notified →</a></p>
        </div>
      </section>
    </main>
  )
}
