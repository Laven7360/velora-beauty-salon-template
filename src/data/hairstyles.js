import menPortraits from '../assets/styles-men.jpg'
import womenPortraits from '../assets/styles-women.jpg'

export const styleCollections = [
  { id: 'men', label: 'Men', heading: "Men’s styles" },
  { id: 'women', label: 'Women', heading: "Women’s styles" },
]
export const styleFilters = ['All', 'Short', 'Medium', 'Long', 'Curly', 'Textured']
const portrait = (src, cell) => ({ src, cell, columns: 4, rows: 2 })
export const hairstyles = [
  { id: 'men-buzz', name: 'Buzz Cut', collection: 'men', length: 'Short', texture: ['Straight'], tags: ['Close-cut'], image: portrait(menPortraits, 0), alt: 'Buzz cut with uniformly close-clipped hair and a clean hairline.' },
  { id: 'men-crop', name: 'Textured Crop', collection: 'men', length: 'Short', texture: ['Textured'], tags: ['Textured', 'Choppy fringe'], image: portrait(menPortraits, 1), alt: 'Short brown textured crop with choppy layers and a broken fringe.' },
  { id: 'men-taper', name: 'Taper Fade', collection: 'men', length: 'Short', texture: ['Curly', 'Textured'], tags: ['Tapered', 'Curly top'], image: portrait(menPortraits, 2), alt: 'Taper fade with graduated sides and a short, naturally curly top.' },
  { id: 'men-curtains', name: 'Curtains', collection: 'men', length: 'Medium', texture: ['Straight'], tags: ['Centre-parted'], image: portrait(menPortraits, 3), alt: 'Medium-length black hair with a centre part and curved curtain sections.' },
  { id: 'men-french', name: 'French Crop', collection: 'men', length: 'Short', texture: ['Straight', 'Textured'], tags: ['Blunt fringe'], image: portrait(menPortraits, 4), alt: 'French crop with a short textured top and a blunt horizontal fringe.' },
  { id: 'men-undercut', name: 'Undercut', collection: 'men', length: 'Medium', texture: ['Straight'], tags: ['Disconnected'], image: portrait(menPortraits, 5), alt: 'Undercut with a long slicked-back top and closely clipped, disconnected sides.' },
  { id: 'men-pompadour', name: 'Pompadour', collection: 'men', length: 'Medium', texture: ['Straight'], tags: ['Volume'], image: portrait(menPortraits, 6), alt: 'Pompadour with a high swept-back top and neatly tapered sides.' },
  { id: 'men-mullet', name: 'Modern Mullet', collection: 'men', length: 'Medium', texture: ['Wavy', 'Textured'], tags: ['Textured', 'Longer nape'], image: portrait(menPortraits, 7), alt: 'Modern wavy mullet with short sides and textured length at the nape.' },
  { id: 'women-pixie', name: 'Pixie Cut', collection: 'women', length: 'Short', texture: ['Textured'], tags: ['Cropped'], image: portrait(womenPortraits, 0), alt: 'Short pixie cut with close sides and a softly swept textured fringe.' },
  { id: 'women-bob', name: 'Bob', collection: 'women', length: 'Medium', texture: ['Straight'], tags: ['Soft shape'], image: portrait(womenPortraits, 1), alt: 'Soft chin-length brown bob with a side part and gently curved ends.' },
  { id: 'women-bangs', name: 'Curtain Bangs', collection: 'women', length: 'Medium', texture: ['Wavy'], tags: ['Face-framing'], image: portrait(womenPortraits, 2), alt: 'Shoulder-length dark hair with parted curtain bangs framing the face.' },
  { id: 'women-butterfly', name: 'Butterfly Cut', collection: 'women', length: 'Long', texture: ['Wavy'], tags: ['Layered', 'Face-framing'], image: portrait(womenPortraits, 3), alt: 'Long blonde butterfly cut with shorter face-framing layers and feathered lengths.' },
  { id: 'women-wolf', name: 'Wolf Cut', collection: 'women', length: 'Medium', texture: ['Wavy', 'Textured'], tags: ['Shaggy', 'Layered'], image: portrait(womenPortraits, 4), alt: 'Medium shaggy wolf cut with textured bangs, a full crown and tapered ends.' },
  { id: 'women-layers', name: 'Long Layers', collection: 'women', length: 'Long', texture: ['Straight'], tags: ['Layered'], image: portrait(womenPortraits, 5), alt: 'Long brown hair with graduated layers extending past the chest.' },
  { id: 'women-blunt', name: 'Blunt Bob', collection: 'women', length: 'Medium', texture: ['Straight'], tags: ['Precision'], image: portrait(womenPortraits, 6), alt: 'Sleek centre-parted blunt bob with a sharp, even perimeter above the shoulders.' },
  { id: 'women-curly', name: 'Curly Layers', collection: 'women', length: 'Medium', texture: ['Curly', 'Textured'], tags: ['Curly', 'Layered'], image: portrait(womenPortraits, 7), alt: 'Defined shoulder-length natural curls shaped into rounded, graduated layers.' },
]
export function filterHairstyles(collection, filter = 'All') {
  return hairstyles.filter(style => style.collection === collection &&
    (filter === 'All' || style.length === filter || style.texture.includes(filter) || style.tags.includes(filter)))
}
export function getStyleFilters(collection) {
  return styleFilters.filter(filter => filter === 'All' || filterHairstyles(collection, filter).length > 0)
}
export const initialStyleState = { collection: 'men', filter: 'All', expanded: false }
export function styleFinderReducer(state, action) {
  if (action.type === 'collection' && styleCollections.some(item => item.id === action.value)) {
    return { collection: action.value, filter: 'All', expanded: false }
  }
  if (action.type === 'filter' && getStyleFilters(state.collection).includes(action.value)) {
    return { ...state, filter: action.value, expanded: false }
  }
  if (action.type === 'toggle-preview' && state.filter === 'All') {
    return { ...state, expanded: !state.expanded }
  }
  return state
}

