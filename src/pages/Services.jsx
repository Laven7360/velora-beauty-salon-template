import { Link } from 'react-router-dom'
import BookingLink from '../components/BookingLink'
import ServicePriceList from '../components/services/ServicePriceList'
import StyleLibrary from '../components/services/StyleLibrary'
import ColourGuide from '../components/services/ColourGuide'
import DemoPhoto from '../components/home/DemoPhoto'
import ProductDisplay from '../components/home/ProductDisplay'
import { serviceMenus, serviceNavigation, hairCareCategories } from '../data/services'
import '../styles/services.css'

export default function Services() {
  return <div className="services-page">
    <section className="services-hero services-container" aria-labelledby="services-title">
      <div><p className="utility">Services</p><h1 id="services-title">Start with what<br />your hair needs.</h1><p className="services-copy">Cuts, colour and care shaped around length, texture, condition and the result you want. Thoughtful service, without unnecessary gender-based pricing.</p><BookingLink /></div>
      <aside className="services-pricing-note" aria-labelledby="pricing-note-title"><p className="utility">Before you choose</p><h2 id="pricing-note-title">A clear starting point.</h2><p>Prices shown are indicative Malaysian starting prices in RM for this fictional portfolio demo.</p><p>Final pricing may vary with hair length, density, condition, product usage, technique and service complexity. A consultation confirms the service plan and price.</p><a className="text-link" href="#service-consultation">Not sure what to book? <span aria-hidden="true">↓</span></a></aside>
    </section>
    <nav className="services-jump-nav" aria-label="Service sections"><div className="services-container">{serviceNavigation.map(item => <a key={item.id} href={'#' + item.id} onClick={() => document.getElementById(item.id)?.focus({ preventScroll: true })}>{item.label}</a>)}</div></nav>

    <section id="cut-style" className="services-section services-container services-menu-layout" tabIndex={-1} aria-labelledby="cut-heading">
      <div className="services-menu-intro"><p className="utility">Cut & Style</p><h2 id="cut-heading">Shape, balance<br />and a good finish.</h2><p className="services-copy">Choose by length or the change you have in mind. We’ll confirm the right service together.</p><figure className="services-cut-photo"><DemoPhoto index={0} /><figcaption>AI style concept</figcaption></figure></div>
      <ServicePriceList items={serviceMenus.cut} />
    </section>

    <StyleLibrary />

    <section id="colour" className="services-section services-colour" tabIndex={-1} aria-labelledby="colour-services-heading"><div className="services-container">
      <div className="services-menu-layout"><div className="services-menu-intro"><p className="utility">Colour</p><h2 id="colour-services-heading">Subtle dimension.<br /><em>Something bolder.</em></h2><p className="services-copy">Choose a direction, then let’s discuss the starting point. Preparation, placement and upkeep matter as much as the shade.</p><figure className="services-colour-photo"><DemoPhoto index={4} /><figcaption>AI colour inspiration · Not a service result</figcaption></figure></div><ServicePriceList items={serviceMenus.colour} /></div>
      <ColourGuide />
    </div></section>

    <section id="treatments" className="services-section services-container" tabIndex={-1} aria-labelledby="treatment-services-heading">
      <div className="services-section-heading"><div><p className="utility">Treatments</p><h2 id="treatment-services-heading">Care with a purpose.</h2></div><p className="services-copy">Start with what your hair or scalp needs. We’ll help you choose a useful treatment, without adding unnecessary steps.</p></div>
      <ServicePriceList items={serviceMenus.treatments} className="price-list-two-columns" />
    </section>

    <div className="services-finish-band"><div className="services-container services-paired-menus">
      <section id="grooming" className="services-section" tabIndex={-1} aria-labelledby="grooming-heading"><p className="utility">Grooming</p><h2 id="grooming-heading">Keep the detail sharp.</h2><p className="services-copy">Clean edges, a fresh blend or a considered beard shape. Book the detail you need.</p><ServicePriceList items={serviceMenus.grooming} /></section>
      <section id="style-finish" className="services-section" tabIndex={-1} aria-labelledby="finish-heading"><p className="utility">Style & Finish</p><h2 id="finish-heading">A finish for your plans.</h2><p className="services-copy">Everyday polish or something for an occasion. Time and technique depend on length and complexity.</p><ServicePriceList items={serviceMenus.finish} /></section>
    </div></div>

    <section id="hair-care" className="services-section services-container" tabIndex={-1} aria-labelledby="hair-care-heading">
      <div className="services-product-intro"><div><p className="utility">Hair Care</p><h2 id="hair-care-heading">A routine that<br />works for you.</h2><p className="services-copy">Professional care selected around your hair, not a label. Ask your stylist what to use, how much and how often.</p><p className="services-small">Fictional Velora product concepts. No online shop or purchase functionality.</p></div><ProductDisplay /></div>
      <dl className="services-care-needs">{hairCareCategories.map(([name, description]) => <div key={name}><dt>{name}</dt><dd>{description}</dd></div>)}</dl>
    </section>

    <section id="service-consultation" className="services-section services-consultation" tabIndex={-1} aria-labelledby="services-consultation-heading"><div className="services-container">
      <div><p className="utility">A conversation first</p><h2 id="services-consultation-heading">Not sure what to book?</h2><p className="services-copy">Start with a consultation for a major restyle, colour correction, significant lightening or creative colour. It’s also the right place to discuss changes in texture or condition, or simply to choose between services.</p></div><Link className="booking-link" to="/book">Start with a Consultation <span aria-hidden="true">↗</span></Link>
    </div></section>

    <section className="services-section services-container services-final" aria-labelledby="services-final-heading">
      <div><p className="utility">Your next appointment</p><h2 id="services-final-heading">Found your direction?</h2><div className="services-final-actions"><BookingLink /><Link className="text-link" to="/book">Talk Through a Change <span aria-hidden="true">↗</span></Link></div><p className="services-small">Portfolio demo · Appointment enquiries are demo-only.</p></div>
      <div className="services-practical"><p>18 Willow Lane, Brookfield, London</p><p>Tue – Fri · 10am – 7pm<br />Sat – Sun · 9am – 5pm<br />Monday · Closed</p><span className="services-small">Fictional studio details. Appointments recommended.</span></div>
    </section>
  </div>
}

