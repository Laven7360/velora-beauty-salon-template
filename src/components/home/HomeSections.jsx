import { Link } from 'react-router-dom'
import BookingLink from '../BookingLink'
import DemoPhoto from './DemoPhoto'
import ServiceMenu from './ServiceMenu'
import StyleFinder from './StyleFinder'
import ProductDisplay from './ProductDisplay'
import { team, testimonials, careNeeds, experience, editorialPhotos } from '../../data/home'
import '../../styles/home.css'

export default function HomeSections() {
  return <>
    <section className="home-intro home-section container" aria-labelledby="intro-heading">
      <p className="utility">A contemporary unisex studio</p>
      <h2 id="intro-heading">Cut. Colour. Care.<br /><em>Without the labels.</em></h2>
      <div><p className="home-description">Good hair is personal. We work with your texture, your length and the look you want — from a sharp short cut to long layers, fresh colour or a simple tidy-up.</p><Link className="text-link" to="/about">Get to Know Velora <span aria-hidden="true">↗</span></Link></div>
    </section>

    <ServiceMenu />
    <StyleFinder />

    <section className="home-section colour-feature" aria-labelledby="colour-heading"><div className="container colour-layout">
      <div className="colour-images"><figure className="colour-main"><DemoPhoto index={1} /><figcaption>Soft dimension</figcaption></figure><figure className="colour-inset"><DemoPhoto index={4} /><figcaption>A richer tone</figcaption></figure></div>
      <div className="feature-copy"><p className="utility">Your colour, considered</p><h2 id="colour-heading">Colour with<br /><em>dimension.</em></h2><p className="home-description">A subtle shift or something completely different. We consider your starting colour, hair condition and upkeep before choosing the approach.</p><p className="colour-techniques">Natural & dimensional colour / Balayage / Highlights / Blonding & lightening / Creative colour / Toning</p><Link className="text-link" to="/services">Explore Colour Services <span aria-hidden="true">↗</span></Link><p className="home-small">AI colour concepts, not before-and-after results.</p></div>
    </div></section>

    <section className="home-section hair-health container" aria-labelledby="health-heading">
      <div className="health-image"><DemoPhoto index={2} /><span className="home-small">AI editorial concept</span></div>
      <div className="feature-copy"><p className="utility">Care beyond the cut</p><h2 id="health-heading">Good hair starts<br />with healthy hair.</h2><p className="home-description">Dry lengths, a stressed scalp or colour that needs a little extra care? We’ll help you choose a treatment and a manageable routine.</p><ul className="treatment-list"><li>Repair & strengthening</li><li>Hydration & smoothing</li><li>Scalp care & colour protection</li></ul><Link className="text-link" to="/services">Explore Treatments <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="home-section hair-care-feature" aria-labelledby="care-heading"><div className="container care-layout">
      <div className="feature-copy"><p className="utility">On your bathroom shelf</p><h2 id="care-heading">The right care.<br />Between visits.</h2><p className="home-description">Professional hair care chosen for what your hair needs. No complicated routine — just products you’ll know how to use.</p><ul className="care-needs">{careNeeds.map(need => <li key={need}>{need}</li>)}</ul><Link className="text-link" to="/services">Explore Hair Care <span aria-hidden="true">↗</span></Link></div>
      <ProductDisplay />
    </div></section>

    <section className="home-section artists-section container" aria-labelledby="artists-heading">
      <div className="home-section-heading"><div><p className="utility">The people behind the work</p><h2 id="artists-heading">Meet the artists.</h2></div><Link className="text-link" to="/team">Meet the Team <span aria-hidden="true">↗</span></Link></div>
      <div className="artist-grid">{team.map(person => <article className="artist" key={person.id}><DemoPhoto collection="team" index={person.image} alt={'AI concept portrait for fictional team member ' + person.name} /><div className="artist-caption"><h3>{person.name}</h3><p className="artist-role">{person.role}</p><p className="home-small">{person.specialties}</p></div></article>)}</div>
      <p className="home-small demo-note">Demo team profiles · Names and AI-generated portraits are fictional.</p>
    </section>

    <section className="home-section experience-section" aria-labelledby="experience-heading"><div className="container">
      <div className="home-section-heading"><div><p className="utility">The Velora experience</p><h2 id="experience-heading">A good visit,<br />from start to finish.</h2></div><p className="home-description">Time to talk. Attention to detail. And advice you can actually use at home.</p></div>
      <ol className="experience-steps">{experience.map((step, i) => <li key={step.title}><span className="step-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
    </div></section>

    <section className="home-section testimonials-section container" aria-labelledby="testimonials-heading">
      <div className="home-section-heading"><h2 id="testimonials-heading">In the chair.<br /><em>In their words.</em></h2><p className="home-small">Sample testimonials for this portfolio demo.<br />These are not real client reviews.</p></div>
      <div className="testimonial-grid">{testimonials.map(item => <figure key={item.name}><blockquote><p>“{item.quote}”</p></blockquote><figcaption>{item.name}<span>{item.service} · Fictional client</span></figcaption></figure>)}</div>
    </section>

    <section className="home-section home-gallery" aria-labelledby="gallery-heading"><div className="container">
      <div className="home-section-heading"><div><p className="utility">A look around</p><h2 id="gallery-heading">Shape. Texture. Studio.</h2></div><Link className="text-link" to="/gallery">View Gallery <span aria-hidden="true">↗</span></Link></div>
      <div className="gallery-mosaic">{editorialPhotos.map((photo, index) => <figure key={photo.label} className={'gallery-tile gallery-tile-' + index}><DemoPhoto index={index} /><figcaption>{photo.label}</figcaption></figure>)}</div>
      <p className="home-small demo-note">Temporary AI-generated imagery · Not actual salon work or premises.</p>
    </div></section>

    <section className="home-section final-booking" aria-labelledby="booking-heading"><div className="container final-booking-layout">
      <div><p className="utility">Let’s talk hair</p><h2 id="booking-heading">Ready for<br /><em>your next look?</em></h2><BookingLink /><p className="home-small">Portfolio demo · Appointment enquiries are demo-only.</p></div>
      <div className="booking-practical"><h3>Start with a consultation.</h3><p>Bring an idea, a reference or a question.<br />We’ll help you work out what suits your hair.</p><address>18 Willow Lane, Brookfield, London</address><dl><div><dt>Tuesday – Friday</dt><dd>10am – 7pm</dd></div><div><dt>Saturday – Sunday</dt><dd>9am – 5pm</dd></div><div><dt>Monday</dt><dd>Closed</dd></div></dl><p className="home-small">Fictional studio details for demonstration.</p></div>
    </div></section>
  </>
}

