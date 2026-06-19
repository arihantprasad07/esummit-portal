import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle, Globe, Mic, Trophy, TrendingUp, Users, Zap } from 'lucide-react'

const events = [
  { id: 'pitch', icon: Trophy, color: '#F5C842', name: 'Startup Pitch Competition', title: 'Startup Pitch Competition', date: 'Sept 15, 2026', format: 'Team pitch + jury Q&A', prize: 'Prize pool: Rs. 50,000', note: 'Present your startup idea to investors and industry leaders.' },
  { id: 'hackathon', icon: Zap, color: '#E8304A', name: 'Build-a-thon (Hackathon)', title: 'Build-a-thon (Hackathon)', date: 'Sept 15-16, 2026', format: '36-hour team build sprint', prize: 'Prize pool: Rs. 30,000', note: 'Build tech solutions in a focused product sprint.' },
  { id: 'keynotes', icon: Mic, color: '#A78BFA', name: 'Founder Keynotes', title: 'Founder Keynotes', date: 'Sept 15-17, 2026', format: 'Individual access', prize: 'Included with pass', note: 'Hear real founder stories across all three summit days.' },
  { id: 'investor', icon: Users, color: '#34D399', name: 'Investor Connect', title: 'Investor Connect', date: 'Sept 16, 2026', format: 'Curated networking', prize: 'Invite-based access', note: 'Join curated networking sessions with investors and ecosystem leaders.' },
  { id: 'fest', icon: Globe, color: '#F59E0B', name: 'Innovation Fest', title: 'Innovation Fest', date: 'Sept 17, 2026', format: 'Exhibition showcase', prize: 'Prize pool: Rs. 20,000', note: 'Showcase projects and startups on the exhibition floor.' },
  { id: 'workshops', icon: TrendingUp, color: '#60A5FA', name: 'Growth Workshops', title: 'Growth Workshops', date: 'Sept 15-17, 2026', format: 'Hands-on sessions', prize: 'Certificate', note: 'Learn fundraising, product thinking, and growth from operators.' },
]

const steps = ['Personal Details', 'Select Events', 'Confirmation']
const years = ['1st', '2nd', '3rd', '4th']

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  minHeight: 44,
  background: 'var(--bg)',
  border: '1px solid var(--border2)',
  borderRadius: 4,
  color: 'var(--text)',
  fontSize: 14,
  fontFamily: 'var(--font)',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const labelStyle = {
  display: 'block',
  marginBottom: 7,
  color: 'var(--muted)',
  fontFamily: 'var(--mono)',
  fontSize: 12,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [participantId, setParticipantId] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    events: [],
  })

  const handleInput = (event) => {
    const { name, value } = event.target
    setSubmitError('')
    setForm((current) => ({ ...current, [name]: value }))
  }

  const toggleEvent = (id) => {
    setSubmitError('')
    setForm((current) => ({
      ...current,
      events: current.events.includes(id)
        ? current.events.filter((eventId) => eventId !== id)
        : [...current.events, id],
    }))
  }

  const selectedEvents = events.filter((event) => form.events.includes(event.id))
  const canContinueDetails = form.name && form.email && form.phone && form.college && form.year

  const handleConfirmRegistration = async () => {
    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          college: form.college,
          year: form.year,
          events: form.events,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.status === 201) {
        localStorage.setItem('udaan_registration', JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          college: form.college,
          year: form.year,
          events: selectedEvents.map((event) => ({
            id: event.id,
            name: event.name,
            date: event.date,
            format: event.format,
            prize: event.prize,
          })),
          participantId: data.participantId,
          registeredAt: new Date().toISOString(),
        }))
        setParticipantId(data.participantId)
        setSubmitted(true)
        return
      }

      if (response.status === 409) {
        setSubmitError('This email is already registered for E-Summit')
        return
      }

      if (response.status === 429) {
        setSubmitError('Too many attempts, please wait a few minutes')
        return
      }

      if (response.status === 400) {
        setSubmitError(data.error || 'Please check your registration details')
        return
      }

      setSubmitError('Something went wrong. Please try again.')
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main style={{ paddingTop: 64, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 480, textAlign: 'center', padding: '0 24px' }}>
          <CheckCircle size={64} color="#34D399" style={{ marginBottom: 24 }} />
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 12 }}>
            You're registered!
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 8 }}>
            Participant ID
          </p>
          <p style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700, marginBottom: 32 }}>
            {participantId}
          </p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Go to Dashboard <ArrowRight size={15} />
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className="tag">Registration Open</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 14 }}>
            Register for E-Summit 2026.
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 560 }}>
            Choose your events, confirm your details, and get your participant pass.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <ProgressBar activeStep={step} />

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 32 }}>
            {step === 1 && (
              <section>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 22 }}>Personal Details</h2>
                <div className="register-field-grid">
                  <InputField label="Full Name" name="name" value={form.name} onChange={handleInput} placeholder="Arihant Prasad" />
                  <InputField label="Email" type="email" name="email" value={form.email} onChange={handleInput} placeholder="you@college.edu" />
                  <InputField label="Phone Number" name="phone" value={form.phone} onChange={handleInput} placeholder="+91 XXXXX XXXXX" />
                  <InputField label="College Name" name="college" value={form.college} onChange={handleInput} placeholder="IIST Indore" />
                  <div>
                    <label style={labelStyle}>Year of Study</label>
                    <select name="year" value={form.year} onChange={handleInput} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(2)} disabled={!canContinueDetails}>
                    Next <ArrowRight size={15} />
                  </button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Select Events</h2>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>Select one or more events for your summit pass.</p>
                <div className="register-event-grid">
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} selected={form.events.includes(event.id)} onToggle={toggleEvent} />
                  ))}
                </div>
                <div className="register-actions">
                  <p>{form.events.length} events selected</p>
                  <div>
                    <button type="button" className="btn btn-outline" onClick={() => { setSubmitError(''); setStep(1) }}>Back</button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(3)} disabled={form.events.length === 0}>
                      Next <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {step === 3 && (
              <section>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 22 }}>Confirmation</h2>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: 22, marginBottom: 24 }}>
                  {[
                    ['Name', form.name],
                    ['Email', form.email],
                    ['College', form.college],
                  ].map(([label, value]) => (
                    <div key={label} className="register-summary-row">
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                  <div style={{ paddingTop: 14 }}>
                    <p style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 10, fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Selected Events
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {selectedEvents.map((event) => (
                        <span key={event.id} style={{ color: event.color, border: `1px solid ${event.color}55`, background: `${event.color}14`, borderRadius: 999, padding: '5px 10px', fontSize: 12, fontWeight: 700 }}>
                          {event.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {submitError && (
                  <div className="register-error-banner" role="alert">
                    {submitError}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-outline" onClick={() => { setSubmitError(''); setStep(2) }} disabled={submitting}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={handleConfirmRegistration} disabled={submitting}>
                    {submitting ? 'Registering...' : 'Confirm Registration'} {!submitting && <CheckCircle size={15} />}
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .register-progress {
          display: flex;
          align-items: center;
          margin-bottom: 36px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }

        .register-progress::-webkit-scrollbar {
          display: none;
        }

        .register-field-grid,
        .register-event-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .register-event-card {
          min-height: 170px;
          padding: 18px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg);
          text-align: left;
          color: var(--text);
          transition: all 0.2s;
        }

        .register-event-card.selected {
          border-color: var(--accent);
          background: rgba(232,48,74,0.08);
        }

        .register-event-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .register-event-icon {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .register-event-check {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 2px solid var(--border2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
        }

        .register-event-card.selected .register-event-check {
          border-color: var(--accent);
          background: var(--accent);
        }

        .register-event-card h3 {
          font-size: 16px;
          margin-bottom: 8px;
        }

        .register-event-card p {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.55;
        }

        .register-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 26px;
        }

        .register-actions p {
          color: var(--accent);
          font-family: var(--mono);
          font-size: 13px;
          font-weight: 700;
        }

        .register-actions > div {
          display: flex;
          gap: 12px;
        }

        .register-error-banner {
          border: 1px solid rgba(232,48,74,0.55);
          border-radius: 6px;
          background: rgba(232,48,74,0.12);
          color: #ffb4c0;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
          padding: 12px 14px;
        }

        .btn:disabled,
        .register-event-card:disabled {
          cursor: not-allowed;
          opacity: 0.58;
          transform: none;
          filter: none;
        }

        .register-summary-row {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          font-size: 14px;
        }

        .register-summary-row span {
          color: var(--muted);
        }

        .register-summary-row strong {
          color: var(--text);
          font-weight: 600;
          text-align: right;
        }

        @media (max-width: 700px) {
          .register-field-grid,
          .register-event-grid {
            grid-template-columns: 1fr;
          }

          .register-actions {
            align-items: flex-start;
            flex-direction: column;
          }

          .register-actions > div {
            width: 100%;
            flex-direction: column;
          }

          .register-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </main>
  )
}

function ProgressBar({ activeStep }) {
  return (
    <div className="register-progress">
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const active = activeStep >= stepNumber

        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: index < steps.length - 1 ? 1 : 'none', minWidth: 116 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? 'var(--accent)' : 'var(--card)', border: active ? '1px solid var(--accent)' : '1px solid var(--border2)', color: active ? '#fff' : 'var(--muted)', fontWeight: 700, fontSize: 12 }}>
                {stepNumber}
              </div>
              <span style={{ color: activeStep === stepNumber ? 'var(--text)' : 'var(--muted)', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
                Step {stepNumber}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div style={{ flex: 1, height: 1, background: activeStep > stepNumber ? 'var(--accent)' : 'var(--border)', margin: '0 14px' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function InputField({ label, type = 'text', name, value, onChange, placeholder }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={(event) => { event.target.style.borderColor = 'var(--accent)' }}
        onBlur={(event) => { event.target.style.borderColor = 'var(--border2)' }}
      />
    </div>
  )
}

function EventCard({ event, selected, onToggle }) {
  const Icon = event.icon

  return (
    <button type="button" className={selected ? 'register-event-card selected' : 'register-event-card'} onClick={() => onToggle(event.id)}>
      <div className="register-event-card-top">
        <div className="register-event-icon" style={{ background: `${event.color}18`, color: event.color }}>
          <Icon size={18} />
        </div>
        <div className="register-event-check">{selected ? '✓' : ''}</div>
      </div>
      <h3>{event.title}</h3>
      <p>{event.note}</p>
    </button>
  )
}
