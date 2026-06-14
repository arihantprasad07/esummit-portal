import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

const events = [
  { id: 'pitch', label: 'Startup Pitch Competition', fee: '₹500/team', note: 'Team of 2–4' },
  { id: 'hack', label: 'Build-a-thon (Hackathon)', fee: '₹300/team', note: 'Team of 2–5' },
  { id: 'keynote', label: 'Keynotes & Workshops', fee: 'Free', note: 'Individual' },
  { id: 'invest', label: 'Investor Connect', fee: '₹1000', note: 'By application' },
  { id: 'fest', label: 'Innovation Fest (Exhibit)', fee: '₹200', note: 'Individual / Team' },
]

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', college: '', year: '', events: [], teamName: '', teamSize: '' })
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const toggle = (id) => setForm(f => ({ ...f, events: f.events.includes(id) ? f.events.filter(e => e !== id) : [...f.events, id] }))
  const handleInput = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const inputStyle = { width: '100%', padding: '11px 14px', background: 'var(--bg)', border: '1px solid var(--border2)', borderRadius: 4, color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font)', outline: 'none', transition: 'border-color 0.2s' }
  const labelStyle = { fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }

  if (submitted) return (
    <main style={{ paddingTop: 64, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <CheckCircle size={56} color="var(--accent)" style={{ marginBottom: 24 }} />
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>You're registered!</h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 8 }}>Confirmation sent to <strong style={{ color: 'var(--text)' }}>{form.email}</strong></p>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 32 }}>Check your dashboard for updates, assigned slots, and event details.</p>
        <Link to="/dashboard" className="btn btn-primary">Go to Dashboard <ArrowRight size={15} /></Link>
      </div>
    </main>
  )

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className="tag">Registration Open</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 12 }}>Secure your spot<br />at E-Summit 2026.</h1>
          <p style={{ color: 'var(--muted)', fontSize: 16 }}>Sept 15–17 · IIST Campus, Indore · Limited seats</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 700 }}>
          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40 }}>
            {['Personal Info', 'Choose Events', 'Review'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: step > i + 1 ? 'var(--accent)' : step === i + 1 ? 'var(--accent)' : 'var(--card)', border: step >= i + 1 ? 'none' : '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: step >= i + 1 ? '#fff' : 'var(--muted)', flexShrink: 0 }}>{step > i + 1 ? '✓' : i + 1}</div>
                  <span style={{ fontSize: 13, color: step === i + 1 ? 'var(--text)' : 'var(--muted)', whiteSpace: 'nowrap' }}>{s}</span>
                </div>
                {i < 2 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? 'var(--accent)' : 'var(--border)', margin: '0 12px' }} />}
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 32 }}>
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Personal Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
                  <div><label style={labelStyle}>FULL NAME *</label><input name="name" value={form.name} onChange={handleInput} style={inputStyle} placeholder="Arihant Prasad" onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border2)'} /></div>
                  <div><label style={labelStyle}>EMAIL *</label><input name="email" value={form.email} onChange={handleInput} style={inputStyle} placeholder="you@college.edu" onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border2)'} /></div>
                  <div><label style={labelStyle}>PHONE *</label><input name="phone" value={form.phone} onChange={handleInput} style={inputStyle} placeholder="+91 XXXXX XXXXX" onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border2)'} /></div>
                  <div><label style={labelStyle}>COLLEGE *</label><input name="college" value={form.college} onChange={handleInput} style={inputStyle} placeholder="IIST Indore" onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border2)'} /></div>
                  <div><label style={labelStyle}>YEAR OF STUDY *</label>
                    <select name="year" value={form.year} onChange={handleInput} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select year</option>
                      {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'Alumni'].map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={() => setStep(2)} disabled={!form.name || !form.email || !form.phone || !form.college} style={{ marginTop: 8 }}>Continue <ArrowRight size={15} /></button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Choose Your Events</h2>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>Select one or more events to participate in.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                  {events.map(ev => (
                    <div key={ev.id} onClick={() => toggle(ev.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: 6, border: `1px solid ${form.events.includes(ev.id) ? 'var(--accent)' : 'var(--border)'}`, background: form.events.includes(ev.id) ? 'rgba(232,48,74,0.07)' : 'var(--bg)', cursor: 'pointer', transition: 'all 0.15s' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{ev.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>{ev.note}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: form.events.includes(ev.id) ? 'var(--accent)' : 'var(--muted)' }}>{ev.fee}</span>
                        <div style={{ width: 18, height: 18, borderRadius: 3, border: `2px solid ${form.events.includes(ev.id) ? 'var(--accent)' : 'var(--border2)'}`, background: form.events.includes(ev.id) ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {form.events.includes(ev.id) && <span style={{ color: '#fff', fontSize: 11 }}>✓</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button className="btn btn-primary" onClick={() => setStep(3)} disabled={form.events.length === 0}>Continue <ArrowRight size={15} /></button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Review & Confirm</h2>
                <div style={{ background: 'var(--bg)', borderRadius: 6, padding: 20, marginBottom: 20, border: '1px solid var(--border)' }}>
                  {[['Name', form.name], ['Email', form.email], ['College', form.college], ['Year', form.year]].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                      <span style={{ color: 'var(--muted)' }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ paddingTop: 12 }}>
                    <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>Selected events:</p>
                    {form.events.map(id => {
                      const ev = events.find(e => e.id === id)
                      return <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}><span>{ev.label}</span><span style={{ color: 'var(--accent)' }}>{ev.fee}</span></div>
                    })}
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>Payment will be collected at the venue. You'll receive a confirmation email with a unique QR code for entry.</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                  <button className="btn btn-primary" onClick={() => setSubmitted(true)}>Confirm Registration <CheckCircle size={15} /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
