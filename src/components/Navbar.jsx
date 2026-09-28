import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Brand from './Brand'
import { navigation } from '../data/navigation'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const headerRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const media = window.matchMedia('(min-width: 60rem)')
    const closeOnDesktop = () => { if (media.matches) setOpen(false) }
    media.addEventListener('change', closeOnDesktop)
    return () => media.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!open) return
    function handleKey(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    function handleOutside(event) {
      if (!headerRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('pointerdown', handleOutside)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('pointerdown', handleOutside)
    }
  }, [open])

  function navigate(to) {
    setOpen(false)
    if (pathname === to) document.getElementById('main-content')?.focus()
  }

  return <header className="site-header" ref={headerRef} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }}>
    <div className="container header-inner">
      <Brand />
      <button className="menu-toggle" type="button" ref={toggleRef} aria-expanded={open}
        aria-controls="primary-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setOpen(!open)}>
        <span>{open ? 'Close' : 'Menu'}</span>
        <span className={open ? 'menu-icon is-open' : 'menu-icon'} aria-hidden="true"><i /><i /></span>
      </button>
      <nav id="primary-navigation" className={open ? 'primary-nav is-open' : 'primary-nav'} aria-label="Main navigation">
        <ul>{navigation.map(({ to, label }) => <li key={to}>
          <NavLink to={to} end={to === '/'} onClick={() => navigate(to)}>{label}</NavLink>
        </li>)}</ul>
        <NavLink className="nav-booking" to="/book" onClick={() => navigate('/book')}>Book Appointment <span aria-hidden="true">↗</span></NavLink>
      </nav>
    </div>
  </header>
}

