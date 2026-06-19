import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = 'esummit'
const collectionName = 'registrations'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[\d\s+-]{10,15}$/
const rateLimitWindowMs = 10 * 60 * 1000
const rateLimitMaxRequests = 5

let cachedClientPromise = globalThis._mongoClientPromise
const rateLimitMap = globalThis._registrationRateLimitMap || new Map()
globalThis._registrationRateLimitMap = rateLimitMap

if (!cachedClientPromise && uri) {
  const client = new MongoClient(uri)
  cachedClientPromise = client.connect()
  globalThis._mongoClientPromise = cachedClientPromise
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizePhone(value) {
  return value.replace(/[\s-]/g, '')
}

function generateParticipantId() {
  const letters = Array.from({ length: 3 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')
  const digits = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
  return `IIST-2026-${letters}${digits}`
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for']
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim()
  }

  return req.socket?.remoteAddress || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const recentAttempts = (rateLimitMap.get(ip) || []).filter((timestamp) => now - timestamp < rateLimitWindowMs)

  if (recentAttempts.length >= rateLimitMaxRequests) {
    rateLimitMap.set(ip, recentAttempts)
    return true
  }

  recentAttempts.push(now)
  rateLimitMap.set(ip, recentAttempts)
  return false
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    if (!uri) {
      console.error('MONGODB_URI is not configured for api/register.js')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    // This in-memory limiter resets on serverless cold starts, which is acceptable for this lightweight event registration use case.
    if (isRateLimited(getClientIp(req))) {
      return res.status(429).json({ error: 'Too many attempts. Please try again later.' })
    }

    const client = await cachedClientPromise
    const collection = client.db(dbName).collection(collectionName)
    const { fullName, email, phone, college, year, events } = req.body || {}

    if (!isNonEmptyString(fullName)) {
      return res.status(400).json({ error: 'Full name is required' })
    }

    if (!isNonEmptyString(email)) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    if (!emailPattern.test(normalizedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address' })
    }

    if (!isNonEmptyString(phone)) {
      return res.status(400).json({ error: 'Phone is required' })
    }

    const normalizedPhone = phone.trim()
    if (!phonePattern.test(normalizedPhone)) {
      return res.status(400).json({ error: 'Please enter a valid phone number' })
    }

    const phoneNormalized = normalizePhone(normalizedPhone)

    if (!isNonEmptyString(college)) {
      return res.status(400).json({ error: 'College is required' })
    }

    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: 'At least one event is required' })
    }

    const existingRegistration = await collection.findOne({
      $or: [
        { email: normalizedEmail },
        { phoneNormalized },
      ],
    })

    if (existingRegistration) {
      return res.status(409).json({ error: 'This email or phone number is already registered' })
    }

    const participantId = generateParticipantId()

    await collection.insertOne({
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      phoneNormalized,
      college: college.trim(),
      year: isNonEmptyString(year) ? year.trim() : '',
      events,
      participantId,
      registeredAt: new Date(),
    })

    return res.status(201).json({ success: true, participantId })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
