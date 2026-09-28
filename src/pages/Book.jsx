import { useLocation, useNavigate } from 'react-router-dom'
import BookingFlow from '../components/booking/BookingFlow'
import '../styles/booking.css'
export default function Book() {
  const location = useLocation(), navigate = useNavigate()
  return <div className="enquiry-page"><div className="enquiry-container">
    <header className="enquiry-hero"><p className="utility">Book Velora</p><h1>Let’s find the<br />right appointment.</h1><p className="enquiry-copy">Start with a service, tell us about your hair and explore a preferred time. We’ll help you put the pieces together.</p><p className="enquiry-demo-notice"><strong>Portfolio demo — appointment requests are not submitted.</strong><br />Use fictional details only. No data is sent or saved.</p></header>
    <BookingFlow key={location.key} search={location.search} navigationState={location.state} onReset={() => navigate('/book',{ replace: true, state: null })} />
    <section className="enquiry-practical" aria-labelledby="enquiry-studio-heading"><div><p className="utility">The fictional studio</p><h2 id="enquiry-studio-heading">A conversation first.</h2><p>18 Willow Lane, Brookfield, London</p></div><div><p>Tue–Fri · 10am–7pm<br />Sat–Sun · 9am–5pm<br />Monday · Closed</p><p className="enquiry-note">A consultation would confirm the plan, duration and price. Studio details and all booking choices are fictional.</p></div></section>
  </div></div>
}

