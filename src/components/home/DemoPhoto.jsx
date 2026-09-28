import LazyRasterImage from '../LazyRasterImage'
import editorialSheet from '../../assets/home-editorials.jpg'
import teamSheet from '../../assets/home-team.jpg'
import { editorialPhotos } from '../../data/home'

// SVG viewports isolate each contact-sheet cell without stretching its proportions.
// Supply src to replace any cell with a standalone, lazy-loaded photograph.
export default function DemoPhoto({ index = 0, collection = 'editorial', alt, src, className = '' }) {
  const isTeam = collection === 'team'
  const description = alt || editorialPhotos[index].alt
  const x = (index % 3) * 100
  const y = isTeam ? 0 : Math.floor(index / 3) * 150
  return <div className={'demo-photo ' + className}>
    {src
      ? <img src={src} alt={description} loading="lazy" decoding="async" />
      : <svg viewBox={x + ' ' + y + ' 100 150'} preserveAspectRatio="xMidYMid slice" role="img" aria-label={description} focusable="false">
        <LazyRasterImage href={isTeam ? teamSheet : editorialSheet} width="300" height={isTeam ? '150' : '300'} />
      </svg>}
  </div>
}

