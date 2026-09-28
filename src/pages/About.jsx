import { Link } from 'react-router-dom'
import BookingLink from '../components/BookingLink'
import AboutPhoto from '../components/about/AboutPhoto'
import { consultationSteps, studioValues } from '../data/about'
import studioImage from '../assets/about-studio.jpg'
import '../styles/about.css'

export default function About() {
  return <div className="about-page">
    <section className="about-hero container" aria-labelledby="about-title">
      <p className="utility">The studio</p>
      <div className="about-hero-heading"><h1 id="about-title">More than<br />a good haircut.</h1><p className="about-copy">A contemporary unisex studio built around personal style, thoughtful consultation and the craft of looking after your hair.</p></div>
      <figure className="about-hero-image"><img src={studioImage} width="1536" height="1024" fetchPriority="high" alt="Velora studio concept with warm oak stations, espresso styling chairs and natural daylight." /><figcaption><span>Velora · Brookfield, London</span><span>AI studio concept · Portfolio demo</span></figcaption></figure>
    </section>

    <section className="about-section about-philosophy container" aria-labelledby="philosophy-title">
      <div><p className="utility">Our approach</p><h2 id="philosophy-title">Your hair isn’t<br /><em>a category.</em></h2></div>
      <div className="about-philosophy-copy"><p className="about-copy">We start with you: your texture, your routine and the result you want. Not a gender label or a look you feel expected to wear.</p><p className="about-copy">That might mean a cut that falls into place with less styling, colour that suits your complexion and personal style, or care that makes your hair easier to manage. We’ll explain the options, without pressure.</p><Link className="text-link" to="/services">Explore Our Services <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="about-section about-consultation" aria-labelledby="consultation-title"><div className="container about-consultation-layout">
      <div className="about-consultation-intro"><div><p className="utility">Before the first cut</p><h2 id="consultation-title">First, we listen.</h2><p className="about-copy">A reference photo is welcome. So is simply knowing you want a change. The consultation helps us make a clear plan together.</p></div><figure className="about-consultation-photo"><AboutPhoto scene="consultation" /><figcaption>Time to talk through what works for you.</figcaption></figure></div>
      <ol className="consultation-sequence">{consultationSteps.map((step, index) => <li key={step.title}><span className="consultation-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
    </div></section>

    <section className="about-section about-craft container" aria-labelledby="craft-title">
      <div className="about-section-heading"><div><p className="utility">Cutting, colour & finish</p><h2 id="craft-title">Technique matters.</h2></div><p className="about-copy">A good result comes from understanding how hair behaves: its shape, movement, texture and condition. The detail makes the difference, from a clean taper to a carefully placed highlight.</p></div>
      <div className="about-craft-images"><figure><AboutPhoto scene="cutting" /><figcaption><h3>Shape & precision</h3><p>Balanced cuts, careful clipper work and a finish that grows out thoughtfully.</p></figcaption></figure><figure><AboutPhoto scene="colour" /><figcaption><h3>Colour & movement</h3><p>Placement, tone and styling chosen to work with the way your hair falls.</p></figcaption></figure></div>
    </section>

    <section className="about-section about-care" aria-labelledby="about-care-title"><div className="container about-care-layout">
      <div className="about-care-intro"><p className="utility">Condition comes with the cut</p><h2 id="about-care-title">Good hair should<br />still feel like<br /><em>your hair.</em></h2><p className="about-copy">We want you to enjoy your hair after you leave the chair, too. That means looking after its condition and being realistic about what it needs.</p></div>
      <div><ul className="about-care-list"><li><h3>A realistic plan</h3><p>Some colour changes are better approached over several visits. We’ll talk through the options and upkeep before you decide.</p></li><li><h3>Care with a purpose</h3><p>Treatments and scalp care are chosen for your hair’s needs. We won’t add a service just to make an appointment longer.</p></li><li><h3>A routine you can keep</h3><p>Simple home-care and styling advice, with product recommendations that fit your routine.</p></li></ul><Link className="text-link" to="/services">Explore Treatments & Care <span aria-hidden="true">↗</span></Link></div>
    </div></section>

    <section className="about-section about-space container" aria-labelledby="space-title">
      <div className="about-section-heading"><div><p className="utility">Inside Velora</p><h2 id="space-title">A space made<br />for slowing down.</h2></div><p className="about-copy">A comfortable place to settle in, talk through your plans and let us take care of the details. Warm materials, natural light and room to breathe.</p></div>
      <div className="about-space-mosaic">
        <figure className="about-space-wide"><AboutPhoto src={studioImage} alt="Styling stations and a spacious colour preparation counter in the fictional Velora studio." /><figcaption>At the mirror · Cutting, styling & colour</figcaption></figure>
        <figure className="about-space-wash"><AboutPhoto scene="wash" /><figcaption>A quieter corner · Wash & treatment</figcaption></figure>
        <figure className="about-space-waiting"><AboutPhoto scene="waiting" /><figcaption>Settle in · Consultation, waiting & the product shelf</figcaption></figure>
      </div>
      <p className="about-note">Studio imagery is AI-generated for this fictional salon concept.</p>
    </section>

    <section className="about-section about-values" aria-labelledby="values-title"><div className="container about-values-layout">
      <div><p className="utility">What matters here</p><h2 id="values-title">A few things<br />we don’t<br /><em>compromise on.</em></h2></div>
      <dl className="about-values-list">{studioValues.map(value => <div key={value.title}><dt>{value.title}</dt><dd>{value.description}</dd></div>)}</dl>
    </div></section>

    <section className="about-section about-people container" aria-labelledby="people-title">
      <figure><AboutPhoto scene="team" /><figcaption>Demo team · AI-generated studio scene</figcaption></figure>
      <div><p className="utility">The people behind Velora</p><h2 id="people-title">Different specialties.<br /><em>One standard.</em></h2><p className="about-copy">Our stylists bring different strengths in cutting, colour, texture, grooming, styling and hair care. What they share is attention to detail and a willingness to listen.</p><p className="about-copy">We talk through ideas, share knowledge and help you find the right person for your appointment.</p><Link className="text-link" to="/team">Meet the Team <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="about-section about-visit" aria-labelledby="visit-title"><div className="container">
      <div className="about-section-heading"><div><p className="utility">Planning your visit</p><h2 id="visit-title">Find us in Brookfield.</h2></div><p className="about-note">Fictional location and hours · Portfolio demo</p></div>
      <div className="about-visit-grid"><div><h3>The studio</h3><address>18 Willow Lane<br />Brookfield, London<br /><a href="mailto:hello@velora.example">hello@velora.example</a></address></div><div><h3>Opening hours</h3><dl className="about-hours"><div><dt>Tuesday – Friday</dt><dd>10am – 7pm</dd></div><div><dt>Saturday – Sunday</dt><dd>9am – 5pm</dd></div><div><dt>Monday</dt><dd>Closed</dd></div></dl></div><div><h3>A little planning helps</h3><p>Appointments are recommended. Start with a consultation if you’re considering a colour change or aren’t sure which service to choose.</p></div></div>
    </div></section>

    <section className="about-section about-booking container" aria-labelledby="about-booking-title">
      <div><h2 id="about-booking-title">Let’s talk about<br /><em>your hair.</em></h2><p className="about-copy">Start with a consultation or book your next appointment.</p></div>
      <div className="about-booking-actions"><div><BookingLink /><Link className="text-link" to="/services">Explore Services <span aria-hidden="true">↗</span></Link></div><p className="about-note">This is a portfolio demo. Appointment enquiries are demo-only.</p></div>
    </section>
  </div>
}

