import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Content from './pages/Content'
import Ritualware from './pages/Ritualware'
import Bio from './pages/Bio'
import Shop from './pages/Shop'
import Links from './pages/Links'

export default function App() {
  const scrollRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [pathname])

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-noir text-cream">
      <Nav />
      <div ref={scrollRef} className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content" element={<Content />} />
          <Route path="/ritualware" element={<Ritualware />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/links" element={<Links />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}
