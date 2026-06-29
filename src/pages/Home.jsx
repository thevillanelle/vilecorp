import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SocialLinks from '../components/SocialLinks'

const WorldMap = () => (
  <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-[0.04]"
    fill="none" stroke="var(--crimson)" strokeWidth="0.8">
    <path d="M80,80 L160,60 L220,80 L260,120 L280,160 L240,200 L200,240 L160,280 L130,260 L100,220 L80,180 L70,140 Z"/>
    <path d="M200,280 L240,270 L270,300 L280,350 L270,400 L250,440 L220,460 L200,440 L185,400 L180,350 L190,310 Z"/>
    <path d="M440,60 L500,50 L540,70 L520,100 L480,110 L450,100 L430,80 Z"/>
    <path d="M450,120 L510,110 L550,130 L570,180 L560,240 L530,290 L490,320 L460,310 L440,270 L430,220 L430,170 Z"/>
    <path d="M540,40 L700,30 L800,60 L840,100 L820,140 L760,160 L700,150 L640,160 L600,140 L560,120 L530,90 Z"/>
    <path d="M760,280 L830,270 L870,290 L880,330 L860,360 L820,370 L780,360 L760,330 L750,300 Z"/>
  </svg>
)

export default function Home() {
  return (
    <main>
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <WorldMap />
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto w-full">

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="font-serif italic leading-[1.15] text-cream-DEFAULT mb-10"
            style={{ fontSize: 'clamp(52px, 7.5vw, 112px)' }}>
            The pleasure<br />is the point.
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.5 }}
            className="h-px max-w-[120px] mb-10 origin-left" style={{ background: 'var(--crimson)' }}/>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="flex flex-wrap gap-3 mb-10">
            {[
              { to: '/content', label: 'CONTENT' },
              { to: '/ritualware', label: 'RITUALWARE' },
              { to: '/systems', label: 'SYSTEMS' },
              { to: '/shop', label: 'SHOP' },
              { to: '/bio', label: 'BIO' },
            ].map(item => (
              <Link key={item.to} to={item.to}
                className="font-mono text-xs tracking-widest text-cream-muted border border-noir-border px-5 py-3 hover:border-crimson hover:text-cream-DEFAULT transition-colors">
                {item.label}
              </Link>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <SocialLinks />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
