import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Technical from './pages/Technical.jsx'
import Creative from './pages/Creative.jsx'
import Cursor from './components/Cursor.jsx'

// Reset scroll on every route change.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Cursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/creative" element={<Creative />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  )
}
