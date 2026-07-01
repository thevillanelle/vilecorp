import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

// Map Stripe product names → PDF paths and email subject
// Product names must match exactly what's set in the Stripe dashboard
const PRODUCTS = {
  'The Hourglass Formula': {
    pdfUrl: `${process.env.VITE_SITE_URL}/downloads/hourglass-formula.pdf`,
    filename: 'The Hourglass Formula.pdf',
    subject: 'Your download is here — The Hourglass Formula',
    body: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <p style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#C41E3A">VILE LLC</p>
        <h1 style="font-size:28px;font-weight:400;margin:8px 0 24px">The Hourglass Formula</h1>
        <p style="font-size:16px;line-height:1.7;color:#444">
          Your file is attached. The system is yours now — use it.
        </p>
        <p style="font-size:16px;line-height:1.7;color:#444;margin-top:24px">
          — Elle
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:32px 0" />
        <p style="font-size:12px;color:#999">
          VILE LLC · <a href="https://vilecorp.com" style="color:#C41E3A;text-decoration:none">vilecorp.com</a>
        </p>
      </div>
    `,
  },
  'The Guide to Thriving in NYC': {
    pdfUrl: `${process.env.VITE_SITE_URL}/downloads/nyc-thriving-guide.pdf`,
    filename: 'The Guide to Thriving in NYC.pdf',
    subject: 'Your download is here — The Guide to Thriving in NYC',
    body: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <p style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#C41E3A">VILE LLC</p>
        <h1 style="font-size:28px;font-weight:400;margin:8px 0 24px">The Guide to Thriving in NYC</h1>
        <p style="font-size:16px;line-height:1.7;color:#444">
          Your guide is attached. New York is already yours — now you have the playbook.
        </p>
        <p style="font-size:16px;line-height:1.7;color:#444;margin-top:24px">
          — Elle
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:32px 0" />
        <p style="font-size:12px;color:#999">
          VILE LLC · <a href="https://vilecorp.com" style="color:#C41E3A;text-decoration:none">vilecorp.com</a>
        </p>
      </div>
    `,
  },
}

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const rawBody = await getRawBody(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('[stripe-webhook] signature error:', err.message)
    return res.status(400).json({ error: err.message })
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true })
  }

  const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
    expand: ['line_items.data.price.product'],
  })

  const email = session.customer_details?.email
  if (!email) {
    console.error('[stripe-webhook] no customer email on session', session.id)
    return res.status(200).json({ received: true })
  }

  for (const item of session.line_items?.data ?? []) {
    const productName = item.price?.product?.name
    const product = PRODUCTS[productName]
    if (!product) {
      console.log('[stripe-webhook] no PDF mapping for product:', productName)
      continue
    }

    const pdfRes = await fetch(product.pdfUrl)
    if (!pdfRes.ok) {
      console.error('[stripe-webhook] failed to fetch PDF:', product.pdfUrl, pdfRes.status)
      continue
    }

    const pdfBuffer = Buffer.from(await pdfRes.arrayBuffer())

    await resend.emails.send({
      from: 'Elle Porcher <hello@vilecorp.com>',
      to: email,
      subject: product.subject,
      html: product.body,
      attachments: [{
        filename: product.filename,
        content: pdfBuffer,
      }],
    })

    console.log('[stripe-webhook] sent', product.filename, 'to', email)
  }

  return res.status(200).json({ received: true })
}
