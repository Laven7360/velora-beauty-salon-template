import { colourGroups } from '../../data/services'
export default function ColourGuide() {
  return <div className="colour-guide" aria-labelledby="colour-guide-title"><div><p className="utility">A starting palette</p><h3 id="colour-guide-title">Find a tone you’re drawn to.</h3></div>
    <div className="colour-guide-groups">{colourGroups.map(group => <div key={group.name}><h4>{group.name}</h4><ul>{group.shades.map(([name, colour]) => <li key={name}><span className="colour-swatch" style={{ backgroundColor: colour }} aria-hidden="true" /><span>{name}</span></li>)}</ul></div>)}</div>
    <p className="services-small">Illustrative swatches only. Results depend on starting colour, hair condition and the lightening process required.</p>
  </div>
}

