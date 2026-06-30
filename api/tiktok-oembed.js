export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const { url } = req.query
  if (!url) return res.status(400).json({ error: 'url required' })

  const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'

  async function oembed(videoUrl) {
    const r = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
      { headers: { 'User-Agent': UA } }
    )
    if (!r.ok) throw new Error(`oembed ${r.status}`)
    return r.json()
  }

  try {
    let data
    try {
      data = await oembed(url)
    } catch {
      const resolved = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': UA },
      })
      data = await oembed(resolved.url)
    }

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600')
    return res.json({
      thumbnail_url: data.thumbnail_url,
      title: data.title,
      author_name: data.author_name,
    })
  } catch (e) {
    return res.status(502).json({ error: e.message })
  }
}
