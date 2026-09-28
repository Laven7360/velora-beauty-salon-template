import { Link } from 'react-router-dom'
export default function Brand() {
  return <Link className="brand" to="/" aria-label="Velora — Home">
    <span className="brand-wordmark">VEL<span className="brand-o">O</span>RA<span className="brand-dot" aria-hidden="true">®</span></span>
    <span className="brand-subtitle">Hair & Grooming Studio</span>
  </Link>
}

