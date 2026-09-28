import { Link } from 'react-router-dom'
import BookingLink from '../components/BookingLink'
import AboutPhoto from '../components/about/AboutPhoto'
import TeamPortrait from '../components/team/TeamPortrait'
import TeamFinder from '../components/team/TeamFinder'
import { teamMembers, specialtySteps } from '../data/team'
import '../styles/team.css'

export default function Team() {
  return <div className="team-page">
    <section className="team-hero team-container" aria-labelledby="team-title">
      <div className="team-hero-heading"><p className="utility">Our team</p><h1 id="team-title">Different hands.<br /><em>One standard.</em></h1><p className="team-copy">Different strengths in cutting, colour, texture, grooming and care. A shared habit of listening first.</p><a href="#team-directory" className="text-link">Meet your artist <span aria-hidden="true">↓</span></a></div>
      <div className="team-hero-portraits"><figure><TeamPortrait member={teamMembers[0]} eager /><figcaption>Maya · Shape & direction</figcaption></figure><figure><TeamPortrait member={teamMembers[3]} eager /><figcaption>Rowan · Colour & finish</figcaption></figure><span className="team-hero-caption utility">Individual craft. Shared care.</span></div>
    </section>
    <section className="team-introduction team-container team-section"><p className="utility">People before the process</p><div><h2>The right stylist starts with<br />the right conversation.</h2><p className="team-copy">Choose by service, technique or the result you have in mind. Tell us about your texture, the styles you enjoy and your everyday routine. There is no need to fit a category to find a good fit.</p></div></section>
    <TeamFinder />
    <section className="team-collaboration team-section"><div className="team-container"><div className="team-section-heading"><div><p className="utility">A considered combination</p><h2>One look can take more<br />than one specialty.</h2></div><p className="team-copy">A cut, colour and care plan can work together. Your appointment may combine complementary services; it does not always need several stylists.</p></div><ol className="team-process">{specialtySteps.map(([title, subtitle, copy], i) => <li key={title}><span className="utility">0{i + 1} / {title}</span><h3>{subtitle}</h3><p>{copy}</p></li>)}</ol><Link to="/services" className="text-link">Explore the service menu <span aria-hidden="true">↗</span></Link></div></section>
    <section className="team-section team-container team-culture" aria-labelledby="chair-heading"><div className="team-section-heading"><div><p className="utility">The everyday work</p><h2 id="chair-heading">Behind the chair.</h2></div><p className="team-copy">Time to listen. Space to exchange ideas. Attention to the last detail.</p></div><div className="team-culture-grid">{[['consultation','A conversation before a change.'],['cutting','Shape, refined a little at a time.'],['colour','Thoughtful placement.']].map(([scene,caption]) => <figure key={scene}><AboutPhoto scene={scene} /><figcaption>{caption}</figcaption></figure>)}</div><p className="team-note">AI-generated studio moments · Fictional people and premises.</p></section>
    <section className="team-first-visit team-section team-container"><div><p className="utility">Your first visit</p><h2>Not sure who to book?</h2></div><div><p className="team-copy">Start with your preferred service, a reference or a conversation. In the Velora demo salon, the team would use that starting point to suggest a suitable specialist.</p><p className="team-note">This portfolio does not offer live stylist matching or appointments.</p><Link to="/book" className="text-link">Start with a Consultation <span aria-hidden="true">↗</span></Link></div></section>
    <section className="team-final team-section"><div className="team-container"><p className="utility">A good fit starts here</p><h2>Found your artist?</h2><div className="team-final-actions"><BookingLink /><Link to="/services" className="text-link">Explore Services <span aria-hidden="true">↗</span></Link></div><p className="team-note">Your hair, your direction. Fictional studio · Portfolio demo.</p></div></section>
  </div>
}

