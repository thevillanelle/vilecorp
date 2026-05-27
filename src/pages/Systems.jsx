import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../components/SectionLabel'

const cases = [
  {
    number: '01',
    title: 'THE INTELLIGENCE HUB',
    subtitle: 'A team management system built in three stages — from a spreadsheet to a production deployment serving 100 people across global locations.',
    tags: ['Python', 'FastAPI', 'Pydantic', 'SQLite', 'Uvicorn', 'Docker', 'D3.js', 'TopoJSON', 'Supabase', 'PostgreSQL', 'Enterprise SSO', 'Enterprise PaaS', 'Rio CI/CD', 'Enterprise Identity', 'RBAC', 'GitHub Pages', 'GitHub Actions'],
    summary: 'Three builds. One through-line. The spreadsheet was the schema. The public site was the interface lab. The Supabase build was the backend proof of concept. The production deployment was the capstone. The three versions are not iterations of the same project — they are the process: figure out how to build it, prove the backend works, then ship the real thing.',
    sections: [
      {
        heading: 'Background',
        body: `When the a global compliance team expanded from 13 people to 100 globally, the coordination infrastructure didn't scale with it. There was no central view of what projects were active, who was working on them, or what the team's collective skills looked like. Leads couldn't answer basic questions: who has capacity right now? Who knows how to do X? What are we actually working on?

The starting point was a spreadsheet. A form went out to the full team asking for their skills, expertise, hobbies, and current work. The responses became the bones of the data model — the same fields that ended up as columns in the final database schema. The data existed before the system did.

A rotation onto the engagement team created the time and space to actually build it.`
      },
      {
        heading: 'Stage 1 — Team Intelligence Hub',
        link: 'thevillanelle.github.io/team-intelligence-hub',
        body: `The first build was the learning build. No server, no database, no external dependencies — just a single HTML file with data embedded as JavaScript objects, deployed via GitHub Pages.

The goal wasn't to ship a product. It was to answer the question: what does this actually need to do, and how do I build it? This is where the core UI patterns were worked out — project cards, profile cards with traffic-light availability indicators, skills search, D3.js force graph for team connections. A PIN-gated admin layer stood in for real authentication. All data was hardcoded and static.

Building this version first was a deliberate choice. Getting the interface right in the cheapest possible environment — no backend to maintain, no deployment pipeline to debug — meant that by the time a real backend was needed, the product logic was already settled.

Stack: HTML/CSS/JS · D3.js · GitHub Pages · GitHub Actions`
      },
      {
        heading: "Stage 2 — m'atelier Studio",
        link: 'thevillanelle.github.io/studio',
        body: `The second build was the proof of concept for the backend. The domain shifted — team management scaled down to personal project and life management — but the architecture question was the same: can this system persist real data, sync across devices, and handle writes without running a server?

Supabase provided the answer. PostgreSQL + a REST API + Row Level Security policies, zero infrastructure to manage.

Schema designed from scratch:
· team_members — work_skills[], non_work[], hobbies[], private_note
· projects — task_1/2/3, volunteer_need, contact_id FK
· project_assignments — role_label
· knowledge_nodes — category, weight (1–5 foundational scale)
· member_knowledge — junction table

The fetch calls in the frontend mapped almost 1:1 to what the FastAPI layer would later do in production. Once Supabase was working — reads, writes, RLS policies, real persistence — the backend approach was validated.

This version also introduced the knowledge mind map: a D3 force graph spanning Web Dev, Data Viz, Infrastructure, AI Tools, Design, Strategy, Security, Finance, and Blockchain. Nodes are linked by hardcoded semantic relationships layered with auto-generated connections derived from keyword overlap between node descriptions. Labels appear progressively as you zoom in — category tags at scale > 0.5, full labels at > 1.1, description snippets at > 3. Three separate SVG text layers managed independently.

Stack: HTML/CSS/JS · D3.js · Supabase (PostgreSQL) · GitHub Pages`
      },
      {
        heading: 'Stage 3 — Skills Hub (Production)',
        link: 'thevillanelle.github.io/team-intelligence-hub',
        body: `With the interface proven and the backend approach validated, the production system came together with a clear target. Real authentication, real persistence, real deployment, real users.

System architecture:
  Browser (HTML/CSS/JS + D3.js)
  ↓ HTTPS
  The enterprise PaaS — injects x-user-email + x-user-id headers
  ↓
  FastAPI (Python 3.12, Uvicorn ASGI)
  ↓
  SQLite (WAL mode) ← seeded from employee JSON on first boot

Why FastAPI: Pydantic models gave automatic request validation and typed request/response contracts. Async lifespan hooks handled DB initialization cleanly. Self-documenting API at no extra cost.

Why SQLite with WAL mode: At 100 users with read-heavy patterns, a managed database would have been overengineered. Write-Ahead Logging handled concurrency safely. The database seeds itself from JSON files on first boot and persists across container restarts. Choosing not to use a managed database was the right call for this scale.

Identity resolution: The platform injects x-user-email and x-user-id headers on every authenticated request. Which headers the platform actually injects required building a debug endpoint and dumping live request headers in production to confirm. The final implementation checks the enterprise user ID first (immutable, more reliable), falls back to email, falls back to a local dev fallback for local development.

Deployment: the CI/CD pipeline is defined — vessel build, artifact signing, push to the enterprise container registry, then deploy to the platform via deploy.yaml. Fires on every push to main. Two-region deployment (us-west-2 and us-east-1) with traffic-based autoscaling. The Dockerfile uses a multi-stage build with a non-root appuser — a platform requirement and a container security best practice.`
      },
      {
        heading: 'API Surface',
        body: `ENDPOINT                          METHOD              ACCESS
/api/health                       GET                 Public (health probe)
/api/me                           GET                 Self
/api/whoami                       GET                 All authenticated
/api/employees                    GET                 All (privacy-filtered for non-admins)
/api/employees                    POST/PATCH/DELETE   Admin
/api/employees/{id}               GET/PATCH/DELETE    Admin
/api/employees/me/profile         GET/POST/PATCH      Self
/api/employees/{id}/standing      PATCH               Admin or Project Lead
/api/employees/{id}/standing/confirm POST             Admin or Project Lead
/api/projects                     GET/POST/PATCH/DELETE All authenticated
/api/projects/{id}/team           GET                 All authenticated
/api/audit                        GET                 All authenticated
/api/audit/csv                    GET                 Admin`
      },
      {
        heading: 'The Standing System',
        body: `The availability traffic light on each profile card is a live calculation based on project count — green (available), yellow (active), red (at capacity). It updates automatically as project assignments change and answers one question: what is this person's current bandwidth?

Standing is a separate mechanism, physically displayed under the traffic light on each card. It answers a different question: has this person been reviewed by their lead recently?

Every 90 days, all standing values automatically flip to red. On sign-in, team leads see an alert for their direct reports and confirm each one, resetting standing to green with a timestamp. Leads can also manually flag someone red at any time with a required written note.

The organizational logic: the 90-day trigger is a forcing function, not a reminder. Confirmation is required, not optional. The timestamp is stored, making the review history auditable.

A /api/audit/csv endpoint generates a real-time export of all 100 team members with standing, review timestamp, standing note, manager, and active project assignments — replacing a manual spreadsheet process entirely.

An earlier version of this system ran two separate cycles: a 90-day eligibility reset and a 60-day standing review. Identifying that redundancy and collapsing it into one coherent system — one mechanism, one cycle, two surfaces — was a design improvement shipped during active development.`
      },
      {
        heading: 'What the Three Builds Demonstrate Together',
        body: `The spreadsheet was the schema. The public site was the interface lab. The Supabase build was the backend proof of concept. The production deployment was the capstone. Each build had a specific job, and each one informed the next.

The final system works because the design was figured out before the hard infrastructure constraints were introduced — not despite working backwards from them.

The same core logic runs across all three: project tracking, skills directory, team availability, knowledge visualization. What changes between deployments is persistence (none / Supabase / SQLite), authentication (PIN / none / Enterprise SSO), and scale (personal / portfolio / 100-person enterprise). The application layer stayed stable because it was designed before it was coupled to any specific infrastructure.

Skills: Python · FastAPI · Pydantic · SQLite · Uvicorn · HTML · CSS · JavaScript · D3.js · TopoJSON · REST API design · Docker · Enterprise CI/CD · Enterprise PaaS deployment · Enterprise SSO · enterprise identity · RBAC · PostgreSQL · Supabase · GitHub Pages · GitHub Actions · Database schema design · Data modeling · Product design · Program management

Outcome: Production system live on enterprise internal infrastructure, two-region deployment, 100 users. Full audit and standing confirmation system replacing manual spreadsheet processes. Public portfolio version with zero external dependencies, accessible from any network. Supabase-backed personal version validating the PostgreSQL approach that informed the production design. End-to-end: concept, data collection, design, development, and deployment — solo.`
      }
    ]
  },
  {
    number: '02',
    title: 'RISK TRAINING ACADEMY',
    subtitle: 'Full training platform — knowledge base, decision matrix, scored simulator, and geography game. Single HTML file, zero dependencies.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Fuse.js', 'D3.js', 'Custom Scoring', 'Fisher-Yates', 'GitHub Actions', 'GitHub Pages'],
    summary: 'The team had no searchable knowledge base, no interactive decision tool, and no training simulator. This built all three — plus a standalone geography training game — with zero backend, zero build step, and zero dependencies. The entire platform is a single index.html — 2,700+ lines of pure HTML, CSS, and JavaScript.',
    sections: [
      {
        heading: 'Background',
        body: `The a global investigations team works a high-stakes queue: sanctions screening across multiple clients (multiple enterprise clients), four case types, dozens of edge cases, and procedure documents scattered across a Confluence-style internal site with broken deep links and a Cross-Origin security header that blocks direct navigation.

New investigators had to learn the system by reading dense procedure docs in isolation, with no way to practice before hitting a live queue. The tools existed. The training infrastructure didn't. The knowledge base didn't. The gap between "read the procedure" and "work a case confidently" was the problem to solve.

What this replaced:
· No searchable knowledge base — investigators navigated scattered PDFs and a hard-to-search internal Confluence site
· No interactive decision tool — the official decisioning matrix was a static reference table
· No training simulator — new investigators learned from reading, not doing
· No geography training — an acknowledged gap in how investigators learn to handle international scripts, names, and locations`
      },
      {
        heading: 'The Codex — Knowledge Base',
        body: `A fully searchable reference system covering all four compliance procedure documents, a 40+ term glossary, and reference guides — organized by client, document type (Original summaries vs. Tech Edits), and category. Live fuzzy search with keyword highlighting. Sidebar filtering by enterprise clients, Pending, and Reference. Expandable cards with full content on click.

The search implementation is hand-rolled: a scoring function that weights title matches highest, then tag matches, then body frequency (capped per word to prevent long documents from dominating). Results render live on input with a 180ms debounce and an animated searching indicator. Highlight injection marks matched terms in results. The full KB array — 1,000+ lines of compliance content — is embedded directly in the file as a JavaScript array, making the tool work on any device on VPN with no API calls.

The internal compliance site uses a Cross-Origin-Opener-Policy header that blocks direct external navigation — clicking a link from anywhere outside the site opens a blank page. The workaround: every relevant card includes a "📋 Copy source URL" button that copies the deep link to clipboard. Users paste it in a fresh tab. The behavior was identified, documented, explained in the User Guide, and routed around without requiring any server-side changes.

A rotating slideshow on the KB landing screen cycles through 25 key compliance terms as search prompts — clickable, auto-advancing at 3.5-second intervals, with dot navigation and keyboard support. The goal: make the KB feel alive and prompt discovery rather than waiting for someone to know what to search for.`
      },
      {
        heading: 'The Oracle — Decision Matrix',
        body: `An interactive step-by-step decision tree for all four case types: With PII, Client C Without PII, Companies, and Batch Free Developer. Investigators answer branching questions — entity type, name match, DOB, location — and receive the correct action (Clear, Escalate, or Suspend), the exact reason code, a plain-English explanation, and a full breadcrumb trail of their decision path. A progress bar tracks position through each tree.

Built from the official decisioning matrix reference document (CR0007) plus procedural context from four client procedure docs. The matrix logic was written to match the source documents exactly — including edge cases like China company naming, the full street address override, and the "previously suspended" batch_free_developer scenario.

The Decision Matrix trees are plain JavaScript objects — each node either has branching options or a result. Traversal is a simple recursive function. Adding a new matrix type requires one new object in TREES.`
      },
      {
        heading: 'The Trials — Training Simulator',
        body: `A scored training game with 40 scenarios across three difficulty levels — Initiate, Investigator, and Olympian. Each scenario presents a realistic compliance case: screened entity name, location, PII status, matched data hits, client and event type. Investigators choose the correct action from four options and receive immediate feedback explaining the reasoning whether they answered correctly or not.

Scenarios are drawn directly from procedure document patterns — DBA cases, China naming conventions, 2/3 name matches, YOB shortcuts, expired PII, previously suspended companies, ownership percentages, full address match overrides, deceased-date-only cases, and the gibberish/scripted account pattern.

Wrong answers are treated as the most educational outcome: every incorrect answer shows the full correct reasoning before advancing.

The game tracks score, lives (3 per session), rank progression (Trainee through Lead Investigator), case count, and streak — with a +50 bonus at 3+ consecutive correct answers. Scenarios shuffle on each session start using Fisher-Yates, ensuring no two sessions have the same case order.

Difficulty design:
· Initiate (13 scenarios): clear variances, single-factor decisions, entity type mismatches, false positives
· Investigator (13 scenarios): China naming conventions, 2/3 name match with MZ account age, expired PII, AKA traps, YOB shortcuts
· Olympian (14 scenarios): full address match exception, ownership percentages, previously suspended companies, the deceased-date-only escalation, system notes traps, the gibberish flag, the Iran connection override`
      },
      {
        heading: 'Where in the World? — Geography Training Game',
        body: `A standalone geography and language identification game deployed as a separate HTML file (geography-game.html). Four modes, 135 questions:

· Script Intel — identify writing systems from examples, including compliance-critical cases like 조선 (North Korea) and ایران (Iran)
· Country Decoder — identify countries from native-language names, including all three sanctioned countries
· Name Origins — identify geographic origin of names: Zhang Wei, José, Reza (Iranian), Nguyễn, Giuseppe
· Sanctioned or Safe? — 39 questions covering all three sanctioned countries, all five Ukrainian sanctioned regions, and real city-level address scenarios

Compliance-critical questions are flagged with red badges and worth 150 points. The game is opinionated: the questions that matter most on the job are worth more, harder to miss, and visually distinct. The rationale: an investigator who can't recognize that ایران is "Iran" in Persian script, or that Reza is a Persian name, is more likely to miss a true match. Geography training is compliance training.`
      },
      {
        heading: 'Location Themes + Tools Page',
        body: `The nav bar includes a location dropdown offering 9 distinct visual themes — one for each office where the team operates: Austin, Elk Grove, San Diego, Arizona, Raleigh, Boston, New York, Singapore, and a default Global theme. Each theme remaps the full CSS custom property set and adds location-specific visual signatures: brick patterns for Boston, a neon grid for Singapore, a lone-star watermark for Austin, a sunset radial for San Diego. A light/dark toggle is also present and both settings persist in localStorage.

The themes weren't cosmetic afterthought. A global compliance team working the same tool from nine offices with different local aesthetics means team ownership. Investigators in Singapore and Raleigh see the same product built for them specifically.

The Tools page houses corrected date conversion utilities for Japanese imperial era dates and Taiwanese ROC calendar dates — both used in compliance work when reviewing international identity documents. The Japanese converter corrects an identified error in the official Job Aids page: the Shōwa era formula shown on the Job Aids site is off by one year. The correction (Shōwa Year 1 = 1926, not 1927) is documented, sourced (JACAR archives), and flagged with a visible warning banner. The error was identified by an investigator in production; the correction was shipped here while the official Job Aids team was notified.`
      },
      {
        heading: 'Live',
        link: 'thevillanelle.github.io/risk-training-academy',
        body: `The sanitized public version of the platform is live. The knowledge base, decision matrix, training simulator, and geography game are all accessible. The geography game with compliance-critical flagging is embedded directly in the platform.`
      },
      {
        heading: 'Outcome',
        body: `40 compliance training scenarios across 3 difficulty levels, drawn directly from source procedure documents. 135-question geography training game with compliance-critical flagging. Interactive decision matrix for all 4 case types with branching logic and reason code output. Searchable knowledge base with 40+ glossary terms. Corrected date conversion tools with documented bug fix and source citation. 9 location-specific visual themes covering every office. Zero external dependencies, zero backend, zero build infrastructure — deployed as a single file.`
      }
    ]
  },
  {
    number: '03',
    title: 'EQX DOUBLES FINDER',
    subtitle: 'A workout pairing tool for Equinox members across New York\'s 36-location network — three complete platform rewrites, one core algorithm that survived them all.',
    tags: ['PostgreSQL', 'PLpgSQL', 'Supabase', 'JavaScript', 'Python', 'Flask', 'Jinja2', 'Swift', 'SwiftUI', 'Xcode', 'GitHub Actions', 'Railway', 'REST API', 'MVVM', 'Async/Await', 'Haversine', 'MTA Transit Data'],
    summary: 'A personal problem built to production across three iterations. The database layer was designed once and survived all three rewrites. Every architectural decision was driven by a concrete limitation encountered in production. The project was not planned in three phases — it was iterated into them.',
    sections: [
      {
        heading: 'Background',
        body: `As a daily Equinox member and certified personal trainer, optimizing a workout is not abstract — it is a daily decision. Booking back-to-back classes across New York's Equinox network is genuinely complex: which two classes pair well by type, do the times actually work, is the second location walkable or a 40-minute subway ride, which clubs have a pool or steam room.

The network spans 36 locations across Manhattan and Brooklyn. No tool existed to answer these questions together. The mental overhead was real and recurring, so the tool got built.`
      },
      {
        heading: 'Phase 1 — The SPA',
        body: `The first version pulled class schedule PDFs directly from Equinox's public site and cached the data client-side. That was the original data pipeline — and it was slow. The fix was adding a Supabase backend to store and serve the schedule data, replacing the PDF cache with a live database query. The "⚡ Live DB" badge in the header is a direct marker of that transition.

The app runs entirely in the browser. The Supabase JavaScript SDK is loaded via CDN and called client-side — the browser queries the database directly, results render. The core pairing logic lives in a PostgreSQL stored procedure called find_doubles(), invoked via db.rpc(). It takes eight parameters: the array of selected club IDs, the day of week (computed from the date picker as a string like MONDAY), two category values, a max gap in minutes, a pair order constraint (either, 1first, or 2first), and a time window expressed as minutes-since-midnight for both the start and end bounds.

The club and category data: The app covers 36 NYC locations with precise lat/lng coordinates, organized into four borough zones (downtown, midtown, uptown, Brooklyn) and eleven named neighborhoods matching Equinox's own groupings — from FiDi and Tribeca up through the Upper East Side and out to Williamsburg. Each club also carries a CLUB_LINES entry listing its nearest NYC subway lines, used by the transit router.

The class category system is the most opinionated part of the data model. Rather than matching class names exactly, each category entry carries a kw keyword array that find_doubles() uses to match against class names in the database. The taxonomy has seven groups — Barre, Pilates, Sculpt and Strength, Cardio, Yoga and Mind-Body, Aquatics, and Wildcard — with 23 specific options. The Sculpt and Strength group alone resolves against over 30 different class name variants, from metcon and tabata to ropes and rowers, forza, vipr sculpt, and firestarter. Cycling resolves beats ride, rhythm ride, anthem ride, pursuit, precision ride, endurance ride. Boxing resolves rounds: boxing, rounds: kickboxing, rounds: bags, rounds: pro, rounds: mitts, cardio kickboxing, knockout, powerstrike, shadow-do, muay thai, and zen combat.`
      },
      {
        heading: 'Phase 1 — Transit Routing + Boot Behavior',
        body: `Transit routing is entirely client-side and pre-computed on boot. buildTransitCache() runs at init time and calculates the transit relationship between every pair of clubs — 36 × 35 / 2 = 630 pairs — storing results in TRANSIT_CACHE keyed by "aId-bId". Four transit types: same (same gym, zero gap needed), walk (haversine distance converted to walk minutes using a 1.3 route-factor and 80m/min pace, flagged if ≤15 minutes), quick-train (shared subway line exists between clubs and distance is under 4km), and extended (transfer required or distance over 4km). Each type carries a minGap — the minimum realistic gap needed to actually make the commute. The TIGHT flag fires when a pair's gap_minutes is less than the transit's minGap. Tight pairs still render but get a ⚡ TIGHT badge so the user knows the timing is aggressive.

Results sort by transit tier first (same → walk → quick-train → extended), then tight status, then gap, then start time, with tier divider labels between groups.

Transit routes render with NYC subway line badges using the MTA's official color assignments: A/C/E in blue, B/D/F/M in orange, 1/2/3 in red, 4/5/6 in green, 7 in purple, N/Q/R/W in yellow with black text, J/Z in brown, L in gray. A direct route shows the shared line badges. A transfer route shows the departure lines, a transfer node, and the arrival lines.

Boot behavior: The app doesn't open to an empty state. On load, two things run in parallel: the splash screen displays for a minimum of 2,800ms, and loadTomorrowPreview() fires a Supabase RPC call for all 36 clubs, any/any categories, 45-minute max gap, all day — a full scan of tomorrow's schedule. When both resolve, the splash fades and the top three pairs for tomorrow render automatically.

pickTop3() selects those three pairs using a geographic profiling algorithm: morning pairs that start before noon get matched to downtown or Brooklyn clubs, afternoon pairs (noon to 5pm) to midtown clubs, evening pairs to uptown clubs. If a profile slot has no match, it falls back to time bucket ranking. The result is a curated landing screen that reflects real New York workout geography rather than just the earliest or fastest pairs.

Time-of-day presets: eight preset buttons — Early Morning (5–9am), Late Morning (9am–noon), Early Afternoon (noon–3pm), Late Afternoon (3–6pm), Evening (6–9pm), Night (9pm–11pm), Any Time, and a Custom option that reveals start/end time inputs. Presets translate to minutes-since-midnight internally and pass directly as p_win_start and p_win_end to the RPC.

Design: black background, lime green (#c8f23a) accent, Helvetica Neue, all-caps label system with wide letter-spacing throughout. Full light/dark toggle with data-theme attribute and localStorage persistence — light mode uses #5d8a00 for the lime accent to maintain contrast. Full mobile responsive layout: the sidebar collapses into a slide-up bottom drawer triggered by a fixed FAB, with a scrim overlay and drag handle.`
      },
      {
        heading: 'Phase 2 — The Python Rewrite',
        body: `Supabase improved on the PDF cache but the data pipeline problem wasn't fully solved. Python is better for scraping, so the rewrite moved to Flask.

Flask now sits between the browser and Supabase. The browser's fetch() calls the Flask server at /api/doubles with JSON search parameters. Flask receives them, calls Supabase via the Python SDK, and sends results back as JSON. A second route, GET /clubs, serves the club directory page.

The HTML itself is now rendered server-side. The CLUBS list and CATEGORIES data that were JavaScript objects in Phase 1 are now Python lists of dicts in app.py, passed into Jinja2 templates at request time. The club location checkboxes and class type dropdowns are generated with {% for club in clubs %} loops rather than hardcoded markup. The interactive behavior — fetching results from /api/doubles, rendering pair cards, transit routing — is still JavaScript running in the browser, carrying over from Phase 1.

Project structure: app.py holds all routes, data definitions, and app entry point; supabase_client.py is a one-file module that creates and exports the shared Supabase client, reading credentials from environment variables with fallback defaults; requirements.txt lists three dependencies (flask, supabase, python-dotenv); templates/index.html is the Jinja2 template. A Procfile and railway.json handle Railway deployment.

The README doubles as a written explainer of Python fundamentals and the interpreted vs. compiled distinction — the rewrite was also explicitly a learning exercise.

find_doubles() is unchanged. Same function, same parameters, same results — now called from Python via the Supabase Python SDK instead of JavaScript via the CDN client.`
      },
      {
        heading: 'Phase 3 — The iOS App',
        body: `The third version is a native iPhone app. The decision to rewrite was not just about platform — it was about understanding the full-stack difference between interpreted and compiled languages, a theme that runs explicitly through the Phase 2 README.

The architecture is consistent: the iOS app calls the same Supabase backend and invokes the same find_doubles() function via Supabase's REST API. What changed is everything about how the code executes.

The project is layered cleanly:
· Models/ — Club, DoubleResult, SearchParams as typed Swift structs with Codable for automatic JSON decoding
· Services/ — SupabaseService.swift handles all HTTP via async/await
· Views/ — SearchView, ResultsView, ResultCard, ClubsView, SplashView as discrete SwiftUI components
· ViewModel — SearchViewModel holds all state with @Published properties, driving the UI reactively

TransitHelper.swift ports the haversine distance calculation and subway line routing from the JavaScript version into Swift, surfacing the same transit type classifications and nearest subway lines per club location.

The app runs in the iOS Simulator via Xcode. Distribution to real devices or the App Store requires an a developer account.`
      },
      {
        heading: 'The Through-Line',
        body: `find_doubles() was written once, in PLpgSQL, in Phase 1. It ran in Phase 2 behind a Flask server. It runs in Phase 3 behind a SwiftUI app. Three complete rewrites of the presentation and infrastructure layer, zero rewrites of the core logic. The algorithm lives where the data lives, and the application layer is replaceable.

Every architectural decision was driven by a concrete limitation: PDF caching was slow, so Supabase was added. Supabase helped but the scraping problem remained, so the rewrite moved to Python and Flask because Python is the right tool for scraping. Web constraints and a desire to understand compiled languages led to Swift. The project was not planned in three phases. It was iterated into them.

Outcome: Working app across three platforms — browser SPA, Python web app, and native iOS. 36 NYC Equinox locations mapped with lat/lng, neighborhood groupings, and subway line data. 23-category class taxonomy with keyword arrays resolving 100+ Equinox class name variants. Client-side transit router pre-computing 630 club-pair relationships on boot with MTA subway line badges. Automatic tomorrow preview on load using geographic profiling across downtown, midtown, uptown, and Brooklyn. Single find_doubles() PostgreSQL function reused across all three versions without modification.`
      }
    ]
  },
  {
    number: '04',
    title: 'THE ENGAGEMENT ARCHITECTURE',
    subtitle: 'Four compounding builds across one rotation — a live event, a planning system, and a summit proposal that didn\'t exist yet.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Canvas API', 'Leaflet.js', 'Force-directed Physics', 'Custom Force Simulation', 'localStorage', 'GitHub Pages', 'GitHub Actions', 'CartoDB Tiles'],
    summary: 'A rotation onto an employee engagement and communications team created both the access and the time to actually do something about a set of visible gaps. No gap was just identified and named — each one was answered with something built.',
    sections: [
      {
        heading: 'Stage 1 — The Event',
        body: `The first live build: a fully planned and successfully executed virtual team engagement event, with its own dedicated event guide site built from scratch.

A low-pressure virtual event that anyone could participate in on their own schedule, with real prizes and a clear way to submit entries. A retro arcade aesthetic. Five game categories. Three prize tracks. The submission flow validates team email, then opens a pre-filled email entry ready to send.

The event ran. It was a success. The site is the artifact.`
      },
      {
        heading: 'Stage 2 — The Engagement Hub',
        link: 'thevillanelle.github.io/gather',
        body: `The event proved the model. It also surfaced the planning problem: there was no system for figuring out what kind of event to run, who was available when, or what the team actually wanted.

The Engagement Hub was built to solve that. Four modules: a 10-step event planning questionnaire that scores 12 event blueprints against your input; an AI agent setup guide with a copyable system prompt; a 10-step employee intake survey; and a force-directed interest graph — custom physics engine in raw JavaScript — that answers the question event planners need answered before they plan anything: what does this team actually love?`
      },
      {
        heading: 'Stage 3 — The Summit',
        link: 'thevillanelle.github.io',
        body: `The hub surfaced the data. The data surfaced the gap. The gap became a pitch.

150 employees working from home across 40+ cities — no dedicated programming, limited access to leadership, no shared experience that makes a dispersed community feel like one. The Proximity Summit is a fully designed, fully documented proposal for a 4-day annual virtual summit built exclusively for them.

Four days with distinct identities: an opening map reveal (150 dots, one per employee, 40+ cities — no words needed for the first few seconds, just scale), a showcase day, a deep-work day with 1:1 access to leadership, and a closing day with a team-wide offsite and an AI-generated Wrapped.

An hourly employee protection framework — session tagging, manager pre-clearance, pre-allocated time budgets — ensures nobody's job is at risk for attending. Six leadership participation tiers so every leader can show up at the level that works for them. A 17-question leader FAQ written from the leader's perspective, answered honestly.

Budget: $15K total versus $100K+ for an equivalent in-person event. No travel. The investment is lunch — it says: your time is valuable, we see you.

The proposal site is live. The map is real.`
      },
      {
        heading: 'What These Builds Demonstrate Together',
        body: `Each build did something the previous one couldn't. An event can't collect team preferences. A preference tool can't make the investment case. The case is only credible because the previous builds exist.

The through-line: no gap was just identified and named. Each one was answered with something built.`
      }
    ]
  },
  {
    number: '05',
    title: 'THE FEEDBACK ENGINE',
    subtitle: 'An end-to-end idea submission program with a full automation layer — built entirely on tools the team already had open every day.',
    tags: ['Slack Workflows', 'Quip Automation', 'MCP Integration', 'AI Agent Development', 'Enchanté', 'Program Design', 'Systems Architecture', 'Technical Writing', 'Communications Design'],
    summary: 'Phase 1 built the intake pipeline. Phase 2 closed a feedback loop that Phase 1 didn\'t solve — identified through direct program evaluation and fixed with a second structural build. Every piece of the system, every document, and every communication asset was designed and produced by one person.',
    sections: [
      {
        heading: 'Background',
        body: `A global investigations team had no structured way to surface ideas from the people doing the work. No intake system, no tracking, no visibility into what was being considered or actioned. The gap was identified and a program was built to close it.`
      },
      {
        heading: 'Phase 1 — Building the Pipeline',
        body: `The design constraint was adoption. A system that required new tools or new behaviors wouldn't get used. The pipeline was built entirely on tools the team already had open every day.

A Slack workflow was deployed as the submission interface. Team members fill out a structured form — category, idea description, business impact — without leaving Slack. The workflow populates a purpose-built tracking spreadsheet automatically, giving leadership a centralized, real-time view of all submissions.

Built in partnership. Handed off to a program lead, responsible for day-to-day management, idea evaluation, and working submissions with the broader leadership team.`
      },
      {
        heading: 'The Gap',
        body: `Quarterly presentations were established as the communication mechanism after handoff. Through those presentations, a structural problem became clear: investigators were submitting ideas and hearing nothing back. No acknowledgment, no status update, no close-out. They had no way to know whether their idea had been seen, considered, actioned, or shelved.

The quarterly presentation format wasn't solving this. It was reporting to leadership, not communicating back to investigators. Something in the architecture needed to change.`
      },
      {
        heading: 'Phase 2 — Closing the Loop',
        body: `A new system was designed and presented to the program leader as a proposal. The binding constraint: it couldn't add workload to the leadership team already running the program. All trigger points had to map to things leaders were already doing in Quip.

Quip structural redesign: The tracking spreadsheet was redesigned with a clearly designated internal notes column — separating leadership ideation from public-facing records and explicitly excluding it from all automated outputs. The Actions Taken column was standardized as the single source of truth for close-out communications, with format guidelines defined to ensure clean output from the AI agent.

Quip-to-Slack integration: The Quip document was connected directly to the Seed Your Ideas: Compliance Slack channel. Edits to the document — including the Complete checkbox trigger — post automatically to the channel, alerting the team that a close-out email is ready to send. A leader notification step was also added to the original Slack workflow, triggering an alert whenever a new submission comes in.

Email communication system: Four templates designed and copy-edited to organizational voice standards, mapped to the four states an idea can be in:
· Stage 1 — Submission confirmation, sent when a new idea lands
· Stage 2 — Active review notification, triggered when the first Actions Taken entry is logged
· Stage 3 (Implemented) — Full close-out with a dated timeline compiled from the Actions Taken history
· Stage 3 (Tabled/Declined) — Honest, respectful close-out with clear reasoning and an actionable next step for the investigator

Every trigger point maps to an action a leader was already taking. No new behaviors required.`
      },
      {
        heading: 'The Custom AI Agent',
        body: `A custom agent was built in Enchanté and connected to the Quip document via MCP (Model Context Protocol) integration. The agent reads live data directly from the spreadsheet, compiles the Actions Taken history, and produces a formatted, policy-compliant email draft on demand — in the correct organizational voice, with team member names never surfaced to investigators. Any team member can generate the correct email for any stage with a single sentence prompt.

The agent's instructions, constraints, tone standards, privacy rules, and operational logic were written from scratch. The goal was a tool any member of the team could pick up and use correctly without knowing how it was built.`
      },
      {
        heading: 'Program Asset Suite',
        body: `A complete documentation and communications package was produced alongside the technical builds:

· Leader program overview — visual explainer of the full pipeline, trigger points, and team responsibilities. PDF-ready and email-safe formats for flexible distribution
· Investigator guide — plain-language visual guide explaining the program from the investigator's perspective, including what communications to expect at each stage and when
· Full email journey reference — all four templates displayed in sequence with trigger annotations, for leadership presentations and team training
· Seed Your Ideas: Compliance setup guide — step-by-step onboarding for team members installing and configuring Enchanté, including the agent instructions ready to copy and deploy
· General AI assistant getting started guide — broader onboarding covering GenAI training, the internal AI tooling platform, MCP servers, tokens, and custom agent creation, designed for any any team leader new to the tool
· Leadership elevator pitch — concise framing of the program's value for leadership sign-off
· Investigator Slack blast — announcement copy for distributing the investigator guide to the team`
      },
      {
        heading: 'Outcomes',
        body: `43+ ideas collected across multiple submission cycles. Over half actioned or completed, with documented outcomes for each. 4 email templates designed, copy-edited, and ready to deploy against the existing backlog. 1 custom AI agent live and operational — close-out email drafting reduced to a single prompt. 6 program documents covering leadership, investigators, and team onboarding. Zero additional tooling required — the full system runs on Slack, Quip, and Enchanté. Zero ongoing maintenance burden — the agent handles drafting, Quip-to-Slack handles alerting. Any team member can run the program end-to-end using the shared documentation and agent.`
      }
    ]
  }
]

function CaseCard({ c }) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)

  return (
    <div className="bg-noir-elevated rounded-sm overflow-hidden" style={{ borderLeft: '3px solid var(--crimson)' }}>
      {/* Closed state — hook, not a database record */}
      <div className="p-8 cursor-pointer group" onClick={() => setOpen(!open)}>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl text-cream-DEFAULT tracking-wide mb-3 group-hover:text-crimson transition-colors">
              {c.title}
            </h3>
            <p className="font-sans text-base text-cream-muted leading-relaxed mb-4">
              {c.subtitle}
            </p>
            <p className="font-serif italic text-cream-DEFAULT leading-relaxed" style={{ fontSize: '1.05rem' }}>
              {c.summary}
            </p>
          </div>
          <div className="flex flex-col items-end justify-between gap-4">
            <div className="flex flex-wrap gap-2 justify-end">
              {c.tags.slice(0,4).map(t => (
                <span key={t} className="bg-noir-border text-cream-muted font-mono text-xs px-2 py-1 rounded-sm">{t}</span>
              ))}
              {c.tags.length > 4 && (
                <span className="text-cream-muted font-mono text-xs">+{c.tags.length - 4} more</span>
              )}
            </div>
            <button className="font-mono text-xs text-crimson hover:text-cream-DEFAULT transition-colors whitespace-nowrap">
              {open ? 'Close ↑' : 'Full story →'}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden border-t border-noir-border">
            <div className="p-6 space-y-2">
              {c.sections.map((section, i) => (
                <div key={i} className="border border-noir-border rounded-sm overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-noir-card transition-colors"
                    onClick={() => setActiveSection(activeSection === i ? null : i)}>
                    <span className="font-mono text-xs text-gold-DEFAULT tracking-widest uppercase">{section.heading}</span>
                    <span className="font-mono text-xs text-cream-muted ml-4 shrink-0">{activeSection === i ? '▲' : '▼'}</span>
                  </button>
                  <AnimatePresence>
                    {activeSection === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-noir-border">
                        <div className="px-5 py-5">
                          {section.link && (
                            <a href={`https://${section.link}`} target="_blank" rel="noopener noreferrer"
                              className="font-mono text-xs text-crimson block mb-3 hover:underline">{section.link}</a>
                          )}
                          <p className="font-sans text-sm text-cream-muted leading-relaxed whitespace-pre-line">{section.body}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Systems() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <SectionLabel>SYSTEMS</SectionLabel>
      <h1 className="font-display text-[clamp(48px,8vw,100px)] text-cream-DEFAULT tracking-wide mb-6">THE WORK</h1>
      <div className="max-w-3xl mb-16">
        <p className="font-serif italic text-2xl text-cream-DEFAULT leading-relaxed mb-5">
          Five projects. Five real problems. Built from scratch, shipped to production — and documented with the level of detail that actually shows how the work happened.
        </p>
        <p className="font-sans text-lg text-cream-muted leading-relaxed">
          These aren't summaries. Each one is the full record: the gap that existed, what got built to close it, every decision that mattered along the way, and what's running as a result. Click into any project to read the whole thing.
        </p>
      </div>
      <div className="space-y-4">
        {cases.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <CaseCard c={c} />
          </motion.div>
        ))}
      </div>
    </main>
  )
}
