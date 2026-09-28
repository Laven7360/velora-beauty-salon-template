import { useReducer, useRef } from 'react'
import { styleCollections } from '../../data/hairstyles'
import { styleLibrary, getLibraryResults, lengthFilters, textureFilters, initialLibraryState, libraryReducer } from '../../data/style-library'
import StylePortrait from '../home/StylePortrait'
import StyleDetail from './StyleDetail'

export function StyleLibraryView({ state, dispatch, revealRef }) {
  const results = getLibraryResults(state)
  const visible = results.slice(0, state.limit)
  const selected = styleLibrary.find(style => style.id === state.selectedId)
  function changeFilter(type, value) {
    if (revealRef) revealRef.current = null
    dispatch({ type, value })
  }
  function revealMore() {
    if (revealRef) revealRef.current = state.limit
    dispatch({ type: 'more' })
  }
  return <section id="style-library" className="services-section library-section" tabIndex={-1} aria-labelledby="library-heading"><div className="services-container">
    <div className="services-section-heading"><div><p className="utility">The style library</p><h2 id="library-heading">A shape to start with.</h2></div><p className="services-copy">Browse 48 references, then open a style for practical notes. Your stylist will adapt the cut to your hair and routine.</p></div>
    <div className="library-collections" role="group" aria-label="Style collection">{styleCollections.map(collection => <button key={collection.id} type="button" aria-pressed={state.collection === collection.id} aria-controls="library-results" onClick={() => changeFilter('collection', collection.id)}>{collection.label}</button>)}</div>
    <p className="services-small library-inclusion">Inspiration categories, not service restrictions. Browse either collection.</p>
    <div className="library-filter-bar">
      <div className="library-filter-group" role="group" aria-label="Filter by hair length"><span>Length</span>{lengthFilters.map(value => <button type="button" key={value} aria-pressed={state.length === value} aria-controls="library-results" onClick={() => changeFilter('length', value)}>{value}</button>)}</div>
      <div className="library-filter-group" role="group" aria-label="Filter by texture"><span>Texture</span>{textureFilters.map(value => <button type="button" key={value} aria-pressed={state.texture === value} aria-controls="library-results" onClick={() => changeFilter('texture', value)}>{value}</button>)}</div>
    </div>
    <p className="library-status" role="status" aria-live="polite" aria-atomic="true">{state.collection === 'men' ? 'Men’s styles' : 'Women’s styles'} · Showing {visible.length} of {results.length} · {state.length === 'All' ? 'All lengths' : state.length} / {state.texture === 'All' ? 'All textures' : state.texture}</p>
    {visible.length ? <ul className="library-grid" id="library-results" data-count={visible.length}>{visible.map((style, index) => <li key={style.id}>
      <button className="library-style-button" type="button" aria-haspopup="dialog" aria-label={'View ' + style.catalogueName + ' details'} onClick={() => dispatch({ type: 'open', value: style.id })}
        ref={node => { if (node && revealRef?.current === index) { node.focus({ preventScroll: true }); revealRef.current = null } }}>
        <StylePortrait style={style} /><span className="library-card-name">{style.catalogueName}<span aria-hidden="true">↗</span></span><span className="library-card-meta">{style.length} · {style.tags[0]}</span>
      </button>
    </li>)}</ul> : <div className="library-empty" id="library-results"><h3>No references in this combination yet.</h3><p>Try another length or texture. Our stylists can still help you explore the look.</p><button type="button" className="services-outline-button" onClick={() => changeFilter('reset')}>Clear filters</button></div>}
    {visible.length < results.length && <div className="library-more"><button type="button" className="services-outline-button" aria-controls="library-results" onClick={revealMore}>Show more styles <span aria-hidden="true">+</span></button></div>}
    <p className="services-small library-demo">AI-generated inspiration, not client work. Maintenance varies with growth, texture and your preferred finish.</p>
    {selected && <StyleDetail style={selected} onClose={() => dispatch({ type: 'close' })} />}
  </div></section>
}
export default function StyleLibrary() {
  const [state, dispatch] = useReducer(libraryReducer, initialLibraryState)
  const revealRef = useRef(null)
  return <StyleLibraryView state={state} dispatch={dispatch} revealRef={revealRef} />
}

