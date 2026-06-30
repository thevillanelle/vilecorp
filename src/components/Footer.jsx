import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="border-t border-noir-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="font-display text-lg text-gold-DEFAULT tracking-widest mb-2">♠</div>
          <p className="font-mono text-xs text-cream-muted">© 2025 VILE LLC</p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  )
}
