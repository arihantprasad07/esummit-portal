import { ExternalLink, Share2 } from 'lucide-react'

const speakers = [
  { name: 'Priya Kapoor', role: 'Co-founder & CEO', company: 'Nexus AI', topic: 'Building AI Products at Scale', initials: 'PK', color: '#E8304A' },
  { name: 'Rahul Mehta', role: 'Partner', company: 'Sequoia Capital India', topic: 'What Investors Look For in 2026', initials: 'RM', color: '#F5C842' },
  { name: 'Anika Singh', role: 'Founder', company: 'GreenLoop', topic: 'Climate Tech & Sustainable Startups', initials: 'AS', color: '#34D399' },
  { name: 'Vikram Nair', role: 'CTO', company: 'Razorpay', topic: 'Engineering Culture That Scales', initials: 'VN', color: '#60A5FA' },
  { name: 'Shreya Joshi', role: 'MD', company: 'Tiger Global India', topic: 'The Indian Startup Decade Ahead', initials: 'SJ', color: '#A78BFA' },
  { name: 'Arjun Patel', role: 'Founder', company: 'Swiggy (Ex)', topic: 'From Idea to ₹1000Cr ARR', initials: 'AP', color: '#F59E0B' },
  { name: 'Meera Iyer', role: 'VP Product', company: 'Zepto', topic: 'Product Management for Hypergrowth', initials: 'MI', color: '#EC4899' },
  { name: 'Dev Sharma', role: 'Angel Investor', company: '20+ Portfolio Cos', topic: 'What I Learned From 20 Investments', initials: 'DS', color: '#FF6B35' },
]

export default function Speakers() {
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
            {speakers.map(s => (
              <div key={s.name} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}55`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ height: 5, background: s.color, opacity: 0.8 }} />
                <div style={{ padding: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${s.color}22`, border: `2px solid ${s.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 16, color: s.color, marginBottom: 14 }}>{s.initials}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{s.name}</h3>
                  <p style={{ fontSize: 12, color: s.color, marginBottom: 2 }}>{s.role}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>{s.company}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, borderTop: '1px solid var(--border)', paddingTop: 12, fontStyle: 'italic' }}>"{s.topic}"</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    {[Linkedin].map((Icon, i) => (
                      <a key={i} href="#" style={{ width: 28, height: 28, border: '1px solid var(--border)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = `${s.color}55`; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                        <Icon size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 40, textAlign: 'center' }}>+ 30 more speakers to be announced. <a href="#" style={{ color: 'var(--accent)' }}>Get notified →</a></p>
        </div>
      </section>
    </main>
  )
}
