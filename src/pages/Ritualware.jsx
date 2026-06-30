import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel'

const apps = [
  {
    title: 'Ritualwear',
    question: 'What do I wear?',
    domain: 'wear.ritualware.app',
    url: 'https://ritualware.app/ritualwear',
    color: 'text-gold-DEFAULT',
    borderColor: 'border-gold-DEFAULT',
    features: [
      'The Style Bible — built once, applied every day. Branching questions with lesson modals along the way, building your color season, your silhouette rules, and the things you\'ll never wear again',
      'The Oracle — reads your rules and tells you exactly what to wear, head to toe, with live weather and a mood board pulled to match',
      'My Looks — every Oracle result, saved, favorited, ready to repeat',
      'Inspo Upload — drop in a photo, the Oracle reads the palette and silhouette and folds it back into your rules',
    ],
  },
  {
    title: 'Glow Up',
    question: 'How do I look?',
    domain: 'glowup.ritualware.app',
    url: 'https://ritualware.app/glowup',
    color: 'text-crimson',
    borderColor: 'border-crimson',
    features: [
      'The Glow Up Audit — not a checklist, a scorecard. Skin, sleep, nutrition, fitness, hair, fragrance and more, scored, with quick wins and a plan you can use tomorrow morning',
      'Style Finder — three different doors in: Clueless (you have a sense of style, you just can\'t name it), Rebrand (you know exactly what\'s changing), or Makeover (starting from the Glow Up Pyramid itself). Each ends in a named archetype, the truth, and your blind spots',
      'Client Profile — your Style Finder result and your Glow Up scorecard, together',
    ],
  },
  {
    title: 'Ritualwhere?',
    question: 'Where do I go?',
    domain: 'where.ritualware.app',
    url: 'https://ritualware.app/ritualwhere',
    color: 'text-cream-muted',
    borderColor: 'border-cream-muted',
    features: [
      'Neighborhood Finder — matches you to where you\'d actually thrive, NYC or LA, with the reasoning shown, not just a name',
      'Third Space Finder + The Map — venues curated by what you need (focus, social, movement, rest), pinned to a dark, custom map',
      'Burnout Audit — names your burnout type, how severe it is, whether it\'s chronic, and what to do about it',
      'Quarterly Reinvention — a season-by-season plan for what\'s next',
      'Dating Profile Builder — your dating goal, your type, your pattern, and the one rule to stop breaking',
      "The Guide — Elle's own Guide to Thriving in NYC, chapter by chapter, each one linked straight to the tool that goes with it",
    ],
  },
  {
    title: 'Ritualwealth',
    question: 'When do I retire?',
    domain: 'wealth.ritualware.app',
    url: 'https://ritualware.app/ritualwealth',
    color: 'text-crimson-light',
    borderColor: 'border-crimson-light',
    features: [
      'A handful of quizzes, one number — Fire Type, Career, Home, Creative Income, Risk. Each one narrows your actual FIRE number, from Coast to Fat, and the portfolio to match',
      'The Plan — every quiz synthesized into one roadmap, written in plain language: your number, your age, your monthly surplus',
      'Debt Payoff + Milestones — real dates, not vibes. When you\'re debt-free, when the emergency fund is full, when the down payment is ready',
    ],
  },
  {
    title: "m'atelier",
    question: 'What am I building?',
    domain: 'studio.ritualware.app',
    url: 'https://ritualware.app/matelier',
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
    title: 'Robin',
    question: 'Who am I becoming?',
    domain: 'robin.ritualware.app',
    url: 'https://ritualware.app/robin',
    color: 'text-gold-dim',
    borderColor: 'border-gold-dim',
    features: [
      'Do the Dash — a short quiz that learns what you\'re actually optimizing for, then reorders your dashboard so the right thing is always on top',
      'Your Dashboard — every result from every app, in one place: your style and saved looks, your glow tier, your neighborhood and burnout status, your FIRE number, your active projects',
      'Your Ritual Profile — the centerpiece. A full case study assembled from everything the apps know about you, then sent to the Oracle for a written narrative back — exportable as markdown. Reachable from Ritualwear, Ritualwhere, or Ritualwealth at /profile',
    ],
  },
]

const standaloneTools = [
  {
    title: 'ATLAS',
    question: "What's happening in the world?",
    domain: 'atlas.ritualware.app',
    url: 'https://atlas.ritualware.app',
    description: 'The world is always moving. ATLAS puts all of it on a globe, live, right now — breaking news, conflicts, disasters, markets, launches, and the night sky, pinned to where they\'re actually happening.',
    features: [
      'Live feeds across news, conflicts, disasters, markets, launches, and astronomy, with planets and stars in real orbital position and the day/night line moving as it actually does outside',
      'Connect any two events to find what links them, or travel back to any date and place',
      'Save events, build watchlists, get alerts',
    ],
  },
  {
    title: "Sal's Library",
    question: 'What should I read next?',
    domain: 'library.ritualware.app',
    url: 'https://library.ritualware.app',
    description: 'Not a social reading app, not a bestseller list. A private system for logging what you\'ve actually read, rating it honestly, and knowing what\'s next.',
    features: [
      'A full library with ratings, reviews, read dates, a want list, and series tracking',
      'Head-to-head matchups to settle your own rankings',
      'A next-read engine that knows the difference between a book you finished and a book you loved',
    ],
  },
  {
    title: 'EQX Doubles',
    question: 'Where do I work out?',
    domain: 'thevillanelle.github.io/eqx-doubles',
    url: 'https://thevillanelle.github.io/eqx-doubles/index.html',
    description: 'Two classes that actually work together. Matched by type, timed for real travel, across all 36 NYC Equinox locations. For Equinox members — no login required.',
    features: [
      'Search any two class categories by day and time window, across every NYC club',
      'Real travel time between studios — accounts for walkability and transit, not a straight-line guess',
      'Club amenities and nearest subway lines, per location, synced nightly from official Equinox data',
      'Shipped three ways: the original web app, a Python/Flask rewrite, and a native Swift/SwiftUI iOS app — same backend, three platforms',
    ],
  },
]

export default function Ritualware() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <SectionLabel>PLATFORM</SectionLabel>
      <h1 className="font-display text-[clamp(48px,8vw,100px)] text-cream-DEFAULT tracking-wide mb-4">RITUALWARE</h1>
      <p className="font-serif italic text-xl text-cream-muted max-w-3xl mb-6">
        Apps built for the life you're designing on purpose.
      </p>
      <p className="font-sans text-cream-muted max-w-3xl mb-16 leading-relaxed">
        Six of these apps share one login and one Ritual Profile — everything you do in one writes into the next, and Robin assembles the whole picture. Three more stand entirely on their own, no shared profile required.
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
                <h3 className={`font-display text-3xl tracking-wide mb-1 ${app.color}`}>{app.title}</h3>
                <p className="font-mono text-xs text-cream-muted mb-3">{app.domain}</p>
                <a href={app.url} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs text-cream-muted hover:text-cream-DEFAULT transition-colors">
                  {app.url.replace('https://', '')} →
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
        <p className="font-mono text-xs text-gold-muted tracking-widest mb-4 mt-10">STANDALONE TOOLS · INDEPENDENT WORLDS</p>
        <div className="space-y-4">
          {standaloneTools.map((tool, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-noir-card border border-noir-border p-8 rounded-sm">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="font-serif italic text-lg text-cream-muted mb-1">{tool.question}</p>
                  <h3 className="font-display text-3xl tracking-wide mb-1 text-cream-DEFAULT">{tool.title}</h3>
                  <p className="font-mono text-xs text-cream-muted mb-3">{tool.domain}</p>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-xs text-cream-muted hover:text-cream-DEFAULT transition-colors">
                    {tool.domain} →
                  </a>
                  <p className="font-sans text-xs text-cream-muted mt-4 leading-relaxed">{tool.description}</p>
                </div>
                <div className="md:col-span-2">
                  <ul className="space-y-2">
                    {tool.features.map((f, j) => (
                      <li key={j} className="flex gap-3 font-sans text-sm text-cream-muted leading-relaxed">
                        <span className="text-cream-muted shrink-0 mt-0.5">—</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key design decisions */}
      <div className="bg-noir-card border border-noir-border p-8 rounded-sm mb-16">
        <p className="font-mono text-xs text-gold-muted tracking-widest mb-6">KEY DESIGN DECISIONS</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'AI-optional, not AI-mandatory', body: 'Every feature has a rule-based default. AI adds a narrative layer when the user wants it. The apps work without hitting the AI API, load instantly, and don\'t fail silently.' },
            { title: 'Granularity as a differentiator', body: 'These aren\'t 3-question vibe checks. The depth of the questions is the product — it\'s what makes the output feel true instead of generic.' },
            { title: 'One profile, every app', body: 'The first quiz starts your Ritual Profile. Every app after that adds to it. Robin assembles the whole picture — and the Oracle can write it back to you in prose.' },
            { title: 'Source material is intellectual property', body: 'Every question in the Style Bible reflects Elle Porcher\'s personal style framework. The Glow Up Pyramid is her hierarchy. The NYC guide is her document. The content is original.' },
          ].map((item, i) => (
            <div key={i} className="bg-noir-elevated p-5 rounded-sm">
              <h4 className="font-display text-lg text-cream-DEFAULT mb-2">{item.title}</h4>
              <p className="font-sans text-sm text-cream-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-domain auth note */}
      <div className="bg-noir-elevated border border-noir-border p-8 rounded-sm mb-16">
        <p className="font-mono text-xs text-gold-muted tracking-widest mb-4">TECHNICAL: CROSS-DOMAIN AUTH</p>
        <p className="font-sans text-sm text-cream-muted leading-relaxed">
          Sessions stored in localStorage don't cross subdomains. Solution: pass <code className="bg-noir-card px-1 rounded text-crimson">access_token</code> and <code className="bg-noir-card px-1 rounded text-crimson">refresh_token</code> in the URL hash when navigating between apps. The receiving app reads them on init via <code className="bg-noir-card px-1 rounded text-crimson">supabase.auth.setSession()</code> and cleans the URL.
        </p>
      </div>

      <a href="https://ritualware.app" target="_blank" rel="noopener noreferrer"
        className="inline-block bg-crimson hover:bg-crimson-dark text-cream-DEFAULT font-mono text-sm tracking-widest px-8 py-4 transition-colors">
        VISIT RITUALWARE.APP →
      </a>
    </main>
  )
}
