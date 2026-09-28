import { useState } from 'react'
import { galleryFilters, filterLooks } from '../../data/gallery'
import LookDetail from './LookDetail'
export function LookbookView({ filter, onFilter, onSelect }) {
  const looks = filterLooks(filter)
  return <section className="lookbook-collection look-container" aria-labelledby="lookbook-heading">
    <div className="look-section-heading"><div><p className="utility">The collection</p><h2 id="lookbook-heading">Find a direction.</h2></div><p className="look-copy">Follow a shape, a texture or a colour. Open a look for the details behind it.</p></div>
    <div className="look-filters" role="group" aria-label="Filter looks by technique">{galleryFilters.map(item => <button type="button" key={item} aria-pressed={filter === item} aria-controls="look-results" onClick={() => onFilter(item)}>{item}</button>)}</div>
    <p className="look-note look-status" role="status" aria-live="polite">{looks.length} looks · {filter} · AI concept collection</p>
    <ul className="look-grid" id="look-results" data-filtered={filter !== 'All'}>{looks.map((look, index) => <li key={look.id} className={'look-entry look-rhythm-' + index % 6}><button type="button" onClick={() => onSelect(look)} aria-haspopup="dialog" aria-label={'Explore ' + look.title}>
      <span className="look-image"><img src={look.image} width="358" height="539" alt={look.alt} loading="lazy" decoding="async" /></span><span className="look-caption"><span>{look.title}</span><span aria-hidden="true">↗</span></span><span className="look-category">{look.category}</span>
    </button></li>)}</ul>
  </section>
}
export default function Lookbook() {
  const [filter,setFilter] = useState('All'), [selected,setSelected] = useState(null)
  return <><LookbookView filter={filter} onFilter={setFilter} onSelect={setSelected} />{selected && <LookDetail look={selected} onClose={() => setSelected(null)} />}</>
}

