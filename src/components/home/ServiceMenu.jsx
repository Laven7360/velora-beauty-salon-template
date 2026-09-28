import { useState } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../../data/home'
import DemoPhoto from './DemoPhoto'

export default function ServiceMenu() {
  const [selected, setSelected] = useState(services[0])
  return <section className="home-section home-services" aria-labelledby="service-heading"><div className="container">
    <div className="home-section-heading"><div><p className="utility">The service menu</p><h2 id="service-heading">Made for your hair.</h2></div><Link className="text-link" to="/services">View All Services <span aria-hidden="true">↗</span></Link></div>
    <div className="service-menu-layout">
      <div className="service-menu" role="group" aria-label="Preview a service">
        {services.map((service, index) => <button className="service-row" type="button" key={service.id} aria-pressed={selected.id === service.id} aria-controls="service-visual" onClick={() => setSelected(service)} onFocus={() => setSelected(service)}>
          <span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className="service-row-copy"><span className="service-name">{service.name}</span><span className="service-description">{service.description}</span></span>
          <span className="service-indicator" aria-hidden="true">↗</span>
        </button>)}
      </div>
      <figure className="service-visual" id="service-visual"><DemoPhoto index={selected.image} /><figcaption><span>{selected.caption}</span><span className="home-small">AI editorial concept</span></figcaption></figure>
    </div>
  </div></section>
}

