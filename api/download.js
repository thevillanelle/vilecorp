import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PRODUCTS = {
  'hourglass-formula': {
    names: ['The Hourglass Formula'],
    file: 'hourglass-formula.pdf',
  },
  'nyc-thriving': {
    names: ['The Guide to Thriving in NYC'],
    file: 'nyc-thriving-guide.pdf',
  },
}

export default async function handler(req, res) {
  const { session_id, product } = req.query

  if (!session_id || !product) {
    return res.status(400).send('Missing session_id or product')
  }

  const mapping = PRODUCTS[product]
  if (!mapping) {
    return res.status(404).send('Unknown product')
  }

  let session
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items.data.price.product'],
    })
  } catch {
    return res.status(400).send('Invalid session')
  }

  if (session.payment_status !== 'paid') {
    return res.status(402).send('Payment not completed')
  }

  const purchasedName = session.line_items?.data?.[0]?.price?.product?.name
  if (!mapping.names.includes(purchasedName)) {
    return res.status(403).send('Product mismatch')
  }

  return res.redirect(302, `${process.env.VITE_SITE_URL}/downloads/${mapping.file}`)
}
