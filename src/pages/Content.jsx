import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel'
import InstagramFeed from '../components/InstagramFeed'

// ── Add real YouTube video IDs here to populate previews ──
// Thumbnail URL: https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg
const youtubeVideos = [
  { id: '2pTGvJgBNq4', title: null, series: null },
  { id: 'fdKEyU-YgEk', title: null, series: null },
  { id: null, title: null, series: null },
]

const tiktokPosts = [
  { url: 'https://www.tiktok.com/t/ZTShuGftv/' },
  { url: 'https://www.tiktok.com/t/ZTShDqdqw/' },
  { url: 'https://www.tiktok.com/t/ZTShUSSwt/' },
  { url: 'https://www.tiktok.com/t/ZTShUB9yY/' },
  { url: 'https://www.tiktok.com/t/ZTShUMgpe/' },
  { url: 'https://www.tiktok.com/t/ZTShUreh6/' },
  { url: 'https://www.tiktok.com/t/ZTShUkLbE/' },
  { url: 'https://www.tiktok.com/t/ZTShUAAKv/' },
]

function TikTokCard({ post, index }) {
  const [thumb, setThumb] = useState(null)

  useEffect(() => {
    fetch(`/api/tiktok-oembed?url=${encodeURIComponent(post.url)}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.thumbnail_url) setThumb(data.thumbnail_url) })
      .catch(() => {})
  }, [post.url])

  return (
    <motion.a href={post.url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.06 }}
      className="block group bg-noir-elevated border border-noir-border rounded-sm overflow-hidden">
      <div className="aspect-[9/16] bg-noir-card flex items-center justify-center relative overflow-hidden">
        {thumb
          ? <img src={thumb} alt="TikTok" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <div className="w-12 h-12 rounded-full border border-[#69C9D0]/30 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: '#69C9D0' }}>
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
        }
        <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/30 transition-colors" />
      </div>
      <div className="p-3">
        <p className="font-mono text-xs tracking-widest" style={{ color: '#69C9D0' }}>WATCH →</p>
      </div>
    </motion.a>
  )
}

function YouTubeCard({ video, index }) {
  const thumb = video.id
    ? `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
    : null

  return (
    <motion.a
      href={video.id ? `https://youtube.com/watch?v=${video.id}` : 'https://youtube.com/@elleporcher'}
      target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.08 }}
      className="block group">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-noir-card border border-noir-border rounded-sm overflow-hidden mb-3">
        {thumb
          ? <img src={thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
          : <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border border-crimson/40 flex items-center justify-center mx-auto mb-2">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-crimson">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="font-mono text-xs text-cream-muted">Coming soon</p>
              </div>
            </div>
        }
        <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/20 transition-colors"/>
      </div>
      <p className="font-mono text-xs text-crimson tracking-widest mb-1">{video.series}</p>
      <p className="font-sans text-sm text-cream-DEFAULT group-hover:text-cream-muted transition-colors">{video.title}</p>
    </motion.a>
  )
}

export default function Content() {
  const [tiktokExpanded, setTiktokExpanded] = useState(false)
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <SectionLabel>CONTENT</SectionLabel>
      <h1 className="font-display text-[clamp(48px,8vw,100px)] text-cream-DEFAULT tracking-wide mb-16">THE WORK</h1>

      {/* YouTube — Long Form */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8 border-b border-noir-border pb-4">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: '#FF0000' }}>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <h2 className="font-display text-2xl text-cream-DEFAULT tracking-wider">YOUTUBE</h2>
          </div>
          <a href="https://youtube.com/@elleporcher" target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-cream-muted hover:text-crimson transition-colors tracking-widest">
            @elleporcher →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {youtubeVideos.map((v, i) => <YouTubeCard key={i} video={v} index={i} />)}
        </div>
      </section>

      {/* TikTok — Short Form */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8 border-b border-noir-border pb-4">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: '#69C9D0' }}>
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/>
            </svg>
            <h2 className="font-display text-2xl text-cream-DEFAULT tracking-wider">TIKTOK</h2>
          </div>
          <a href="https://tiktok.com/@elleporcher" target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-cream-muted hover:text-crimson transition-colors tracking-widest">
            @elleporcher →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiktokPosts.slice(0, 4).map((post, i) => (
            <TikTokCard key={post.url} post={post} index={i} />
          ))}
        </div>
        {tiktokExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {tiktokPosts.slice(4).map((post, i) => (
              <TikTokCard key={post.url} post={post} index={i} />
            ))}
          </motion.div>
        )}
        <button
          onClick={() => setTiktokExpanded(v => !v)}
          className="mt-6 font-mono text-xs tracking-widest transition-colors"
          style={{ color: '#69C9D0' }}>
          {tiktokExpanded ? '— SHOW LESS' : '+ SEE MORE'}
        </button>
      </section>

      {/* Instagram */}
      <section>
        <div className="flex items-center justify-between mb-8 border-b border-noir-border pb-4">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: '#E1306C' }}>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <h2 className="font-display text-2xl text-cream-DEFAULT tracking-wider">INSTAGRAM</h2>
          </div>
          <a href="https://instagram.com/villanelle.jpg" target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-cream-muted hover:text-crimson transition-colors tracking-widest">
            @villanelle.jpg →
          </a>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-4">
          <InstagramFeed limit={6} columns={3} />
        </motion.div>
        <a href="https://instagram.com/villanelle.jpg" target="_blank" rel="noopener noreferrer"
          className="font-mono text-xs text-cream-muted hover:text-crimson transition-colors tracking-widest">
          VIEW @villanelle.jpg →
        </a>
      </section>
    </main>
  )
}
