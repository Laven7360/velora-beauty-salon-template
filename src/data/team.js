import { team as homeTeam } from './home'
import { styleLibrary } from './style-library'
import originals from '../assets/home-team.jpg'
import additions from '../assets/team-artists.jpg'

export const teamFilters = ['All', 'Precision Cutting', 'Colour', 'Texture', 'Fades & Grooming', 'Creative Styling', 'Hair Health']
const profiles = [
  { ...homeTeam[0], filters: ['Precision Cutting', 'Creative Styling'], specialties: ['Short precision cuts', 'Bobs & restyles', 'Creative finishing'], bio: 'Maya enjoys the small decisions that change a silhouette: the weight of a fringe, a clean perimeter, a little more movement. She brings a considered eye to both subtle updates and bigger changes.', intro: 'Considered shapes, with room for your personality.', signatureStyles: ['women-pixie', 'women-bob', 'men-french'], bestFor: 'A precise short cut, a new bob or a restyle with a clear shape.', approach: 'Bring a reference and tell Maya what you like about it. Together you can translate the idea into a cut that fits your growth patterns and daily routine.' },
  { ...homeTeam[1], filters: ['Fades & Grooming', 'Precision Cutting', 'Texture'], specialties: ['Fades & tapering', 'Clipper work', 'Short texture'], bio: 'Leo pays attention to how a cut settles between visits. His work moves from soft tapers to close clipper shapes, with carefully finished edges and texture through the top.', intro: 'Clean detail. Texture that still feels like you.', signatureStyles: ['men-taper', 'men-buzz', 'men-crop'], bestFor: 'A fade refresh, short textured cut or hair-and-beard combination.', approach: 'Leo starts with the outline you want and how often you prefer to return, then talks through blending, length and home styling.' },
  { ...homeTeam[2], filters: ['Colour', 'Texture', 'Hair Health'], specialties: ['Dimensional colour', 'Curl care', 'Condition-led treatments'], bio: 'Nia likes colour that has depth and hair that keeps its character. She pairs thoughtful placement with attention to curl pattern, existing colour and a manageable care routine.', intro: 'Colour and care, considered together.', signatureStyles: ['women-curly', 'women-layers'], bestFor: 'Dimensional colour, curl-friendly shaping or a colour-care consultation.', approach: 'Expect a conversation about your colour history and routine before a recommendation. Nia makes space to discuss maintenance as well as the first-day result.' },
  { id: 'rowan', name: 'Rowan Park', role: 'Colourist & Styling Specialist', filters: ['Colour', 'Creative Styling'], specialties: ['Balayage & blonding', 'Creative colour', 'Event finishing'], bio: 'Rowan enjoys building a colour direction from small references: a warmer tone, softer contrast or a bolder placement. Finishing is part of the plan, so the colour moves with the cut.', intro: 'From quiet dimension to a bolder colour direction.', signatureStyles: ['women-butterfly', 'men-curtains'], bestFor: 'Balayage, a blonding consultation, creative colour or an occasion finish.', approach: 'Rowan talks through the starting colour, possible stages and upkeep before planning a change. An achievable direction comes first.' },
  { id: 'amara', name: 'Amara Shah', role: 'Texture & Cutting Specialist', filters: ['Texture', 'Precision Cutting', 'Creative Styling'], specialties: ['Curly & textured cuts', 'Layered shapes', 'Short restyles'], bio: 'Amara works with movement, density and the way hair naturally sits. From compact crops to fuller layered shapes, she enjoys finding a balance that gives texture room to show.', intro: 'Shape that works with natural movement.', signatureStyles: ['women-curly', 'women-wolf', 'men-crop'], bestFor: 'Curly layers, a textured restyle or a softer, lived-in shape.', approach: 'Amara asks how you dry and wear your hair, then discusses length, shrinkage and where you want volume before choosing the shape.' },
  { id: 'ellis', name: 'Ellis Morgan', role: 'Care & Finish Specialist', filters: ['Hair Health', 'Creative Styling', 'Fades & Grooming'], specialties: ['Treatments & aftercare', 'Waves & finishing', 'Beard shaping'], bio: 'Ellis focuses on the details that make a service feel complete: a comfortable care routine, a well-judged finish and useful advice to take home. His work spans styling, treatments and grooming.', intro: 'A thoughtful finish, and a routine you can keep.', signatureStyles: ['men-pompadour', 'women-layers'], bestFor: 'A treatment and finish, event waves or careful beard shaping.', approach: 'Ellis keeps recommendations practical, choosing care and styling around your hair condition, preferences and the time you have.' },
]
export const teamMembers = profiles.map((member, index) => ({
  ...member, portrait: { src: index < 3 ? originals : additions, cell: index % 3 },
  alt: 'Fictional portrait of ' + member.name + ', ' + member.role.toLowerCase() + '.',
  signatureWork: member.signatureStyles.map(id => {
    const style = styleLibrary.find(item => item.id === id)
    return { id: style.id, name: style.catalogueName }
  }),
}))
export function filterTeam(filter = 'All') {
  return teamMembers.filter(member => filter === 'All' || member.filters.includes(filter))
}
export const specialtySteps = [
  ['Cut', 'Shape & movement', 'Length, weight and layers set the foundation.'],
  ['Colour', 'Dimension & tone', 'Placement brings out the shape and your chosen direction.'],
  ['Treatment', 'Condition & care', 'Care is selected around the hair you arrive with.'],
  ['Finish', 'Texture & styling', 'The final detail, with advice for recreating it.'],
]

