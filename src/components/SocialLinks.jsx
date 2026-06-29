import { SOCIAL_LINKS } from '../config/products'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.7a8.28 8.28 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.5 6.19a3.02 3.02 0 00-2.07-2.16C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.43.53A3.02 3.02 0 00.5 6.19 31.52 31.52 0 000 12a31.52 31.52 0 00.5 5.81 3.02 3.02 0 002.07 2.16C4.45 20.5 12 20.5 12 20.5s7.55 0 9.43-.53a3.02 3.02 0 002.07-2.16A31.52 31.52 0 0024 12a31.52 31.52 0 00-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z"/>
  </svg>
)

const ICONS = { Instagram: InstagramIcon, TikTok: TikTokIcon, YouTube: YouTubeIcon }

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {SOCIAL_LINKS.map(({ platform, handle, url }) => {
        const Icon = ICONS[platform]
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${platform}: ${handle}`}
            className="group flex items-center gap-2 text-cream-muted hover:text-crimson transition-colors"
          >
            <Icon />
            <span className="font-mono text-xs tracking-widest hidden sm:inline">{platform.toUpperCase()}</span>
          </a>
        )
      })}
    </div>
  )
}
