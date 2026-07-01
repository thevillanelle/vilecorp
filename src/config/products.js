// ── INSTAGRAM FEED ──────────────────────────────────────────────────────────
// Behold.so JSON feed — auto-updates with latest posts
export const INSTAGRAM_FEED_URL = 'https://feeds.behold.so/VtgmoTopUIlGPyDN3so5'

// ── SOCIAL LINKS ──────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { platform: 'Instagram', handle: '@villanelle.jpg', url: 'https://instagram.com/villanelle.jpg' },
  { platform: 'TikTok',    handle: '@elleporcher',    url: 'https://tiktok.com/@elleporcher'       },
  { platform: 'YouTube',   handle: '@elleporcher',    url: 'https://youtube.com/@elleporcher'      },
]

// ── PRODUCTS ───────────────────────────────────────────────────────────────
// Stripe Payment Links: create each product in stripe.com/dashboard → Payment Links
// Then replace the https://buy.stripe.com/REPLACE_* values below
export const PRODUCTS = [
  {
    id: 'glow-up-pyramid',
    name: 'The Glow Up Pyramid',
    price: null,
    badge: 'FREE',
    description: 'Five tiers, every level of the glow-up named and sequenced. The static version is here — the interactive experience lives in the Glow Up app.',
    cta: 'Try the App',
    type: 'download',
    url: 'https://ritualware.app/glowup',
  },
  {
    id: 'hourglass-formula',
    name: 'The Hourglass Formula',
    price: '$9.99',
    badge: null,
    description: 'The system behind the transformation. Structure your body, your schedule, and your standards.',
    cta: 'Get the Formula',
    type: 'stripe',
    url: 'https://buy.stripe.com/5kQ8wP4r39p90HdgV99oc01',
  },
  {
    id: 'nyc-thriving',
    name: 'The Guide to Thriving in NYC',
    price: '$45',
    badge: null,
    description: 'How to finesse, flourish, and f*ing win in New York City. Neighborhoods, social circles, dating, and the mindset that makes the city yours. And if you want to go further — Ritualwhere.',
    cta: 'Get the Guide',
    type: 'stripe',
    url: 'https://buy.stripe.com/aFaeVd2iVcBl61xawL9oc00',
  },
]

// ── AFFILIATES ─────────────────────────────────────────────────────────────
// Replace YOUR_* values with actual affiliate URLs
export const AFFILIATES = [
  {
    name: 'Shop My Top Shelf',
    description: "Elle's curated beauty, fragrance, and lifestyle picks. Every bottle, every ritual, vetted.",
    cta: 'Browse the Shelf',
    url: 'YOUR_TOP_SHELF_URL',
  },
  {
    name: 'Amazon Storefront',
    description: 'Everything Elle reaches for, sourced and organized so you can shop the life without the research.',
    cta: 'Shop on Amazon',
    url: 'YOUR_AMAZON_STOREFRONT_URL',
  },
]
