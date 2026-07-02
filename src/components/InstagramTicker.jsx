import { useState, useEffect } from 'react'
import { INSTAGRAM_FEED_URL } from '../config/products'

export default function InstagramTicker({ limit = 12 }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(INSTAGRAM_FEED_URL)
      .then(res => res.json())
      .then(data => setPosts((data.posts || []).slice(0, limit)))
      .catch(() => {})
  }, [limit])

  if (!posts.length) return null

  const band = [...posts, ...posts]

  return (
    <div style={{
      overflow: 'hidden',
      marginBottom: '3rem',
    }}>
      <style>{`
        @keyframes insta-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{
        display: 'flex',
        gap: '4px',
        width: 'max-content',
        animation: 'insta-scroll 28s linear infinite',
      }}>
        {band.map((post, i) => (
          <a
            key={`${post.id}-${i}`}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '156px',
              height: '156px',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <img
              src={post.sizes?.medium?.mediaUrl || post.mediaUrl}
              alt={post.caption?.slice(0, 80) || ''}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  )
}
