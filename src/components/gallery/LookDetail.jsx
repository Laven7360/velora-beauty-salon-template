import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { openStyleDialog } from '../services/dialogFocus'
import { lookBookingUrl } from '../../data/gallery'
export default function LookDetail({ look, onClose }) {
  const dialog = useRef(null), title = useRef(null)
  useEffect(() => openStyleDialog(dialog.current, title.current), [])
  return <dialog ref={dialog} className="look-dialog" aria-labelledby="look-detail-title" aria-describedby="look-detail-description" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="look-dialog-toolbar"><span className="utility">The lookbook / {look.category}</span><button type="button" onClick={onClose} aria-label="Close look details">Close ×</button></div>
    <div className="look-detail-body"><img src={look.image} width="358" height="539" alt={look.alt} /><div>
      <h2 id="look-detail-title" tabIndex={-1} ref={title}>{look.title}</h2><h3>About this look</h3><p id="look-detail-description">{look.description}</p>
      <dl><div><dt>Techniques</dt><dd>{look.techniques.join(' · ')}</dd></div><div><dt>Related service</dt><dd><Link to="/services">{look.relatedService.name} ↗</Link></dd></div>{look.relatedStyle && <div><dt>Style reference</dt><dd>{look.relatedStyle.catalogueName}</dd></div>}<div><dt>Maintenance</dt><dd>{look.maintenance} · Discuss a routine in consultation.</dd></div></dl>
      <Link to={lookBookingUrl(look)} className="booking-link">Book a similar look <span aria-hidden="true">↗</span></Link><p className="look-note">AI-generated inspiration, not client work. Your result would depend on your hair and starting point.</p>
    </div></div>
  </dialog>
}

