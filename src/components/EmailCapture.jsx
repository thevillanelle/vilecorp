import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function EmailCapture({
  list = 'general',
  label = 'Join the list',
  placeholder = 'your@email.com',
  cta = 'I\'m in',
  successMessage = 'You\'re on the list.',
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    setErrorMsg('')

    if (!supabase) {
      setStatus('error')
      setErrorMsg('Email capture is not configured yet.')
      return
    }

    const { error } = await supabase
      .from('waitlist')
      .insert({ email: email.trim().toLowerCase(), list })

    if (error) {
      if (error.code === '23505') {
        setStatus('success') // duplicate email — treat as success silently
      } else {
        setStatus('error')
        setErrorMsg('Something went wrong. Try again.')
      }
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-3">
        <p className="font-serif italic text-lg" style={{ color: 'var(--crimson)' }}>{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <p className="font-mono text-xs tracking-[0.2em] text-cream-muted mb-4 uppercase">{label}</p>
      <div className="flex gap-3 flex-col sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === 'loading'}
          className="flex-1 font-sans text-sm px-4 py-3 border transition-colors bg-transparent focus:outline-none"
          style={{
            background: 'var(--noir-elevated)',
            color: 'var(--cream)',
            border: '1px solid var(--noir-border)',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--crimson)' }}
          onBlur={e => { e.target.style.borderColor = 'var(--noir-border)' }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="font-mono text-xs tracking-widest px-6 py-3 transition-colors whitespace-nowrap"
          style={{
            background: 'var(--crimson)',
            color: 'var(--cream)',
            border: '1px solid var(--crimson)',
            cursor: status === 'loading' ? 'wait' : 'pointer',
          }}
        >
          {status === 'loading' ? '...' : cta}
        </button>
      </div>
      {errorMsg && (
        <p className="font-mono text-xs mt-2" style={{ color: 'var(--crimson-light)' }}>{errorMsg}</p>
      )}
    </form>
  )
}
