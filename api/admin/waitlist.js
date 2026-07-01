import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const token = (req.headers.authorization || '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return res.status(503).json({ error: 'Supabase service role not configured' })
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  })

  const { data, error } = await supabase
    .from('waitlist')
    .select('id, email, list, created_at')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })

  return res.json({ entries: data })
}
