import { useReducer } from 'react'
import { Link } from 'react-router-dom'
import { styleCollections, filterHairstyles, getStyleFilters, initialStyleState, styleFinderReducer } from '../../data/hairstyles'
import StylePortrait from './StylePortrait'
import '../../styles/style-finder.css'

// Native pressed buttons support Tab, Enter and Space without a custom tab model.
export function StyleFinderView({ state, dispatch }) {
  const { collection, filter, expanded } = state
  const activeCollection = styleCollections.find(item => item.id === collection)
  const matchingStyles = filterHairstyles(collection, filter).slice(0, 8)
  const visibleStyles = filter === 'All' && !expanded ? matchingStyles.slice(0, 4) : matchingStyles
  const canExpand = filter === 'All' && matchingStyles.length > 4
  return <section className="home-section style-finder" aria-labelledby="style-heading">
    <div className="container">
      <div className="home-section-heading"><div><p className="utility">Style inspiration</p><h2 id="style-heading">Find your next cut.</h2></div><p className="home-description">Browse a shape you like. We’ll help you adapt it to your hair, texture and everyday routine.</p></div>
      <div className="style-collections" role="group" aria-label="Hairstyle collection">
        {styleCollections.map(item => <button key={item.id} type="button" aria-pressed={collection === item.id} aria-controls="style-results" onClick={() => dispatch({ type: 'collection', value: item.id })}>{item.label}</button>)}
      </div>
      <p className="style-inclusion home-small">Browse either collection. All styles and services are tailored to you.</p>
      <div className="style-filters" role="group" aria-label="Filter by length or texture">
        {getStyleFilters(collection).map(option => <button key={option} type="button" aria-pressed={filter === option} aria-controls="style-results" onClick={() => dispatch({ type: 'filter', value: option })}>{option}</button>)}
      </div>
      <div className="style-results-heading"><h3 id="style-collection-heading">{activeCollection.heading}</h3><p className="style-result-count" role="status" aria-live="polite" aria-atomic="true">{activeCollection.heading} · {visibleStyles.length < matchingStyles.length ? `${visibleStyles.length} of ${matchingStyles.length}` : visibleStyles.length} {visibleStyles.length === 1 ? 'style' : 'styles'} · {filter}</p></div>
      <ul id="style-results" className="style-grid" data-count={visibleStyles.length} aria-labelledby="style-collection-heading" key={collection + filter + expanded}>
        {visibleStyles.map(style => <li className="style-item" key={style.id}><StylePortrait style={style} /><h4>{style.name}</h4><p>{style.length} · {style.tags[0]}</p></li>)}
      </ul>
      {canExpand && <div className="style-preview-action"><button type="button" className="style-expand" aria-expanded={Boolean(expanded)} aria-controls="style-results" onClick={() => dispatch({ type: 'toggle-preview' })}>{expanded ? 'Show fewer styles' : `View all ${collection === 'men' ? 'men’s' : 'women’s'} styles`}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button></div>}
      <div className="section-end"><p className="home-small">AI-generated style references, not client results.<br />Your final cut is shaped in consultation.</p><Link className="text-link" to="/services">Explore All Styles <span aria-hidden="true">↗</span></Link></div>
      <p className="home-small catalogue-note">The full style catalogue is coming to our Services page.</p>
    </div>
  </section>
}
export default function StyleFinder() {
  const [state, dispatch] = useReducer(styleFinderReducer, initialStyleState)
  return <StyleFinderView state={state} dispatch={dispatch} />
}

