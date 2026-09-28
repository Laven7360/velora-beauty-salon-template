import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import StylePortrait from '../home/StylePortrait'
import { serviceMenus } from '../../data/services'
import { openStyleDialog } from './dialogFocus'

export default function StyleDetail({ style, onClose }) {
  const dialogRef = useRef(null)
  const headingRef = useRef(null)
  const related = serviceMenus.cut.find(service => service.id === style.relatedServiceId)
  useEffect(() => openStyleDialog(dialogRef.current, headingRef.current), [])
  return <dialog ref={dialogRef} className="style-dialog" aria-labelledby="style-detail-title" aria-describedby="style-detail-description"
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="style-dialog-inner">
      <div className="dialog-toolbar"><span className="utility">Style notes</span><button type="button" onClick={onClose} className="dialog-close" aria-label="Close hairstyle details">Close <span aria-hidden="true">×</span></button></div>
      <div className="style-detail-layout"><div className="detail-photo"><StylePortrait style={style} /><p className="services-small">AI reference · Not a guaranteed result</p></div>
        <div className="style-detail-copy"><h2 id="style-detail-title" ref={headingRef} tabIndex={-1}>{style.catalogueName}</h2><p id="style-detail-description">{style.description}</p>
          <dl className="style-facts"><div><dt>Length</dt><dd>{style.length}</dd></div><div><dt>Texture</dt><dd>{style.texture.join(' · ')}</dd></div><div><dt>Maintenance</dt><dd>{style.maintenance}</dd></div><div><dt>Styling effort</dt><dd>{style.stylingEffort}</dd></div></dl>
          <h3>Works well when…</h3><p>{style.worksWell}</p><h3>Ask your stylist about…</h3><p>{style.ask}</p>
          <div className="related-service"><span className="services-small">Related service</span><p>{related.name} <span>· from RM {related.price}</span></p></div>
          <Link className="booking-link" to="/book" state={{ styleId: style.id, styleName: style.catalogueName }}>Book this look <span aria-hidden="true">↗</span></Link>
          <p className="services-small">Portfolio demo · Appointment enquiries are demo-only.</p>
        </div>
      </div>
    </div>
  </dialog>
}

