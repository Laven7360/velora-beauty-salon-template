import { Link } from 'react-router-dom'
import Brand from './Brand'
import { navigation, footerServices } from '../data/navigation'
export default function Footer() {
  return <footer className="site-footer" id="studio-footer"><div className="container">
    <div className="footer-grid">
      <div className="footer-brand"><Brand /><p>Personal style. Professional care.</p></div>
      <div className="footer-navigation">
        <nav aria-label="Footer navigation"><h2 className="footer-heading">Explore</h2><ul>{navigation.map(({ to, label }) => <li key={to}><Link to={to}>{label}</Link></li>)}<li><Link to="/book">Book Appointment</Link></li></ul></nav>
        <nav aria-label="Services"><h2 className="footer-heading">Services</h2><ul>{footerServices.map(({ name, to }) => <li key={to}><Link to={to}>{name}</Link></li>)}</ul></nav>
      </div>
      <div className="footer-contact"><h2 className="footer-heading">Visit the studio</h2>
        <address>18 Willow Lane, Brookfield, London<br /><a href="mailto:hello@velora.example">hello@velora.example</a></address>
        <dl className="opening-hours"><div><dt>Tue – Fri</dt><dd>10am – 7pm</dd></div><div><dt>Sat – Sun</dt><dd>9am – 5pm</dd></div><div><dt>Monday</dt><dd>Closed</dd></div></dl>
        <p className="footer-socials">Instagram · Pinterest <span className="footer-note">(coming soon)</span></p>
      </div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Velora.</p><p>Portfolio demo · Fictional studio and contact details.</p></div>
  </div></footer>
}

