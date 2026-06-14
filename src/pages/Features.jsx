import { Award, BarChart2, Bot, Calendar, ClipboardCheck, Users, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: ClipboardCheck,
    title: 'Event Registration System',
    description: 'Users can register for individual events, get confirmation emails, and manage their registrations from the dashboard.',
    status: 'Live',
    color: '#34D399',
  },
  {
    icon: BarChart2,
    title: 'Live Leaderboards',
    description: 'Real-time rankings for Startup Pitch and Hackathon competitions. Points update as rounds progress.',
    status: 'Live',
    color: '#34D399',
  },
  {
    icon: Bot,
    title: 'AI Summit Assistant',
    description: 'A chatbot that answers questions about events, schedules, and registration - available 24/7 during the summit.',
    status: 'Coming Soon',
    color: '#F5C842',
  },
  {
    icon: Users,
    title: 'Participant Networking Wall',
    description: 'Attendees can create profiles, browse other participants by interest, and send connection requests before the event.',
    status: 'Live',
    color: '#34D399',
  },
  {
    icon: Award,
    title: 'Gamification & Badges',
    description: 'Earn badges for attending sessions, completing registrations, and engaging with content. Top participants get featured.',
    status: 'Planned',
    color: '#A78BFA',
  },
  {
    icon: Calendar,
    title: 'Smart Schedule Builder',
    description: 'Participants pick their preferred sessions and the system builds a personalized schedule, alerting conflicts.',
    status: 'Coming Soon',
    color: '#F5C842',
  },
]

const journey = [
  { step: '01', title: 'Discover', description: 'Land on the portal, explore events and speakers' },
  { step: '02', title: 'Register', description: 'Sign up for the summit and choose your events' },
  { step: '03', title: 'Prepare', description: 'Access your dashboard, schedule, and networking' },
  { step: '04', title: 'Participate', description: 'Attend, compete, connect, and win' },
]

export default function Features() {
  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className="tag">Portal Features</div>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.05, marginBottom: 16 }}>
            Built for Builders.
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 620 }}>
            Features that make E-Summit 2026 the smartest summit portal in central India.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>

          <section style={{ marginTop: 88 }}>
            <div className="section-header" style={{ marginBottom: 32 }}>
              <h2>How it works</h2>
              <p>From first visit to final ceremony, the portal keeps every participant moving cleanly through the summit.</p>
            </div>

            <div className="features-journey">
              {journey.map((item, index) => (
                <div key={item.step} className="features-journey-item">
                  <article>
                    <span>{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                  {index < journey.length - 1 && (
                    <div className="features-journey-arrow" aria-hidden="true">
                      <ArrowRight size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <style>{`
        .features-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 24px;
          min-height: 230px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s, transform 0.2s;
        }

        .features-card:hover {
          transform: translateY(-2px);
        }

        .features-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .features-icon {
          width: 44px;
          height: 44px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .features-status {
          flex-shrink: 0;
          border: 1px solid;
          border-radius: 999px;
          padding: 4px 9px;
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .features-card h2 {
          font-size: 19px;
          line-height: 1.25;
          margin-bottom: 10px;
        }

        .features-card p {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.65;
        }

        .features-journey {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }

        .features-journey-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          align-items: center;
        }

        .features-journey-item article {
          height: 100%;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 20px;
        }

        .features-journey-item span {
          display: inline-flex;
          color: var(--accent);
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .features-journey-item h3 {
          font-size: 17px;
          margin-bottom: 8px;
        }

        .features-journey-item p {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.55;
        }

        .features-journey-arrow {
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .features-journey {
            grid-template-columns: 1fr;
          }

          .features-journey-item {
            grid-template-columns: 1fr;
          }

          .features-journey-arrow {
            display: none;
          }
        }
      `}</style>
    </main>
  )
}

function FeatureCard({ feature }) {
  const Icon = feature.icon

  return (
    <article className="features-card" style={{ borderTop: `3px solid ${feature.color}` }}>
      <div className="features-card-top">
        <div className="features-icon" style={{ background: `${feature.color}18`, color: feature.color }}>
          <Icon size={21} />
        </div>
        <span className="features-status" style={{ color: feature.color, borderColor: `${feature.color}55`, background: `${feature.color}14` }}>
          {feature.status}
        </span>
      </div>
      <h2>{feature.title}</h2>
      <p>{feature.description}</p>
    </article>
  )
}
