import LazyRasterImage from '../LazyRasterImage'
import sceneSheet from '../../assets/about-scenes.jpg'
import { aboutScenes } from '../../data/about'

// Inset viewports exclude the thin contact-sheet dividers. Each source cell is square.
// A standalone src can replace a concept without changing the page composition.
export default function AboutPhoto({ scene, src, alt, className = '' }) {
  const index = aboutScenes.findIndex(item => item.id === scene)
  const description = alt || aboutScenes[index]?.alt
  const x = (index % 3) * 100 + .6
  const y = Math.floor(index / 3) * 100 + .6
  return <div className={'about-photo ' + className}>
    {src ? <img src={src} alt={description} loading="lazy" decoding="async" />
      : <svg viewBox={x + ' ' + y + ' 98.8 98.8'} preserveAspectRatio="xMidYMid slice" role="img" aria-label={description} focusable="false">
        <LazyRasterImage href={sceneSheet} width="300" height="200" />
      </svg>}
  </div>
}

