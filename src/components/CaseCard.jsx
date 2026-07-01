import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CaseCard({ number, title, summary, expanded, tags }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-[#161616] border-t-2 border-crimson rounded-sm p-6 card-hover cursor-pointer"
      onClick={() => setOpen(!open)}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="font-mono text-xs text-gold tracking-widest">{number}</span>
        <span className="font-mono text-xs text-[#8A8075]">{open ? '- CLOSE' : '+ EXPAND FILE'}</span>
      </div>
      <h3 className="font-display text-2xl text-[#E8E3DC] tracking-wide mb-2">{title}</h3>
      <p className="text-[#8A8075] text-sm leading-relaxed mb-4">{summary}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(t => (
          <span key={t} className="bg-crimson/20 text-crimson font-mono text-xs px-2 py-0.5 rounded-sm">{t}</span>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[#2A2520] mt-4 pt-4 text-[#8A8075] text-sm leading-relaxed space-y-3">
            {expanded}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
