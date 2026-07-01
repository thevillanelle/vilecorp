import { useState } from 'react'
import { supabase } from '../lib/supabase'

const FUN_QUESTIONS = [
  'What\'s your favorite season?',
  'What\'s your go-to drink?',
  'What\'s your favorite cannabis strain?',
  'Song that gets you out on the dance floor?',
  'Favorite venue in the city?',
  'Favorite color?',
]

const inputStyle = {
  background: 'var(--noir-elevated)',
  color: 'var(--cream)',
  border: '1px solid var(--noir-border)',
}

function Field({ type = 'text', value, onChange, placeholder, required, disabled }) {
  return (
    <input
      type={type}
      required={required}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full font-sans text-sm px-4 py-3 focus:outline-none"
      style={inputStyle}
      onFocus={e => { e.target.style.borderColor = 'var(--crimson)' }}
      onBlur={e => { e.target.style.borderColor = 'var(--noir-border)' }}
    />
  )
}

export default function GirlsNightOutForm() {
  const [fields, setFields] = useState({
    first_name: '',
    last_name: '',
    email: '',
    fun_question: '',
    fun_answer: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(key) {
    return val => setFields(f => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!fields.fun_question) return

    setStatus('loading')
    setErrorMsg('')

    if (!supabase) {
      setStatus('error')
      setErrorMsg('Not configured yet.')
      return
    }

    const { error } = await supabase.from('waitlist').insert({
      email: fields.email.trim().toLowerCase(),
      list: 'girls-night-out',
      first_name: fields.first_name.trim(),
      last_name: fields.last_name.trim(),
      fun_question: fields.fun_question,
      fun_answer: fields.fun_answer.trim(),
    })

    if (error) {
      if (error.code === '23505') {
        setStatus('success')
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
        <p className="font-serif italic text-lg" style={{ color: 'var(--crimson)' }}>
          You're on the list.
        </p>
      </div>
    )
  }

  const loading = status === 'loading'

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <p className="font-mono text-xs tracking-[0.2em] text-cream-muted mb-4 uppercase">
        Girls' Night Out — Join the Waitlist
      </p>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Field
            value={fields.first_name}
            onChange={set('first_name')}
            placeholder="First name (preferred)"
            required
            disabled={loading}
          />
          <Field
            value={fields.last_name}
            onChange={set('last_name')}
            placeholder="Last name (preferred)"
            required
            disabled={loading}
          />
        </div>

        <Field
          type="email"
          value={fields.email}
          onChange={set('email')}
          placeholder="your@email.com"
          required
          disabled={loading}
        />

        <select
          required
          value={fields.fun_question}
          onChange={e => setFields(f => ({ ...f, fun_question: e.target.value, fun_answer: '' }))}
          disabled={loading}
          className="w-full font-sans text-sm px-4 py-3 focus:outline-none"
          style={{
            ...inputStyle,
            color: fields.fun_question ? 'var(--cream)' : 'var(--cream-muted)',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--crimson)' }}
          onBlur={e => { e.target.style.borderColor = 'var(--noir-border)' }}
        >
          <option value="" disabled>Pick a question to answer...</option>
          {FUN_QUESTIONS.map(q => (
            <option key={q} value={q} style={{ background: 'var(--noir-elevated)', color: 'var(--cream)' }}>
              {q}
            </option>
          ))}
        </select>

        {fields.fun_question && (
          <Field
            value={fields.fun_answer}
            onChange={set('fun_answer')}
            placeholder="Your answer..."
            required
            disabled={loading}
          />
        )}

        <button
          type="submit"
          disabled={loading || !fields.fun_question}
          className="font-mono text-xs tracking-widest px-6 py-3 transition-colors"
          style={{
            background: 'var(--crimson)',
            color: 'var(--cream)',
            border: '1px solid var(--crimson)',
            cursor: loading ? 'wait' : 'pointer',
            opacity: !fields.fun_question ? 0.5 : 1,
          }}
        >
          {loading ? '...' : "I'm in"}
        </button>
      </div>

      {errorMsg && (
        <p className="font-mono text-xs mt-2" style={{ color: 'var(--crimson-light)' }}>{errorMsg}</p>
      )}
    </form>
  )
}
