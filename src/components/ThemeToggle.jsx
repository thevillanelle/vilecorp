import { useEffect, useState } from 'react'

export function useTheme() {
  const [light, setLight] = useState(() => localStorage.getItem('vile-theme') !== 'dark')
  useEffect(() => {
    if (light) {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage.setItem('vile-theme', 'light')
    } else {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      localStorage.setItem('vile-theme', 'dark')
    }
  }, [light])
  return { light, toggle: () => setLight(l => !l) }
}

export default function ThemeToggle({ light, toggle }) {
  return (
    <select
      value={light ? 'light' : 'dark'}
      onChange={e => { if ((e.target.value === 'light') !== light) toggle() }}
      aria-label="Toggle theme"
      style={{
        background: 'transparent',
        border: '1px solid var(--noir-border)',
        color: 'var(--cream-muted)',
        fontFamily: '"Courier Prime", Courier, monospace',
        fontSize: '11px',
        letterSpacing: '0.15em',
        padding: '4px 8px',
        borderRadius: '6px',
        cursor: 'pointer',
        outline: 'none',
        appearance: 'none',
        WebkitAppearance: 'none',
        paddingRight: '20px',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath d=\'M0 0l5 6 5-6z\' fill=\'%238A8075\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 6px center',
      }}
    >
      <option value="dark" style={{ background: '#111', color: '#E8E3DC' }}>DARK</option>
      <option value="light" style={{ background: '#F5F0E8', color: '#1A1510' }}>LIGHT</option>
    </select>
  )
}
