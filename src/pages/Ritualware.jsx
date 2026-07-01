import { motion } from 'framer-motion'

const apps = [
  {
    title: 'Ritualwear',
    question: 'What do I wear?',
    desc: 'Your style system. A Style Bible built once, applied every day. The Oracle reads your rules and tells you exactly what to wear today.',
    domain: 'wear.ritualware.app',
    url: 'https://wear.ritualware.app',
    color: 'text-gold-DEFAULT',
    borderColor: 'border-gold-DEFAULT',
    features: [
      'The Style Bible — built once, applied every day. Builds your color season, your silhouette rules, and the things you\'ll never wear again',
      'The Oracle — reads your rules and tells you exactly what to wear, head to toe, with live weather and a mood board pulled to match',
      'My Looks — every Oracle result, saved, favorited, ready to repeat',
      'Inspo Upload — drop in a photo, the Oracle reads the palette and silhouette and folds it back into your rules',
    ],
  },
  {
    title: 'Glow Up',
    question: 'How do I look?',
    desc: 'A complete audit across twelve categories of your beauty life. Not a checklist. A scorecard with a plan you can use tomorrow morning.',
    domain: 'glowup.ritualware.app',
    url: 'https://glowup.ritualware.app',
    color: 'text-crimson',
    borderColor: 'border-crimson',
    features: [
      'The Glow Up Audit — skin, sleep, nutrition, fitness, hair, fragrance and more, scored, with quick wins and a real plan',
      'Style Finder — three doors in: Clueless, Rebrand, or Makeover. Each ends in a named archetype, the truth, and your blind spots',
      'Client Profile — your Style Finder result and your Glow Up scorecard, together',
    ],
  },
  {
    title: 'Ritualwhere?',
    question: 'Where do I go?',
    desc: 'A city guide built for how you actually live. Neighborhood matching with scored reasons. Curated venues by how you want to feel. NYC and LA.',
    domain: 'where.ritualware.app',
    url: 'https://where.ritualware.app',
    color: 'text-cream-muted',
    borderColor: 'border-cream-muted',
    features: [
      'Neighborhood Finder — matches you to where you\'d actually thrive, NYC or LA, with the reasoning shown',
      'Third Space Finder + The Map — venues curated by what you need, pinned to a custom map',
      'Burnout Audit — names your burnout type, severity, and what to do about it',
      'Quarterly Reinvention — a season-by-season plan for what\'s next',
      'Dating Profile Builder — your goal, your type, your pattern, and the one rule to stop breaking',
      "The Guide — Elle's Guide to Thriving in NYC, chapter by chapter, each linked to the tool that goes with it",
    ],
  },
  {
    title: "m'atelier",
    question: 'What am I building?',
    desc: 'Your personal studio. Projects, goals, skills, circle. The part of your life that is about building, tracked in one place.',
    domain: 'studio.ritualware.app',
    url: 'https://studio.ritualware.app',
    color: 'text-gold-muted',
    borderColor: 'border-gold-muted',
    features: [
      'Projects — every active build, tracked by status, with tasks, links, and notes attached',
      'My Circle — your people: their role in your work, the skills they bring, how to reach them',
      'Skills — what you\'re learning, what you\'ve mastered, tracked honestly by level',
      'Goals — time-boxed, categorized, checked off',
    ],
  },
  {
    title: 'Ritualwealth',
    question: 'When do I retire?',
    desc: 'A FIRE planning suite built for women who want out on their own terms. Five quizzes. One number. A complete plan for financial independence.',
    domain: 'wealth.ritualware.app',
    url: 'https://wealth.ritualware.app',
    color: 'text-crimson-light',
    borderColor: 'border-crimson-light',
    features: [
      'Five quizzes — Fire Type, Career, Home, Creative Income, Risk. Each narrows your actual FIRE number and the portfolio to match',
      'The Plan — every quiz synthesized into one roadmap: your number, your age, your monthly surplus',
      'Debt Payoff + Milestones — real dates. When you\'re debt-free, when the emergency fund is full, when the down payment is ready',
    ],
  },
  {
    title: 'Robin',
    question: 'Who am I becoming?',
    desc: 'Your Ritual Profile. Every answer you have ever given across the suite in one place. One picture of who you are right now.',
    domain: 'robin.ritualware.app',
    url: 'https://robin.ritualware.app',
    color: 'text-gold-dim',
    borderColor: 'border-gold-dim',
    features: [
      'Your Dashboard — every result from every app: your style and saved looks, your glow tier, your neighborhood, your FIRE number, your active projects',
      'Your Ritual Profile — everything the suite knows about you, written as a single piece in Elle\'s own voice. Not a list of stats. A read.',
    ],
  },
]

const standaloneTools = [
  {
    title: 'ATLAS',
    question: "What's happening in the world?",
    domain: 'atlas.ritualware.app',
    url: 'https://atlas.ritualware.app',
    desc: 'A live global intelligence feed on a 3D globe. Breaking news, conflicts, disasters, markets, launches, and the night sky, all in one place.',
  },
  {
    title: "Sal's Library",
    question: 'What should I read next?',
    domain: 'library.ritualware.app',
    url: 'https://library.ritualware.app',
    desc: "A private system for logging what you've actually read, rating it honestly, and knowing what's next. Ratings, reviews, want list, series tracking, head-to-head matchups, and a smart next-read engine.",
  },
  {
    title: 'EQX Doubles',
    question: 'Where do I work out?',
    domain: 'thevillanelle.github.io/eqx-doubles',
    url: 'https://thevillanelle.github.io/eqx-doubles/index.html',
    desc: 'Two classes that actually work together. Matched by type, timed for real travel, across all 36 NYC Equinox locations. For Equinox members — no login required.',
  },
]

export default function Ritualware() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <h1 className="font-display text-[clamp(48px,8vw,100px)] text-cream-DEFAULT tracking-wide mb-4">RITUALWARE</h1>
      <p className="font-serif italic text-xl text-cream-muted max-w-3xl mb-6">
        Every answer. One place.
      </p>
      <a href="https://ritualware.app" target="_blank" rel="noopener noreferrer"
        className="inline-block font-mono text-xs tracking-widest px-6 py-3 mb-10 transition-colors"
        style={{ background: 'var(--crimson)', color: 'var(--cream)' }}>
        VISIT RITUALWARE.APP →
      </a>
      <p className="font-sans text-cream-muted max-w-3xl mb-16 leading-relaxed">
        Ritualware is the software company behind the suite — apps built for the life you're designing on purpose. Six apps share one Ritual Profile that compounds over time. Three more are their own worlds entirely.
      </p>

      {/* The six connected apps */}
      <div className="space-y-6 mb-10">
        {apps.map((app, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className={`bg-noir-elevated border-l-2 ${app.borderColor} p-8 rounded-sm`}>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="font-serif italic text-lg text-cream-muted mb-1">{app.question}</p>
                <h3 className={`font-display text-3xl tracking-wide mb-2 ${app.color}`}>{app.title}</h3>
                <p className="font-sans text-sm text-cream-muted leading-relaxed mb-3">{app.desc}</p>
                <a href={app.url} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs text-cream-muted hover:text-crimson transition-colors">
                  {app.domain} →
                </a>
              </div>
              <div className="md:col-span-2">
                <ul className="space-y-2">
                  {app.features.map((f, j) => (
                    <li key={j} className="flex gap-3 font-sans text-sm text-cream-muted leading-relaxed">
                      <span className="text-crimson shrink-0 mt-0.5">—</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Standalone tools */}
      <div className="mb-16">
        <p className="font-mono text-xs text-gold-muted tracking-widest mb-4 mt-10">ALSO FROM VILE LLC · STANDALONE</p>
        <div className="space-y-4">
          {standaloneTools.map((tool, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-noir-card border border-noir-border p-8 rounded-sm">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="font-serif italic text-lg text-cream-muted mb-1">{tool.question}</p>
                  <h3 className="font-display text-3xl tracking-wide mb-2 text-cream-DEFAULT">{tool.title}</h3>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-xs text-cream-muted hover:text-crimson transition-colors">
                    {tool.domain} →
                  </a>
                </div>
                <div className="md:col-span-2 flex items-center">
                  <p className="font-sans text-sm text-cream-muted leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </main>
  )
}
