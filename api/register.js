import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = 'esummit'
const collectionName = 'registrations'

let cachedClientPromise = globalThis._mongoClientPromise

if (!cachedClientPromise && uri) {
  const client = new MongoClient(uri)
  cachedClientPromise = client.connect()
  globalThis._mongoClientPromise = cachedClientPromise
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function generateParticipantId() {
  const letters = Array.from({ length: 3 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')
  const digits = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
  return `IIST-2026-${letters}${digits}`
}

export default async function handler(req, res) {
  try {
    if (!uri) {
      return res.status(500).json({ error: 'Server error' })
    }

    const client = await cachedClientPromise
    const collection = client.db(dbName).collection(collectionName)

    if (req.method === 'POST') {
      const { fullName, email, phone, college, year, events } = req.body || {}

      if (!isNonEmptyString(fullName)) {
        return res.status(400).json({ error: 'Full name is required' })
      }

      if (!isNonEmptyString(email)) {
        return res.status(400).json({ error: 'Email is required' })
      }

      if (!isNonEmptyString(phone)) {
        return res.status(400).json({ error: 'Phone is required' })
      }

      if (!isNonEmptyString(college)) {
        return res.status(400).json({ error: 'College is required' })
      }

      if (!Array.isArray(events) || events.length === 0) {
        return res.status(400).json({ error: 'At least one event is required' })
      }

      const normalizedEmail = email.trim().toLowerCase()
      const existingRegistration = await collection.findOne({ email: normalizedEmail })

      if (existingRegistration) {
        return res.status(409).json({ error: 'This email is already registered' })
      }

      const participantId = generateParticipantId()

      await collection.insertOne({
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        college: college.trim(),
        year: isNonEmptyString(year) ? year.trim() : '',
        events,
        participantId,
        registeredAt: new Date(),
      })

      return res.status(201).json({ success: true, participantId })
    }

    if (req.method === 'GET') {
      const registrations = await collection
        .find({}, { projection: { _id: 0 } })
        .sort({ registeredAt: -1 })
        .limit(100)
        .toArray()

      return res.status(200).json(registrations)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
