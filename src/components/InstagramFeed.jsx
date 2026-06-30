import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { INSTAGRAM_FEED_URL } from '../config/products'

export default function InstagramFeed({ limit = 6, columns = 3 }) {
  const [posts, setPosts] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(INSTAGRAM_FEED_URL)
      .then(res => res.json())
      .then(data => { if (!cancelled) setPosts((data.posts || []).slice(0, limit)) })
      .catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true }
  }, [limit])

  const gridCols = columns === 3 ? 'grid-cols-3' : 'grid-cols-2'

  if (failed || (posts && posts.length === 0)) return null

  return (
    <div className={`grid ${gridCols} gap-1`}>
      {(posts ?? Array.from({ length: limit })).map((post, i) => (
        <a
          key={post?.id ?? i}
          href={post?.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-square block overflow-hidden bg-noir-elevated border border-noir-border group"
          style={!post ? { pointerEvents: 'none' } : undefined}
        >
          {post && (
            <>
              <motion.img
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                src={post.sizes?.medium?.mediaUrl || post.mediaUrl}
                alt={post.caption?.slice(0, 80) || 'Instagram post'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85), transparent 60%)' }}
              >
                <p className="font-sans text-xs text-cream leading-snug line-clamp-3">{post.caption}</p>
              </div>
            </>
          )}
        </a>
      ))}
    </div>
  )
}
