import { Link } from 'react-router-dom'
import BookingLink from '../components/BookingLink'
import portrait from '../assets/velora-editorial.jpg'
import HomeSections from '../components/home/HomeSections'

export default function Home() {
  return <><section className="salon-hero" aria-labelledby="home-title">
    <div className="hero-copy">
      <p className="utility">Velora · Hair & Grooming Studio</p>
      <h1 id="home-title">Hair, shaped<br />around <em>you.</em></h1>
      <p className="intro-copy">Precision cuts, dimensional colour and considered grooming, tailored to your style.</p>
      <div className="hero-actions"><BookingLink /><Link className="text-link" to="/services">Explore Services</Link></div>
    </div>
    <figure className="hero-portrait">
      <img src={portrait} width="1122" height="1402" fetchPriority="high" alt="Model with voluminous dark waves and a layered haircut." />
      <figcaption>Editorial concept · AI-generated image</figcaption>
    </figure>
  </section><HomeSections /></>
}

