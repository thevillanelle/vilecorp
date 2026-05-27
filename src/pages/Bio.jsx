import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../components/SectionLabel'

const tabs = [
  {
    id: 'artist', label: 'AS AN ARTIST',
    body: [
      'Elle Porcher is a composer, cultural analyst, and founder based in New York City. She scored her first production in childhood, writing music for her mother\'s theater work. Film and TV scoring is the destination. Everything between here and there is infrastructure.',
      'Her debut album Distressed and Darling explores women who stop managing themselves down. She scores emotional architecture — the feeling underneath the image.',
      'Her content decodes fraud, desire, and performance across pop culture and markets with the precision of someone who understands how the con works. Elle\'s World — her signature series — uses glam as analytical methodology, converging her composer brain, theater roots, fraud analysis, fashion knowledge, and performance studies into a single frame.',
      'She\'s not trying to be relatable. She\'s trying to be undeniable.',
    ],
  },
  {
    id: 'developer', label: 'AS A DEVELOPER',
    body: [
      'Five complete projects. Compliance tooling. Enterprise infrastructure. iOS. Engagement systems. Lifestyle software. Solo, concept through deployment — every time.',
      'The range is the point. A single-file training platform with no dependencies that works on any device from a closed network. A three-stage team management system that went from a static GitHub Pages prototype to a production deployment serving 100 people globally. A workout scheduling app rebuilt three times across three platforms — browser, server, native iOS — with the core logic untouched across all three rewrites. A four-build engagement arc that compounded from an event into a proposal for a summit that didn\'t exist yet. An automation layer that runs a full idea program on tools a team already had open.',
      'And the Ritualware suite — three deployed applications sharing one database, one login, and one profile. The intellectual content existed before the first line of code. The framework was the product. The code gave it a home.',
      'The through-line across all of it: design the system before you couple it to the infrastructure. The architecture gets iterated. The core logic doesn\'t.',
    ],
  },
  {
    id: 'founder', label: 'AS A FOUNDER',
    body: [
      'VILE LLC is the holding company for all of it — the music, the content, the software, the systems. One framework, many expressions. The pleasure is the point.',
      'Elle is building the intersection of cultural commentary, fraud analysis, and film scoring that doesn\'t exist yet. She\'s not trying to be Coffeezilla. She\'s not trying to be a beauty guru. She\'s Elle — and Elle\'s job is being Elle.',
    ],
  },
  {
    id: 'skills', label: 'SKILLS & KNOWLEDGE',
    isSearch: true,
  },
]

// Full skills database from portfolio work
const skillsDB = [
  // Infrastructure
  {skill:'Docker',cat:'Infrastructure',projects:['Hub Trilogy'],desc:'Multi-stage build, non-root appuser, pushed to the enterprise container registry via Rio CI/CD pipeline'},
  {skill:'Rio CI/CD',cat:'Infrastructure',projects:['Hub Trilogy'],desc:'vessel build → artifact signing → the enterprise container registry → the production platform deploy.yaml — fires on every push to main'},
  {skill:'Enterprise PaaS',cat:'Infrastructure',projects:['Hub Trilogy'],desc:'Two-region deployment (us-west-2 + us-east-1). The platform injects x-user-email and x-user-id headers on every authenticated request.'},
  {skill:'GitHub Actions',cat:'Infrastructure',projects:['Hub Trilogy','EQX Doubles','Training Hub','Engagement Arc'],desc:'CI/CD pipelines, PDF ingestion every 6 hours (Doubles), auto-deploy to GitHub Enterprise Pages (Training Hub)'},
  {skill:'GitHub Pages',cat:'Infrastructure',projects:['Hub Trilogy','Training Hub','Engagement Arc'],desc:'Stage 1 and 2 of Hub Trilogy, Apple GitHub Enterprise Pages for Training Hub (VPN-required), engagement sites'},
  {skill:'Railway',cat:'Infrastructure',projects:['EQX Doubles'],desc:'Flask server deployment via Procfile + railway.json — one-command deploy from CLI'},
  {skill:'Vercel',cat:'Infrastructure',projects:['Ritualware'],desc:'Three separate Vercel deployments sharing one Supabase backend — Ritualwear, Glow Up, Ritualwhere?'},
  {skill:'Formspree',cat:'Infrastructure',projects:['Engagement Arc'],desc:'AHA Hangout event submission — validates @apple.com email, opens pre-filled mailto entry'},
  // Backend & Data
  {skill:'Python',cat:'Data & Backend',projects:['Hub Trilogy','EQX Doubles'],desc:'FastAPI app, Pydantic models, Supabase Python SDK (Doubles Phase 2), environment variables, data structures as Python dicts'},
  {skill:'FastAPI',cat:'Data & Backend',projects:['Hub Trilogy'],desc:'All API routes with Pydantic request/response validation, async lifespan hooks for DB init, self-documenting at /docs'},
  {skill:'Pydantic',cat:'Data & Backend',projects:['Hub Trilogy'],desc:'Automatic request validation and typed contracts on every endpoint'},
  {skill:'Uvicorn',cat:'Data & Backend',projects:['Hub Trilogy'],desc:'ASGI server running FastAPI inside the Docker container'},
  {skill:'SQLite',cat:'Data & Backend',projects:['Hub Trilogy'],desc:'WAL mode for concurrent reads, seeds from JSON on first boot, persists across container restarts — right-sized for 100 users'},
  {skill:'PostgreSQL',cat:'Data & Backend',projects:['Hub Trilogy','EQX Doubles'],desc:"Full schema design in m'atelier, find_doubles() PLpgSQL stored procedure in EQX Doubles"},
  {skill:'PLpgSQL',cat:'Data & Backend',projects:['EQX Doubles'],desc:'find_doubles() — 8-parameter stored procedure. Written in Phase 1. Ran unchanged through browser, Flask server, and iOS app.'},
  {skill:'Supabase',cat:'Data & Backend',projects:['Hub Trilogy','EQX Doubles','Ritualware'],desc:'PostgreSQL + REST API + RLS — validated backend approach in m\'atelier, used across all three Doubles rewrites, shared DB for Ritualware suite'},
  {skill:'Flask',cat:'Data & Backend',projects:['EQX Doubles'],desc:'Phase 2 server: POST /api/doubles, GET /clubs, credentials off client'},
  {skill:'Jinja2',cat:'Data & Backend',projects:['EQX Doubles'],desc:'Server-side rendering — club and category dropdowns generated via {% for %} loops, no hardcoded HTML'},
  {skill:'REST API Design',cat:'Data & Backend',projects:['Hub Trilogy'],desc:'/api/employees, /api/projects, /api/audit/csv, /api/employees/{id}/standing/confirm — with role-based access tiers'},
  {skill:'Row Level Security',cat:'Data & Backend',projects:["Hub Trilogy","Ritualware"],desc:"RLS policies in Supabase — users only access their own data"},
  {skill:'Database Schema Design',cat:'Data & Backend',projects:['Hub Trilogy'],desc:'Schema derived from survey responses — team_members, projects, project_assignments, knowledge_nodes, member_knowledge junction'},
  {skill:'Database Function Design',cat:'Data & Backend',projects:['EQX Doubles'],desc:'find_doubles() in PLpgSQL — the algorithm that outlived three application rewrites'},
  {skill:'Data Modeling',cat:'Data & Backend',projects:['Hub Trilogy'],desc:'Survey responses became column names — data collected before the system was designed'},
  // Frontend
  {skill:'HTML',cat:'Frontend',projects:['Hub Trilogy','Training Hub','Engagement Arc'],desc:'All UI layers — single-file platforms, SPA onboarding sites, summit proposal'},
  {skill:'CSS',cat:'Frontend',projects:['Hub Trilogy','Training Hub','Engagement Arc'],desc:'9 CSS location themes via custom property remap, animated gradients, arcade aesthetic, CartoDB tile swap'},
  {skill:'JavaScript',cat:'Frontend',projects:['Hub Trilogy','Training Hub','Engagement Arc'],desc:'KB search engine, decision tree traversal, Fisher-Yates simulator, geography game, custom force physics engine, event questionnaire scoring'},
  {skill:'React 18',cat:'Frontend',projects:['Ritualware'],desc:'Three production Ritualware apps — Ritualwear, Glow Up, Ritualwhere? — with Vite, Tailwind, Framer Motion, React Router v6, Zustand'},
  {skill:'D3.js',cat:'Frontend',projects:['Hub Trilogy','Training Hub'],desc:"Force graph with three SVG label layers and progressive zoom reveal (>0.5 category, >1.1 full label, >3 description) in m'atelier; geography game in Training Hub"},
  {skill:'Leaflet.js',cat:'Frontend',projects:['Engagement Arc','Ritualware'],desc:'Signal Summit: 150 employee dots across 40+ cities with CartoDB tiles. Ritualwhere: 26 curated NYC/LA venues mapped with custom markers.'},
  {skill:'Canvas API',cat:'Frontend',projects:['Engagement Arc'],desc:'What We Love interest graph — 22 nodes, spring physics, no D3, raw JavaScript physics engine, drag-to-pan, scroll-to-zoom'},
  {skill:'Fuse.js',cat:'Frontend',projects:['Training Hub'],desc:'Knowledge base search with custom scoring function: title > tag > body frequency (capped per word)'},
  {skill:'localStorage',cat:'Frontend',projects:['Training Hub','Engagement Arc'],desc:'Theme/mode persistence (Training Hub), checklist progress and intake survey data (Engagement Arc)'},
  {skill:'CSS Custom Properties',cat:'Frontend',projects:['Training Hub','Engagement Arc'],desc:'9 location themes, CartoDB map tile dark/light toggle, light/dark mode system'},
  {skill:'URL Hash Routing',cat:'Frontend',projects:['Training Hub'],desc:'Single HTML file acts as multi-page app without a server or router library'},
  {skill:'IntersectionObserver',cat:'Frontend',projects:['Training Hub'],desc:'Scroll-triggered animations and visibility detection in the knowledge base'},
  {skill:'Framer Motion',cat:'Frontend',projects:['Ritualware','VILECORP'],desc:'Page transitions, entrance animations, layout animations across Ritualware and VILECORP sites'},
  {skill:'Tailwind CSS',cat:'Frontend',projects:['Ritualware','VILECORP'],desc:'Utility-first styling with CSS variable theming for light/dark mode across all three Ritualware apps and VILECORP'},
  // Mobile & Native
  {skill:'Swift',cat:'Mobile',projects:['EQX Doubles'],desc:'Phase 3 iOS — typed Codable structs, @Published reactive state, TransitHelper.swift ports haversine from JavaScript'},
  {skill:'SwiftUI',cat:'Mobile',projects:['EQX Doubles'],desc:'SearchView, ResultsView, ResultCard, ClubsView, SplashView — discrete reactive SwiftUI components'},
  {skill:'Xcode',cat:'Mobile',projects:['EQX Doubles'],desc:'Full iOS project: Models/, Services/, Views/, ViewModel/. Runs in Simulator.'},
  {skill:'async/await',cat:'Mobile',projects:['EQX Doubles'],desc:'SupabaseService.swift — all HTTP via async/await. Understanding compiled vs interpreted execution was the explicit goal of Phase 3.'},
  {skill:'MVVM',cat:'Mobile',projects:['EQX Doubles'],desc:'SearchViewModel with @Published properties drives all SwiftUI views reactively'},
  {skill:'Codable',cat:'Mobile',projects:['EQX Doubles'],desc:'Club, DoubleResult, SearchParams — typed Swift structs with automatic JSON decode from Supabase REST responses'},
  // AI & Automation
  {skill:'MCP Integration',cat:'AI & Automation',projects:['Seed Your Ideas'],desc:'Custom Enchanté agent connected to live Quip spreadsheet via MCP — reads Actions Taken history in real time'},
  {skill:'Enchanté',cat:'AI & Automation',projects:['Seed Your Ideas'],desc:'Agent instructions, constraints, tone standards, privacy rules, and operational logic written from scratch — any team member, any stage, one sentence prompt'},
  {skill:'Slack Workflow Design',cat:'AI & Automation',projects:['Seed Your Ideas'],desc:'Submission interface — name, category, idea, business impact — without leaving Slack. Auto-populates tracking spreadsheet.'},
  {skill:'Quip Automation',cat:'AI & Automation',projects:['Seed Your Ideas'],desc:'Quip-to-Slack integration — document edits (including Complete checkbox) auto-post to channel. Actions Taken is the single source of truth.'},
  {skill:'AI Agent Development',cat:'AI & Automation',projects:['Seed Your Ideas'],desc:'Full agent design: instructions, tone standards (Apple voice), privacy rules, operational logic for all four email stages'},
  {skill:'Gemini 2.5 Flash',cat:'AI & Automation',projects:['Ritualware'],desc:'Powers The Oracle in Ritualwear (outfit recommendations) and Glow Up (scorecard generation)'},
  {skill:'Zustand',cat:'AI & Automation',projects:['Ritualware'],desc:'State management across the Ritualware suite — client profile shared across three apps'},
  // Algorithms & Patterns
  {skill:'Haversine Distance',cat:'Algorithms',projects:['EQX Doubles'],desc:'buildTransitCache() — converts lat/lng between 630 club pairs to walk minutes using 1.3 route-factor and 80m/min pace'},
  {skill:'Transit Routing',cat:'Algorithms',projects:['EQX Doubles'],desc:'630 club-pair pre-computation on boot. Four types: same, walk, quick-train, extended. TIGHT badge when gap < minGap.'},
  {skill:'Fisher-Yates Shuffle',cat:'Algorithms',projects:['Training Hub'],desc:'Shuffles all 40 training scenarios on every session start — no two sessions see the same case order'},
  {skill:'Custom Scoring',cat:'Algorithms',projects:['Training Hub','Engagement Arc'],desc:'KB search (title > tag > body frequency), event questionnaire (12 blueprints weighted by category/format/budget/headcount/energy/context)'},
  {skill:'Force-directed Physics',cat:'Algorithms',projects:['Engagement Arc'],desc:'Custom spring physics engine in raw JavaScript — no D3. 22 interest nodes, spring connections, drag-to-pan, scroll-to-zoom.'},
  {skill:'Fuzzy Search',cat:'Algorithms',projects:['Training Hub','Engagement Arc'],desc:'Knowledge base live search with highlight injection; live name search in the interest graph'},
  {skill:'Geographic Profiling',cat:'Algorithms',projects:['EQX Doubles'],desc:"pickTop3() — morning pairs matched to downtown/Brooklyn, afternoon to midtown, evening to uptown. Reflects real NYC workout geography."},
  {skill:'PDF Ingestion',cat:'Algorithms',projects:['EQX Doubles'],desc:'Phase 1 GitHub Actions workflow pulls Equinox schedule PDFs every 6 hours, parses into PostgreSQL via Supabase'},
  // Identity & Security
  {skill:'Enterprise SSO SSO',cat:'Identity & Security',projects:['Hub Trilogy'],desc:'the production platform-injected authentication headers. Confirmed by building a debug endpoint and dumping live request headers in production.'},
  {skill:'enterprise user ID-based Identity',cat:'Identity & Security',projects:['Hub Trilogy'],desc:'Identity resolution chain: the enterprise user ID first (immutable), email fallback, DEV_USER_EMAIL for local dev'},
  {skill:'RBAC',cat:'Identity & Security',projects:['Hub Trilogy'],desc:'API access tiers: Public, Self, All authenticated, Admin or Project Lead, Admin only'},
  // Program & Design
  {skill:'Program Design & Evaluation',cat:'Program & Design',projects:['Seed Your Ideas','Engagement Arc'],desc:'Two-phase program delivery, zero added workload constraint, evaluation-driven redesign, four-build compounding arc'},
  {skill:'Systems Architecture',cat:'Program & Design',projects:['Seed Your Ideas','Hub Trilogy'],desc:'Trigger mapping so every automated touchpoint requires no new behaviors; interface-first → backend-second → infrastructure-last'},
  {skill:'Technical Writing',cat:'Program & Design',projects:['Seed Your Ideas'],desc:'7 documents: leader overview, investigator guide, email journey reference, setup guides, elevator pitch, Slack blast'},
  {skill:'Product Design',cat:'Program & Design',projects:['Hub Trilogy','Training Hub'],desc:'UI patterns validated before backend existed; every design detail deliberate (wrong-answer pedagogy, rotating search prompts, location themes)'},
  {skill:'Curriculum Design',cat:'Program & Design',projects:['Training Hub','Engagement Arc'],desc:'40 scenarios from procedure documents, 3 difficulty levels, wrong-answer-first pedagogy, onboarding checklist with priority tiers'},
  {skill:'Event Planning',cat:'Program & Design',projects:['Engagement Arc'],desc:'AHA Hangout: fully planned and executed virtual event with five game categories, three prize tracks, and @apple.com validation'},
  {skill:'Proposal Writing',cat:'Program & Design',projects:['Engagement Arc'],desc:'Signal Summit: 4-day format, 17-question leader FAQ, hourly employee protection framework, $15K vs $100K+ budget case'},
  {skill:'Engagement Strategy',cat:'Program & Design',projects:['Engagement Arc'],desc:'Six documented gaps (visibility, access, connection, recognition, growth, belonging). Six leader participation tiers.'},
  {skill:'Stakeholder Management',cat:'Program & Design',projects:['Seed Your Ideas'],desc:'Presented Phase 2 redesign using program data. Built cross-functional case for zero-workload-added automation layer.'},
  {skill:'Gap Analysis',cat:'Program & Design',projects:['Seed Your Ideas'],desc:'Identified through quarterly presentation monitoring: investigators submitting but never hearing back. Traced structural cause.'},
  {skill:'Leadership Handoff',cat:'Program & Design',projects:['Seed Your Ideas'],desc:'Program designed to run without its builder — any team member can run it end-to-end using shared documentation'},
  {skill:'Onboarding Design',cat:'Program & Design',projects:['Seed Your Ideas','Engagement Arc'],desc:'Enchanté setup guides for new AI users; EEC rotation training site with priority tiers and progress tracking'},
  {skill:'Communications Design',cat:'Program & Design',projects:['Seed Your Ideas'],desc:'Four email templates in Apple voice for four idea states, full email journey reference with trigger annotations'},
  {skill:'Compliance Content Authoring',cat:'Program & Design',projects:['Training Hub'],desc:'All four procedure documents summarized, 40+ glossary terms, decision matrix from CR0007, 40 training scenarios from real case patterns'},
]

const categories = [...new Set(skillsDB.map(s => s.cat))].sort()

function SkillsSearch() {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('All')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return skillsDB.filter(s => {
      const matchQuery = !q || s.skill.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q)
        || s.projects.join(' ').toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
      const matchCat = activeCat === 'All' || s.cat === activeCat
      return matchQuery && matchCat
    })
  }, [query, activeCat])

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search skills, categories, or projects…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full font-sans text-base px-5 py-4 rounded-xl border transition-colors"
          style={{
            background: 'var(--noir-card)', color: 'var(--cream)', border: '1px solid var(--noir-border)',
            outline: 'none', fontFamily: '"DM Sans", sans-serif'
          }}
        />
        {query && (
          <button onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-muted hover:text-cream-DEFAULT"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>✕</button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', ...categories].map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            className="font-mono text-xs px-3 py-1.5 rounded-full transition-colors"
            style={{
              background: activeCat === cat ? 'var(--crimson)' : 'var(--noir-elevated)',
              color: activeCat === cat ? 'var(--cream)' : 'var(--cream-muted)',
              border: '1px solid var(--noir-border)', cursor: 'pointer', fontFamily: '"Courier Prime", monospace'
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="font-mono text-xs text-cream-muted mb-6 tracking-widest">
        {filtered.length} skill{filtered.length !== 1 ? 's' : ''} {query || activeCat !== 'All' ? 'matched' : 'total'}
      </p>

      {/* Results */}
      <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
        <AnimatePresence>
          {filtered.map((s, i) => (
            <motion.div key={s.skill}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="rounded-xl p-4"
              style={{ background: 'var(--noir-elevated)', border: '1px solid var(--noir-border)' }}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <span className="font-sans text-base font-semibold" style={{ color: 'var(--cream)' }}>{s.skill}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: 'var(--crimson)', color: 'var(--cream)', opacity: 0.85, fontSize: '10px' }}>{s.cat}</span>
              </div>
              <p className="font-sans text-sm leading-relaxed mb-3" style={{ color: 'var(--cream-muted)' }}>{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.projects.map(p => (
                  <span key={p} className="font-mono text-xs px-2 py-0.5 rounded-sm"
                    style={{ background: 'rgba(196,30,58,0.12)', color: 'var(--crimson)', fontSize: '10px' }}>
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="font-serif italic text-cream-muted text-center py-12">No skills matched. Try a different search.</p>
        )}
      </div>
    </div>
  )
}

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

      {current?.isSearch ? (
        <motion.div key="skills" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <SkillsSearch />
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
            className="max-w-3xl space-y-5">
            {current?.body?.map((para, i) => (
              <p key={i} className="font-sans text-cream-muted leading-relaxed text-lg">{para}</p>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  )
}
