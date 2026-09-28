import { getService, getArtist, getInspiration } from '../../data/booking'
import { BookingInspiration } from './BookingFields'
export function BookingSummary({ data }) {
  const service = getService(data.serviceId), artist = getArtist(data.artistId), inspiration = getInspiration(data)
  return <aside className="enquiry-summary" aria-label="Current request"><p className="utility">Your direction</p><h2>A little clearer,<br />step by step.</h2><dl>{service && <div><dt>Service</dt><dd>{service.name}</dd></div>}<div><dt>Artist</dt><dd>{artist?.name || 'No preference'}</dd></div>{data.date && <div><dt>Preferred date</dt><dd>{data.date}{data.time && <span>{data.time}</span>}</dd></div>}{inspiration && <div><dt>Inspiration</dt><dd>{inspiration.title}</dd></div>}</dl><p className="enquiry-note">A demo enquiry, not a confirmed appointment. No payment or submission.</p></aside>
}
export function BookingReview({ data, onEdit }) {
  const service = getService(data.serviceId), artist = getArtist(data.artistId)
  const rows = [
    { title: 'Service', step: 0, content: <>{service?.name}{service?.price != null && <small>Indicative starting price · RM {service.price}</small>}</> },
    { title: 'Hair & inspiration', step: 1, content: <>{[data.length,data.texture,data.condition].join(' · ')}{data.goals && <small>{data.goals}</small>}<BookingInspiration data={data} /></> },
    { title: 'Artist', step: 2, content: artist?.name || 'No preference' },
    { title: 'Preferred date & time', step: 3, content: <>{data.date}<small>{data.time} · London time · Demo choices</small></> },
    { title: 'Your details', step: 4, content: <>{data.name}<small>{data.email}</small><small>{data.phone}</small><small>Preferred contact: {data.contact}</small>{data.notes && <small>{data.notes}</small>}</> },
  ]
  return <dl className="enquiry-review">{rows.map(row => <div key={row.title}><dt>{row.title}{onEdit && <button type="button" className="enquiry-text-button" aria-label={'Edit ' + row.title.toLowerCase()} onClick={() => onEdit(row.step)}>Edit</button>}</dt><dd>{row.content}</dd></div>)}</dl>
}

