import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../components/SectionLabel'

const tabs = [
  {
    id: 'artist',
    label: 'THE ARTIST',
    body: [
      'Elle Porcher is a composer and artist based in New York City. She scored her first production in childhood — music for her mother\'s theater work. The instinct was there before the vocabulary for it was.',
      'Her debut album Distressed and Darling — in progress now — explores women who stop managing themselves down. She scores emotional architecture — the feeling underneath the image, the tension that makes a moment land.',
      'Film and television scoring is the destination. An EGOT-level legacy is the ceiling. Everything happening now — the content, the software, the cultural analysis — is infrastructure toward that.',
      'The through-line across all of it: the compositional logic. Find the signal. Name the structure. Score the feeling.',
    ],
  },
  {
    id: 'analyst',
    label: 'THE ANALYST',
    body: [
      'Elle is from New York, which means she knows fraud. She decodes desire, performance, and manipulation across pop culture and markets — from Housewives to Hindenburg, from luxury scarcity to securities fraud. It\'s all image construction. She reads the documents.',
      'She talks about fraud because she understands what people want and exactly how they\'re willing to lie to get it. She loves villains because they\'re honest about their desires.',
      'Elle\'s World is the signature series: choose a figure or theme, embody their aesthetic language, decode the psychology and power underneath it, use glam as analytical methodology. The convergence point of composer brain, theater roots, fraud analysis, fashion knowledge, and performance studies — in one frame.',
      'She is not trying to be Coffeezilla. She is building something that has never existed.',
    ],
  },
  {
    id: 'empire',
    label: 'THE EMPIRE',
    body: [
      'VILE LLC is the holding structure. Three compounding assets — content, software, music — one founder, one lane.',
      'The content is the acquisition engine. 60,000 followers and 2.6 million views across platforms, built on cultural commentary, fraud analysis, and a documented aesthetic life. The audience followed because the content is precise about desire and ruthless about performance. They stay because she\'s building something with them in it.',
      'Ritualware is the software — six apps, one database, one Ritual Profile that compounds over time. Built on the opposite assumption from most lifestyle software: that you already know who you are, and you need tools sophisticated enough to match you.',
      'The music is the destination. Distressed and Darling is in progress. Everything compounds toward it.',
      'She is not trying to be relatable. She is trying to be undeniable. She\'s on track.',
    ],
  },
]

export default function Bio() {
  const [active, setActive] = useState('artist')
  const current = tabs.find(t => t.id === active)

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <SectionLabel>PERSONNEL FILE</SectionLabel>
      <h1 className="font-display text-[clamp(48px,8vw,100px)] text-cream-DEFAULT tracking-wide mb-16">BIO</h1>

      <div className="flex flex-wrap gap-2 mb-12">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`font-mono text-xs tracking-[0.15em] px-5 py-3 border transition-colors ${
              active === t.id
                ? 'border-crimson bg-crimson text-cream-DEFAULT'
                : 'border-noir-border text-cream-muted hover:border-crimson hover:text-crimson'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
          className="max-w-3xl space-y-5">
          {current?.body?.map((para, i) => (
            <p key={i} className="font-sans text-cream-muted leading-relaxed text-lg">{para}</p>
          ))}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
