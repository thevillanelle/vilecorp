import { useState, useEffect, useCallback } from 'react'
import SectionLabel from '../components/SectionLabel'

const SESSION_KEY = 'vile_admin_token'

function formatDate(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_KEY) || '')
  const [input, setInput] = useState('')
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState('')

  const fetchData = useCallback(async (t) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/waitlist', {
        headers: { Authorization: `Bearer ${t}` },
      })
      if (res.status === 401) {
        setError('Wrong password.')
        sessionStorage.removeItem(SESSION_KEY)
        setToken('')
        return
      }
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setEntries(json.entries)
      sessionStorage.setItem(SESSION_KEY, t)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) fetchData(token)
  }, [])

  function handleLogin(e) {
    e.preventDefault()
    if (!input.trim()) return
    setToken(input.trim())
    fetchData(input.trim())
  }

  function copyEmails(list) {
    const emails = (entries || [])
      .filter(e => !list || e.list === list)
      .map(e => e.email)
      .join(', ')
    navigator.clipboard.writeText(emails)
    setCopied(list || 'all')
    setTimeout(() => setCopied(''), 2000)
  }

  if (!token || error === 'Wrong password.') {
    return (
      <main className="pt-32 pb-24 px-6 max-w-lg mx-auto">
        <SectionLabel>ADMIN</SectionLabel>
        <h1 className="font-display text-5xl text-cream-DEFAULT tracking-wide mb-12">WAITLIST</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="password"
            autoFocus
            className="w-full font-mono text-sm px-4 py-3 bg-noir-elevated border border-noir-border text-cream-DEFAULT focus:outline-none focus:border-crimson transition-colors"
          />
          {error && <p className="font-mono text-xs text-crimson">{error}</p>}
          <button
            type="submit"
            className="font-mono text-xs tracking-widest px-6 py-3 bg-crimson text-cream-DEFAULT hover:bg-crimson-dark transition-colors"
          >
            ENTER →
          </button>
        </form>
      </main>
    )
  }

  const lists = entries
    ? [...new Set(entries.map(e => e.list))].sort()
    : []

  return (
    <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <SectionLabel>ADMIN</SectionLabel>
      <div className="flex items-end justify-between mb-12">
        <h1 className="font-display text-5xl text-cream-DEFAULT tracking-wide">WAITLIST</h1>
        <div className="flex items-center gap-6">
          {!loading && entries && (
            <p className="font-mono text-xs text-cream-muted">
              {entries.length} total
            </p>
          )}
          <button
            onClick={() => fetchData(token)}
            className="font-mono text-xs text-cream-muted hover:text-crimson transition-colors tracking-widest"
          >
            ↻ REFRESH
          </button>
          <button
            onClick={() => { sessionStorage.removeItem(SESSION_KEY); setToken(''); setEntries(null) }}
            className="font-mono text-xs text-cream-muted hover:text-crimson transition-colors tracking-widest"
          >
            SIGN OUT
          </button>
        </div>
      </div>

      {loading && (
        <p className="font-mono text-xs text-cream-muted">Loading...</p>
      )}

      {error && !loading && (
        <p className="font-mono text-xs text-crimson">{error}</p>
      )}

      {entries && !loading && lists.map(list => {
        const group = entries.filter(e => e.list === list)
        return (
          <section key={list} className="mb-12">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-noir-border">
              <div className="flex items-center gap-4">
                <p className="font-mono text-xs tracking-widest text-gold-DEFAULT uppercase">{list}</p>
                <span className="font-mono text-xs text-cream-muted">{group.length}</span>
              </div>
              <button
                onClick={() => copyEmails(list)}
                className="font-mono text-xs tracking-widest text-cream-muted hover:text-crimson transition-colors"
              >
                {copied === list ? '✓ COPIED' : 'COPY EMAILS'}
              </button>
            </div>
            <div className="space-y-px">
              {group.map(entry => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between px-4 py-3 bg-noir-elevated border border-noir-border hover:border-crimson/30 transition-colors"
                >
                  <span className="font-mono text-sm text-cream-DEFAULT">{entry.email}</span>
                  <span className="font-mono text-xs text-cream-muted">{formatDate(entry.created_at)}</span>
                </div>
              ))}
            </div>
          </section>
        )
      })}

      {entries && !loading && entries.length === 0 && (
        <p className="font-serif italic text-cream-muted">No signups yet.</p>
      )}
    </main>
  )
}
