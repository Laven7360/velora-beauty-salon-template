import { styleLibrary } from './style-library'
import { serviceMenus } from './services'
const images = import.meta.glob('../assets/lookbook/*.jpg', { eager: true, query: '?url', import: 'default' })
const image = name => images['../assets/lookbook/' + name + '.jpg']
export const galleryFilters = ['All', 'Cut', 'Colour', 'Texture', 'Grooming', 'Styling']
const fresh = [
  ['caramel-movement', 'Caramel movement', 'Colour', 'Subtle caramel ribbons through medium waves, with depth kept at the root.', ['Painted highlights', 'Gloss', 'Soft waves'], 'balayage', 'men-bro-flow', 'Medium', 'Three-quarter portrait of medium wavy dark hair with caramel highlights.'],
  ['dimensional-brunette', 'Dimensional brunette', 'Colour', 'A soft transition from a deep brunette root into lighter, gently waved lengths.', ['Balayage', 'Toning', 'Wave finish'], 'balayage', 'women-layers', 'Medium', 'Long brunette hair with caramel balayage and waved ends, viewed from behind.'],
  ['burgundy-crop', 'Burgundy, cropped', 'Colour', 'Rich burgundy colour brings a new emphasis to a short, textured shape.', ['Creative colour', 'Tapered sides', 'Texture finish'], 'creative-colour', 'men-crop', 'High', 'Short burgundy textured hair with closely tapered sides, seen in profile.'],
  ['natural-volume', 'Natural volume', 'Texture', 'A rounded silhouette that gives natural coils space and definition.', ['Shape refinement', 'Curl definition'], 'curl-care', 'men-afro', 'Medium', 'Side portrait of a Black man with a rounded natural coily afro.'],
  ['quiet-upstyle', 'A quiet upstyle', 'Styling', 'A low twisted shape with a clean neckline and softly gathered detail.', ['Twist placement', 'Pinning', 'Polished finish'], 'event-styling', null, 'Medium', 'Rear view of dark hair arranged in a low twisted upstyle.'],
  ['swept-back', 'Swept back', 'Styling', 'A deliberate sweep, with a polished finish and movement through the top.', ['Directional drying', 'Hold', 'Shine'], 'smooth-finish', 'men-slick-back', 'Medium', 'Side profile showing medium dark hair styled in a glossy slick-back.'],
]
const reused = [
  ['men-low-fade', 'Grooming', 'fade-refresh', ['Low blend', 'Edge refinement'], 'High'],
  ['women-french-bob', 'Cut', 'short-cut', ['Precision perimeter', 'Fringe detail'], 'Medium'],
  ['men-crew', 'Cut', 'short-cut', ['Graduated length', 'Clean outline'], 'Low'],
  ['women-curly-bob', 'Texture', 'medium-cut', ['Curl shaping', 'Volume balance'], 'Medium'],
  ['men-curly-fade', 'Grooming', 'fade-refresh', ['Fade blending', 'Natural texture'], 'High'],
  ['women-face-layers', 'Cut', 'long-cut', ['Face framing', 'Long layers'], 'Medium'],
  ['men-quiff', 'Styling', 'texture-styling', ['Root lift', 'Directional styling'], 'Medium'],
  ['women-textured-pixie', 'Cut', 'short-cut', ['Short layers', 'Texture refinement'], 'Medium'],
  ['men-shag', 'Texture', 'long-cut', ['Layering', 'Natural movement'], 'Low'],
  ['women-u-shape', 'Cut', 'long-cut', ['Rounded perimeter', 'Length retention'], 'Low'],
  ['men-side-part', 'Grooming', 'clipper-refresh', ['Graduation', 'Side part'], 'Medium'],
  ['women-natural-curls', 'Texture', 'curl-care', ['Curl definition', 'Shape balance'], 'Medium'],
]
const services = Object.values(serviceMenus).flat()
export const galleryEntries = [
  ...fresh.map(([id,title,category,description,techniques,serviceId,styleId,maintenance,alt], index) => ({ id,title,category,description,techniques,serviceId,styleId,maintenance,alt,image:image('look-' + String(index + 1).padStart(2,'0')) })),
  ...reused.map(([styleId,category,serviceId,techniques,maintenance], index) => {
    const style = styleLibrary.find(item => item.id === styleId)
    return { id: styleId, title: style.catalogueName, category, description: style.description, techniques, serviceId, styleId, maintenance, alt: style.alt, image: image('look-' + String(index + 7).padStart(2,'0')) }
  }),
].map(look => ({ ...look, relatedService: services.find(service => service.id === look.serviceId), relatedStyle: styleLibrary.find(style => style.id === look.styleId) }))
export const transformation = { before: image('before'), after: image('after') }
export function filterLooks(filter) { return galleryEntries.filter(look => filter === 'All' || look.category === filter) }
export function getLook(id) { return galleryEntries.find(look => look.id === id) }
export function lookBookingUrl(look) { return '/book?look=' + encodeURIComponent(look.id) }

