import { useState } from 'react'
import { Link } from 'react-router-dom'
import { teamFilters, filterTeam } from '../../data/team'
import TeamPortrait from './TeamPortrait'

function closeTeamProfile(event) {
  const detail = event.currentTarget.closest('details')
  if (!detail) return
  detail.open = false
  detail.querySelector('summary')?.focus()
}
export function TeamMember({ member }) {
  return <li className="artist-entry">
    <details name="velora-artist" className="artist-profile" onKeyDown={event => { if (event.key === 'Escape' && event.currentTarget.open) { event.preventDefault(); closeTeamProfile(event) } }}>
      <summary aria-label={'Explore ' + member.name + ', ' + member.role}>
        <TeamPortrait member={member} /><span className="artist-name">{member.name}<span className="artist-expand" aria-hidden="true">+</span></span>
        <span className="team-artist-role">{member.role}</span><span className="artist-specialties">{member.specialties.join(' · ')}</span>
        <span className="artist-intro">{member.intro}</span><span className="artist-profile-label">Explore profile <span aria-hidden="true">↘</span></span>
      </summary>
      <div className="artist-detail">
        <h3>About {member.name.split(' ')[0]}</h3><p>{member.bio}</p>
        <h3>Specialties</h3><ul>{member.specialties.map(s => <li key={s}>{s}</li>)}</ul>
        <h3>Signature work</h3><ul className="artist-signatures">{member.signatureWork.map(s => <li key={s.id}>{s.name}</li>)}</ul>
        <Link className="text-link" to="/services#style-library">Explore the style library on Services <span aria-hidden="true">↗</span></Link>
        <h3>Best for</h3><p>{member.bestFor}</p><h3>Approach</h3><p>{member.approach}</p>
        <Link className="booking-link" to="/book" state={{ stylistId: member.id, stylistName: member.name }}>Book with {member.name.split(' ')[0]} <span aria-hidden="true">↗</span></Link>
        <p className="team-note">Fictional profile · Availability and scheduling are not live.</p>
        <button type="button" className="artist-close" onClick={closeTeamProfile}>Close profile ↑</button>
      </div>
    </details>
  </li>
}
export function TeamFinderView({ filter, onFilter }) {
  const members = filterTeam(filter)
  return <section className="team-section team-directory" id="team-directory" aria-labelledby="artist-heading"><div className="team-container">
    <div className="team-section-heading"><div><p className="utility">Six perspectives</p><h2 id="artist-heading">Find your artist.</h2></div><p className="team-copy">Choose a specialty to find a starting point. Every artist welcomes clients of any gender.</p></div>
    <div className="artist-filters" role="group" aria-label="Filter artists by specialty">{teamFilters.map(item => <button type="button" key={item} aria-pressed={filter === item} aria-controls="artist-results" onClick={() => onFilter(item)}>{item}</button>)}</div>
    <p role="status" aria-live="polite" className="team-note artist-status">Showing {members.length} of 6 artists · {filter}</p>
    <ul className="team-artist-grid" id="artist-results" key={filter}>{members.map(member => <TeamMember key={member.id} member={member} />)}</ul>
    <p className="team-note">All people, profiles and portraits are fictional portfolio concepts. No real qualifications or availability are represented.</p>
  </div></section>
}
export default function TeamFinder() {
  const [filter, setFilter] = useState('All')
  return <TeamFinderView filter={filter} onFilter={setFilter} />
}
