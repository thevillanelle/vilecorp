import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Content from './pages/Content'
import Ritualware from './pages/Ritualware'
import Systems from './pages/Systems'
import Bio from './pages/Bio'
import Shop from './pages/Shop'
import Links from './pages/Links'

export default function App() {
  return (
    <div className="min-h-screen bg-noir text-cream">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content" element={<Content />} />
        <Route path="/ritualware" element={<Ritualware />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/links" element={<Links />} />
      </Routes>
      <Footer />
    </div>
  )
}
