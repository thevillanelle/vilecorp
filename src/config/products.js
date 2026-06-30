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
    description: 'Your foundation for ritualized transformation. The framework that makes the glow-up inevitable.',
    cta: 'Download Free',
    type: 'download',
    url: '/downloads/glow-up-pyramid.pdf',
  },
  {
    id: 'hourglass-formula',
    name: 'The Hourglass Formula',
    price: '$9.99',
    badge: null,
    description: 'The system behind the transformation. Structure your body, your schedule, and your standards.',
    cta: 'Get the Formula',
    type: 'stripe',
    url: 'https://buy.stripe.com/REPLACE_HOURGLASS',
  },
  {
    id: 'nyc-thriving',
    name: 'The NYC Thriving Guide',
    price: '$45',
    badge: null,
    description: 'How to live beautifully in the most demanding city on earth. Every neighborhood. Every ritual.',
    cta: 'Get the Guide',
    type: 'stripe',
    url: 'https://buy.stripe.com/REPLACE_NYC',
  },
  {
    id: 'unlock-your-needs',
    name: 'Unlock Your Needs',
    price: '$50',
    badge: 'COURSE',
    description: 'For the woman who is finally ready to stop managing herself down. Self-knowledge as infrastructure.',
    cta: 'Enroll Now',
    type: 'stripe',
    url: 'https://buy.stripe.com/REPLACE_UNLOCK',
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
