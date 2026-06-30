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
      'Style Bible — 32 questions with branching logic, lesson modals, and progress by section',
      'The Oracle — AI outfit in 9 labeled sections (silhouette → weather swap) with live weather and Pexels mood board',
      'My Looks — saved Oracle results with favorite/unfavorite and expandable sections',
      'Inspo Upload — Gemini Vision reads images and extracts palette, silhouette, vibe words; offers to add to Style Bible',
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
      'Glow Up Audit — 42 questions across 12 sections (skin, sleep, nutrition, fitness, hair, face, body, teeth, fragrance, services, fashion, mindset) generating section scores, verdicts, quick wins, a week-1 plan, a month-1 plan, and non-negotiables',
      'Style Finder — three paths, 15 questions each: Clueless (you have style, you just can\'t name it), Rebrand (what\'s changing, who you\'re becoming), and Makeover (the Glow Up Pyramid as framework). Each outputs a named archetype, the truth, blind spots, and immediate moves',
      'Client Profile — aggregated view of your Style Finder result and Glow Up scorecard',
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
      'Neighborhood Finder — 14 questions (NYC) / 13 questions (LA, tuned to the 405 divide, parking, Eastside vs Westside). Rule-based scoring + AI narrative toggle',
      'Third Space Finder — 80+ venues across NYC and LA filtered by goal (focus, social, movement, rest)',
      'The Map — Leaflet.js dark map; venues colored by category; city toggle switches NYC/LA; custom pin support; "Open in Maps" on every venue',
      'Burnout Audit — 8 questions diagnosing social, mental, or physical burnout type, severity, and whether it\'s chronic, with a recovery protocol',
      'Quarterly Reinvention — 8 questions across aesthetic, social habits, and skill acquisition with rule-based moves and an AI 90-day plan toggle',
      'Dating Profile Builder — 8 questions mapping your dating goal, dominant type, attachment pattern, and main strategy, with a cardinal rule and a personalized strategy framework',
      "The Guide — Elle Porcher's Guide to Thriving in NYC encoded chapter by chapter, each section linking to its tool",
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
      'Five FIRE quizzes — Fire Type, Career Path, Home Plan, Creative Income, and Risk Profile — each 7–8 questions, each scoring you into a named archetype with a real number: Lean ($750k), Regular ($1.25M), Fat ($2.5M), Barista ($600k), or Coast ($400k) FIRE, plus a recommended portfolio allocation',
      'The Plan — every quiz synthesized into one narrative roadmap: your target number, target age, monthly surplus, and recommended allocation, written in prose',
      'Debt Payoff Calculator — live payoff timeline, total interest, and exact payoff date from your balance, payment, and rate',
      'Milestone Timeline — dated projections for debt-free, emergency-fund-complete, and down-payment-ready, calculated from your real income and expenses',
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
      'Projects — CRUD with status badges (active, planning, wrap, complete, cancelled), expandable task lists, link, end date, notes',
      'My Circle — people with free-text role (not a dropdown), skills tags, notes, color-coded initials avatar',
      'Skills — tracked by category and level (Learning / Familiar / Proficient / Expert), updatable inline',
      'Goals — with category, timeframe, description, completion toggle, stat summary',
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
      'Do the Dash — an adaptive quiz (12 core questions, 8 optional deep-dive questions) that learns what you\'re actually optimizing for and ranks your dashboard accordingly',
      'Your Dashboard — every result from every app, pulled into one view: style type and saved looks from Ritualwear, glow tier and archetype from Glow Up, neighborhood and burnout status from Ritualwhere, FIRE number and savings progress from Ritualwealth, active projects and goals from m\'atelier',
      'The home of the Ritual Profile — the full picture of who you are right now, reordered to put what matters most to you first',
    ],
  },
]

const standalone = {
  title: 'EQX Doubles',
  question: 'Where do I work out?',
  domain: 'thevillanelle.github.io/eqx-doubles',
  url: 'https://thevillanelle.github.io/eqx-doubles/index.html',
  description: 'Two classes that actually work together. Matched by type, timed for real travel, across all 36 NYC Equinox locations. For Equinox members — no login required, not part of the Ritual Profile suite.',
  features: [
    'Search any two class categories across all 36 NYC clubs, by day and time window',
    'Real travel time between studios, not just a straight-line guess — accounts for walkability and transit',
    'Club amenities (pool, steam room, towel service) and nearest subway lines with MTA color badges, per location',
    'Class schedule synced nightly from official Equinox data',
    'Shipped three ways: the original web app, a Python/Flask rewrite, and a native Swift/SwiftUI iOS app — same backend, three platforms',
  ],
}

export default function Ritualware() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <SectionLabel>PLATFORM</SectionLabel>
      <h1 className="font-display text-[clamp(48px,8vw,100px)] text-cream-DEFAULT tracking-wide mb-4">RITUALWARE</h1>
      <p className="font-serif italic text-xl text-cream-muted max-w-3xl mb-6">
        Six interconnected applications. One Supabase backend. One Google OAuth login. One cross-app profile.
      </p>
      <p className="font-sans text-cream-muted max-w-3xl mb-16 leading-relaxed">
        Ritualware is a lifestyle platform built on the personal frameworks of Elle Porcher. Each app answers a different question about how to live intentionally. Every answer accumulates in the Ritual Profile, surfaced through Robin — a cross-app view of who you are across hundreds of questions, exportable as markdown or sent to Gemini for a prose synthesis.
      </p>

      {/* The six apps */}
      <div className="space-y-6 mb-16">
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
        <p className="font-mono text-xs text-gold-muted tracking-widest mb-4">STANDALONE TOOLS · INDEPENDENT WORLDS</p>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-noir-card border border-noir-border p-8 rounded-sm">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="font-serif italic text-lg text-cream-muted mb-1">{standalone.question}</p>
              <h3 className="font-display text-3xl tracking-wide mb-1 text-cream-DEFAULT">{standalone.title}</h3>
              <p className="font-mono text-xs text-cream-muted mb-3">{standalone.domain}</p>
              <a href={standalone.url} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-cream-muted hover:text-cream-DEFAULT transition-colors">
                {standalone.domain} →
              </a>
              <p className="font-sans text-xs text-cream-muted mt-4 leading-relaxed">{standalone.description}</p>
            </div>
            <div className="md:col-span-2">
              <ul className="space-y-2">
                {standalone.features.map((f, j) => (
                  <li key={j} className="flex gap-3 font-sans text-sm text-cream-muted leading-relaxed">
                    <span className="text-cream-muted shrink-0 mt-0.5">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Architecture */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-noir-card border border-noir-border p-8 rounded-sm">
          <p className="font-mono text-xs text-gold-muted tracking-widest mb-4">DATA ARCHITECTURE</p>
          <div className="font-mono text-sm text-cream-muted space-y-1 leading-relaxed">
            <p className="text-cream-DEFAULT font-semibold mb-3">One Supabase project · 50 tables</p>
            {['style_profiles', 'style_rules', 'oracle_results', 'saved_looks', 'style_finder_results',
              'glow_up_results', 'neighborhood_results', 'burnout_results', 'reinvention_results',
              'dating_profiles', 'inspo_images', 'user_locations', 'atelier_projects', 'atelier_circle',
              'atelier_skills', 'atelier_goals', 'user_fire_plans', 'fire_quiz_results', 'ritual_profiles',
              'robin_dashboard_config'].map(t => (
              <p key={t} className="text-xs">{t}</p>
            ))}
            <p className="text-xs text-cream-muted/70 mt-1">+ 30 more, including a social/gamification layer (friendships, groups, badges, points)</p>
          </div>
          <p className="font-sans text-xs text-cream-muted mt-4">Row-Level Security on every table. Every user only ever sees their own data.</p>
        </div>
        <div className="bg-noir-card border border-noir-border p-8 rounded-sm">
          <p className="font-mono text-xs text-gold-muted tracking-widest mb-4">BY THE NUMBERS</p>
          <div className="space-y-4">
            {[
              ['Suite apps', '6'],
              ['Standalone tools', '1'],
              ['Supabase tables', '50'],
              ['Total quiz questions', '~230'],
              ['Cities', 'New York · Los Angeles'],
              ['AI model', 'Gemini 2.5 Flash'],
              ['Auth', 'Google OAuth + email/password'],
              ['Maps', 'Leaflet.js + CartoDB dark tiles'],
              ['Infrastructure', 'Vercel (6 deployments) · GitHub (6 repos)'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-noir-border pb-3">
                <span className="font-mono text-xs text-cream-muted">{k}</span>
                <span className="font-sans text-sm text-cream-DEFAULT">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key design decisions */}
      <div className="bg-noir-card border border-noir-border p-8 rounded-sm mb-16">
        <p className="font-mono text-xs text-gold-muted tracking-widest mb-6">KEY DESIGN DECISIONS</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'AI-optional, not AI-mandatory', body: 'Every feature has a rule-based default. AI adds a narrative layer when the user wants it. The apps work without hitting the AI API, load instantly, and don\'t fail silently.' },
            { title: 'Granularity as a differentiator', body: 'Not 5 questions — 32. Not a slider — 42 questions with 12 subcategories. The depth of the questions IS the product differentiation.' },
            { title: 'One profile, six apps', body: 'The first quiz populates 32 answers. Add Glow Up and Ritualwhere and you\'re past 150. Each app makes the profile richer. Robin — the Ritual Profile — is the payoff of every quiz.' },
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
