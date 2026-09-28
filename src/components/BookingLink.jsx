import { Link } from 'react-router-dom'
export default function BookingLink({ className = '' }) {
  return <Link to="/book" className={'booking-link ' + className}>Book an Appointment <span aria-hidden="true">↗</span></Link>
}

