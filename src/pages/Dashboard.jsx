import { useState } from 'react'
import {
  Bell,
  Calendar,
  CheckCircle,
  Download,
  Edit3,
  ExternalLink,
  MapPin,
  MessageCircle,
  Trophy,
  Users,
} from 'lucide-react'

const navItems = ['Overview', 'My Events', 'Schedule', 'Networking', 'Notifications']

const registeredEvents = [
  {
    name: 'Startup Pitch Competition',
    date: 'Sept 15, 2026',
    format: 'Live pitch + jury Q&A',
    prize: 'Prize pool: Rs. 1,00,000',
    status: 'Confirmed',
    color: '#F5C842',
  },
  {
    name: 'Build-a-thon',
    date: 'Sept 15-17, 2026',
    format: '48-hour team build sprint',
    prize: 'Prize pool: Rs. 75,000',
    status: 'Pending',
    color: '#E8304A',
  },
]

const dayOneSchedule = [
  { time: '09:00 AM', title: 'Opening Ceremony', venue: 'Main Stage', track: 'All tracks' },
  { time: '10:30 AM', title: 'Startup Pitch — Round 1', venue: 'Hall A', track: 'Pitch' },
  { time: '11:00 AM', title: 'Founder Keynote: "From Zero to Series A"', venue: 'Main Stage', track: 'Keynote' },
  { time: '12:30 PM', title: 'Lunch & Networking Break', venue: 'Campus Ground', track: 'Networking' },
  { time: '02:00 PM', title: 'Hackathon Kickoff + Problem Reveal', venue: 'Tech Lab', track: 'Hackathon' },
  { time: '03:00 PM', title: 'Workshop: Fundraising 101', venue: 'Room B', track: 'Workshop' },
  { time: '05:00 PM', title: 'Innovation Fest Setup', venue: 'Exhibition Hall', track: 'All tracks' },
]

const participants = [
  { name: 'Riya Sharma', college: 'IIST Indore', interest: 'Pitch' },
  { name: 'Kabir Malhotra', college: 'Medicaps University', interest: 'Hackathon' },
  { name: 'Ananya Rao', college: 'DAVV Indore', interest: 'Workshop' },
  { name: 'Dev Mehta', college: 'Acropolis Institute', interest: 'Networking' },
]

const notifications = [
  { message: 'Your registration for Startup Pitch is confirmed', time: '2 hours ago' },
  { message: 'Hackathon problem statements will be released at event start', time: '1 day ago' },
  { message: 'E-Summit schedule is now live', time: '2 days ago' },
]

const trackColors = {
  Pitch: '#F5C842',
  Hackathon: '#E8304A',
  Keynote: '#A78BFA',
  Workshop: '#60A5FA',
  Networking: '#34D399',
  'All tracks': '#8A8F9E',
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-profile">
          <div className="dashboard-avatar">AP</div>
          <h1>Arihant Prasad</h1>
          <span>Registered Participant</span>
        </div>

        <nav className="dashboard-nav" aria-label="Dashboard sections">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveTab(item)}
              className={activeTab === item ? 'active' : ''}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <section className="dashboard-content">
        {activeTab === 'Overview' && <Overview />}
        {activeTab === 'My Events' && <MyEvents />}
        {activeTab === 'Schedule' && <Schedule />}
        {activeTab === 'Networking' && <Networking />}
        {activeTab === 'Notifications' && <Notifications />}
      </section>
    </main>
  )
}

function Overview() {
  return (
    <div className="dashboard-stack">
      <section className="dashboard-banner">
        <div>
          <p>Saturday, Sept 12, 2026</p>
          <h2>Welcome back, Arihant 👋</h2>
        </div>
        <span>Reg. ID ES26-7482</span>
      </section>

      <div className="dashboard-stats">
        <StatCard icon={Trophy} value="2" label="Events Registered" />
        <StatCard icon={Calendar} value="3" label="Days to Go" />
        <StatCard icon={Bell} value="1" label="Message" />
      </div>

      <SectionHeader title="My Registered Events" />
      <div className="dashboard-event-grid">
        {registeredEvents.map((event) => (
          <EventSummaryCard key={event.name} event={event} />
        ))}
      </div>

      <SectionHeader title="Upcoming Sessions Today" />
      <div className="dashboard-list">
        {dayOneSchedule.slice(0, 2).map((session) => (
          <SessionRow key={session.title} session={session} compact />
        ))}
      </div>

      <SectionHeader title="Quick Links" />
      <div className="dashboard-quick-links">
        {[
          { label: 'View Schedule', icon: Calendar },
          { label: 'Edit Profile', icon: Edit3 },
          { label: 'Download Pass', icon: Download },
          { label: 'Join WhatsApp Group', icon: MessageCircle },
        ].map((link) => (
          <QuickLinkButton key={link.label} link={link} />
        ))}
      </div>
    </div>
  )
}

function MyEvents() {
  return (
    <div className="dashboard-stack">
      <SectionHeader title="My Events" subtitle="Your registered summit tracks and current confirmation status." />
      <div className="dashboard-list">
        {registeredEvents.map((event) => (
          <article key={event.name} className="dashboard-detail-card" style={{ borderLeftColor: event.color }}>
            <div>
              <div className="dashboard-card-title-row">
                <h3>{event.name}</h3>
                <StatusBadge status={event.status} />
              </div>
              <div className="dashboard-meta-grid">
                <Meta icon={Calendar} label="Date" value={event.date} />
                <Meta icon={Users} label="Format" value={event.format} />
                <Meta icon={Trophy} label="Prize" value={event.prize} />
              </div>
            </div>
            <button type="button" className="dashboard-action">
              View Details
              <ExternalLink size={14} />
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

function Schedule() {
  return (
    <div className="dashboard-stack">
      <SectionHeader title="Mini Schedule" subtitle="Day 1 sessions at a glance." />
      <div className="dashboard-list">
        {dayOneSchedule.map((session) => (
          <SessionRow key={session.title} session={session} />
        ))}
      </div>
    </div>
  )
}

function Networking() {
  return (
    <div className="dashboard-stack">
      <SectionHeader title="Connect with Participants" subtitle="Find people attending similar sessions and events." />
      <div className="dashboard-people-grid">
        {participants.map((person) => (
          <article key={person.name} className="dashboard-person-card">
            <div className="dashboard-person-avatar">{getInitials(person.name)}</div>
            <h3>{person.name}</h3>
            <p>{person.college}</p>
            <span>{person.interest}</span>
            <button type="button">Connect</button>
          </article>
        ))}
      </div>
    </div>
  )
}

function Notifications() {
  return (
    <div className="dashboard-stack">
      <SectionHeader title="Notifications" subtitle="Latest updates for your E-Summit registration." />
      <div className="dashboard-list">
        {notifications.map((notification) => (
          <article key={notification.message} className="dashboard-notification">
            <div>
              <Bell size={15} />
            </div>
            <div>
              <p>{notification.message}</p>
              <span>{notification.time}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, value, label }) {
  return (
    <article className="dashboard-stat-card">
      <Icon size={18} />
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

function QuickLinkButton({ link }) {
  const Icon = link.icon

  return (
    <button type="button">
      <Icon size={16} />
      {link.label}
    </button>
  )
}

function EventSummaryCard({ event }) {
  return (
    <article className="dashboard-event-card" style={{ borderTopColor: event.color }}>
      <div className="dashboard-card-title-row">
        <h3>{event.name}</h3>
        <StatusBadge status={event.status} />
      </div>
      <p>{event.format}</p>
      <div className="dashboard-event-footer">
        <span>{event.date}</span>
        <strong>{event.prize}</strong>
      </div>
    </article>
  )
}

function SessionRow({ session, compact = false }) {
  const color = trackColors[session.track]

  return (
    <article className={compact ? 'dashboard-session compact' : 'dashboard-session'} style={{ borderLeftColor: color }}>
      <time>{session.time}</time>
      <div>
        <h3>{session.title}</h3>
        <p>
          <MapPin size={13} />
          {session.venue}
        </p>
      </div>
      <span style={{ color, borderColor: `${color}55`, background: `${color}14` }}>{session.track}</span>
    </article>
  )
}

function StatusBadge({ status }) {
  const confirmed = status === 'Confirmed'

  return (
    <span className={confirmed ? 'dashboard-status confirmed' : 'dashboard-status pending'}>
      {confirmed && <CheckCircle size={12} />}
      {status}
    </span>
  )
}

function Meta({ icon: Icon, label, value }) {
  return (
    <div className="dashboard-meta">
      <Icon size={14} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="dashboard-section-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
}
