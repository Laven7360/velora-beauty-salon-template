import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { updateRouteMetadata, restoreRouteViewport } from './route-effects'
export default function MainLayout() {
  const { pathname, hash, key } = useLocation()
  const mainRef = useRef(null)
  useEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => { window.history.scrollRestoration = previous }
  }, [])
  useEffect(() => {
    updateRouteMetadata(pathname)
    const frame = window.requestAnimationFrame(() => restoreRouteViewport(hash, mainRef.current))
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash, key])
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar key={key} />
    <main id="main-content" ref={mainRef} tabIndex={-1}><Outlet /></main>
    <Footer />
  </>
}

