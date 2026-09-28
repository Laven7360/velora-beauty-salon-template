import { Link } from 'react-router-dom'
export default function PageHero() {
  return <section className="chapter recovery-page" aria-labelledby="page-title"><div className="chapter-copy">
    <p className="utility">404 / A little off course</p>
    <h1 id="page-title">Looks like this one grew out.</h1><p className="intro-copy">The page you’re looking for isn’t here. Let’s find a fresh starting point.</p>
    <div className="recovery-actions"><Link className="booking-link" to="/">Return Home <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/services">Explore Services <span aria-hidden="true">↗</span></Link></div>
  </div></section>
}

