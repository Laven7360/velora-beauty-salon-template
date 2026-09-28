import { hairstyles as homeStyles } from './hairstyles'
import menA from '../assets/library-men-a.jpg'
import menB from '../assets/library-men-b.jpg'
import womenA from '../assets/library-women-a.jpg'
import womenB from '../assets/library-women-b.jpg'

const sheets = [menA, menB, womenA, womenB]
const additions = [
  [
    "men-crew",
    "Crew Cut",
    "men",
    "Short",
    [
      "Straight"
    ],
    "Graduated",
    "A short upright top with neatly graduated sides.",
    "How much length to keep at the front.",
    0,
    0
  ],
  [
    "men-caesar",
    "Caesar Cut",
    "men",
    "Short",
    [
      "Straight"
    ],
    "Forward fringe",
    "An even, forward-styled shape with a short horizontal fringe.",
    "Fringe length and the direction your hair naturally grows.",
    0,
    1
  ],
  [
    "men-ivy",
    "Ivy League",
    "men",
    "Short",
    [
      "Straight"
    ],
    "Side-parted",
    "A neat, short cut with enough top length for a soft side part.",
    "The balance between a clipped edge and a softer taper.",
    0,
    2
  ],
  [
    "men-low-fade",
    "Low Fade",
    "men",
    "Short",
    [
      "Wavy",
      "Textured"
    ],
    "Low blend",
    "A close blend kept low around the ears and nape.",
    "Where the fade should begin and how much top to keep.",
    0,
    3
  ],
  [
    "men-mid-fade",
    "Mid Fade",
    "men",
    "Short",
    [
      "Wavy",
      "Textured"
    ],
    "Mid blend",
    "A graduated fade that rises midway up the sides.",
    "Fade height and how often you want the edges refreshed.",
    0,
    4
  ],
  [
    "men-high-fade",
    "High Fade",
    "men",
    "Short",
    [
      "Curly",
      "Textured"
    ],
    "High contrast",
    "A high blend that creates a stronger contrast with the top.",
    "The transition point and your preferred top shape.",
    0,
    5
  ],
  [
    "men-skin-fade",
    "Skin Fade",
    "men",
    "Short",
    [
      "Curly",
      "Textured"
    ],
    "Close blend",
    "A blend from bare skin into a short, denser top.",
    "Skin exposure and the upkeep needed for a sharp finish.",
    0,
    6
  ],
  [
    "men-side-part",
    "Side Part",
    "men",
    "Medium",
    [
      "Straight"
    ],
    "Parted",
    "A defined part with a tidy, balanced shape through the sides.",
    "Your natural part and whether you prefer a soft or crisp finish.",
    0,
    7
  ],
  [
    "men-comb-over",
    "Comb Over",
    "men",
    "Medium",
    [
      "Straight"
    ],
    "Swept",
    "A longer top swept across a clear side part.",
    "Top length, volume and a hold product that suits your routine.",
    1,
    0
  ],
  [
    "men-quiff",
    "Quiff",
    "men",
    "Medium",
    [
      "Wavy",
      "Textured"
    ],
    "Lifted",
    "Lift at the front with a looser, textured finish through the top.",
    "Blow-drying technique and how much lift your hair can hold.",
    1,
    1
  ],
  [
    "men-slick-back",
    "Slick Back",
    "men",
    "Medium",
    [
      "Straight"
    ],
    "Swept back",
    "A smooth shape combed away from the face.",
    "A workable top length and the difference between soft and firm hold.",
    1,
    2
  ],
  [
    "men-bro-flow",
    "Bro Flow",
    "men",
    "Medium",
    [
      "Wavy"
    ],
    "Natural movement",
    "Ear-to-neck length with a relaxed, swept-back flow.",
    "How to grow out the sides without losing shape.",
    1,
    3
  ],
  [
    "men-curly-crop",
    "Curly Crop",
    "men",
    "Short",
    [
      "Curly",
      "Textured"
    ],
    "Curly fringe",
    "A compact curl shape with a textured fringe and shorter sides.",
    "Curl shrinkage and how much fringe to leave when dry.",
    1,
    4
  ],
  [
    "men-curly-fade",
    "Curly Fade",
    "men",
    "Short",
    [
      "Curly",
      "Textured"
    ],
    "Curly top",
    "Defined curls above a close, clean fade.",
    "How to balance curl volume with the fade height.",
    1,
    5
  ],
  [
    "men-afro",
    "Afro / Natural Shape",
    "men",
    "Medium",
    [
      "Curly",
      "Textured"
    ],
    "Rounded",
    "A rounded outline shaped around natural coils and density.",
    "Your dry shape, shrinkage and the volume you want to keep.",
    1,
    6
  ],
  [
    "men-shag",
    "Shag",
    "men",
    "Long",
    [
      "Wavy",
      "Textured"
    ],
    "Layered",
    "Loose, feathered layers with a longer fringe and relaxed movement.",
    "Layer placement and how the fringe works with your natural texture.",
    1,
    7
  ],
  [
    "women-bixie",
    "Bixie",
    "women",
    "Short",
    [
      "Textured"
    ],
    "Layered",
    "A short, softly layered shape between a pixie and a bob.",
    "Length around the ears and how the shape will grow out.",
    2,
    0
  ],
  [
    "women-french-bob",
    "French Bob",
    "women",
    "Short",
    [
      "Straight"
    ],
    "Fringe",
    "A jaw-length bob paired with a short fringe.",
    "Where the perimeter sits and the fringe length you prefer.",
    2,
    1
  ],
  [
    "women-layered-bob",
    "Layered Bob",
    "women",
    "Medium",
    [
      "Wavy",
      "Textured"
    ],
    "Layered",
    "A chin-length outline with lighter, graduated layers.",
    "How to add movement while keeping enough weight at the ends.",
    2,
    2
  ],
  [
    "women-lob",
    "Lob",
    "women",
    "Medium",
    [
      "Straight"
    ],
    "Collarbone length",
    "A longer bob that sits around the collarbone.",
    "A length that works both worn down and tied back.",
    2,
    3
  ],
  [
    "women-shag",
    "Shag",
    "women",
    "Medium",
    [
      "Wavy",
      "Textured"
    ],
    "Feathered",
    "A shoulder-length layered shape with a soft, textured fringe.",
    "Crown volume and how short the face-framing layers should be.",
    2,
    4
  ],
  [
    "women-mullet",
    "Modern Mullet",
    "women",
    "Medium",
    [
      "Wavy",
      "Textured"
    ],
    "Contrasting lengths",
    "Shorter sides and crown with visible length through the back.",
    "How subtle or pronounced you want the difference in lengths.",
    2,
    5
  ],
  [
    "women-face-layers",
    "Face-Framing Layers",
    "women",
    "Long",
    [
      "Wavy"
    ],
    "Face-framing",
    "Graduated pieces around the face while retaining longer lengths.",
    "The starting point for the shortest layer and your usual parting.",
    2,
    6
  ],
  [
    "women-wispy-bangs",
    "Wispy Bangs",
    "women",
    "Long",
    [
      "Straight"
    ],
    "Light fringe",
    "A light, separated fringe with longer hair around it.",
    "Fringe density, growth direction and daily styling.",
    2,
    7
  ],
  [
    "women-blunt-bangs",
    "Blunt Bangs",
    "women",
    "Medium",
    [
      "Straight"
    ],
    "Full fringe",
    "A fuller, straight fringe with a defined horizontal edge.",
    "Where the fringe should sit when dry and how often to trim it.",
    3,
    0
  ],
  [
    "women-straight-long",
    "Straight Long Cut",
    "women",
    "Long",
    [
      "Straight"
    ],
    "Even perimeter",
    "Long, straight lengths with a clean, level bottom edge.",
    "How much length to keep and how to maintain the ends.",
    3,
    1
  ],
  [
    "women-u-shape",
    "U-Shaped Cut",
    "women",
    "Long",
    [
      "Straight"
    ],
    "Rounded perimeter",
    "A softly rounded perimeter that keeps length through the centre.",
    "The depth of the curve and whether you want internal layers.",
    3,
    2
  ],
  [
    "women-v-shape",
    "V-Shaped Cut",
    "women",
    "Long",
    [
      "Straight"
    ],
    "Pointed perimeter",
    "Long hair shaped into a more defined point at the back.",
    "How deep the V should be and how the sides look from the front.",
    3,
    3
  ],
  [
    "women-curly-bob",
    "Curly Bob",
    "women",
    "Medium",
    [
      "Curly",
      "Textured"
    ],
    "Rounded",
    "A compact, chin-length shape designed around natural curls.",
    "Dry length, shrinkage and the width of the silhouette.",
    3,
    4
  ],
  [
    "women-textured-pixie",
    "Textured Pixie",
    "women",
    "Short",
    [
      "Textured"
    ],
    "Choppy",
    "A close cut with airy, separated pieces through the crown.",
    "Fringe direction and a light product for separation.",
    3,
    5
  ],
  [
    "women-natural-curls",
    "Natural Curls / Shape",
    "women",
    "Medium",
    [
      "Curly",
      "Textured"
    ],
    "Natural shape",
    "A balanced outline that keeps natural curls and coils central.",
    "Your curl pattern, shrinkage and preferred volume.",
    3,
    6
  ],
  [
    "women-long-shag",
    "Long Shag",
    "women",
    "Long",
    [
      "Wavy",
      "Textured"
    ],
    "Layered",
    "Longer lengths with a textured fringe and distinct, airy layers.",
    "Keeping fullness at the ends while adding movement above.",
    3,
    7
  ]
]
const homeGuidance = {
  "men-buzz": [
    "A close, uniform cut with very little daily styling.",
    "Clipper length, scalp visibility and refresh frequency."
  ],
  "men-crop": [
    "A short textured shape with controlled movement through the top.",
    "Fringe length and how to style the texture at home."
  ],
  "men-taper": [
    "A gentle taper around the edges with shape left on top.",
    "The taper height and how much curl length to retain."
  ],
  "men-curtains": [
    "A centre-parted shape that opens around the face.",
    "Parting, front length and whether your hair needs blow-drying."
  ],
  "men-french": [
    "A compact crop with a more defined fringe line.",
    "Fringe thickness and the outline through the sides."
  ],
  "men-undercut": [
    "A longer top set against noticeably shorter sides.",
    "How disconnected you want the cut to be."
  ],
  "men-pompadour": [
    "A lifted, swept-back shape with a polished finish.",
    "Blow-drying, hold and time needed to keep the volume."
  ],
  "men-mullet": [
    "A textured cut with short sides and extra length at the nape.",
    "The contrast between the crown, sides and back."
  ],
  "women-pixie": [
    "A short, shaped cut with a softly swept fringe.",
    "Length around the ears and your natural growth patterns."
  ],
  "women-bob": [
    "A balanced chin-length shape with gently curved ends.",
    "The perimeter length and your usual parting."
  ],
  "women-bangs": [
    "A parted fringe that blends into the surrounding lengths.",
    "The shortest point and whether it needs styling each morning."
  ],
  "women-butterfly": [
    "Long lengths with shorter, feathered face-framing layers.",
    "Keeping fullness and the blow-dry needed for a rounded finish."
  ],
  "women-wolf": [
    "A shaggy, layered shape with a fuller crown and softer ends.",
    "Fringe shape, texture and how much weight to remove."
  ],
  "women-layers": [
    "Graduated lengths that add movement without a major chop.",
    "Where layers begin and how you usually wear your hair."
  ],
  "women-blunt": [
    "A clean, level bob with a precise outline.",
    "The finished length and how often to refresh the perimeter."
  ],
  "women-curly": [
    "Layers that distribute natural curl volume through the shape.",
    "Dry length, shrinkage and a manageable curl-care routine."
  ]
}
const extras = additions.map(([id,name,collection,length,texture,characteristic,description,ask,sheet,cell]) => ({
  id, name, collection, length, texture, tags: [characteristic], description, ask,
  image: { src: sheets[sheet], cell, columns: 4, rows: 2 },
  alt: name + ': ' + description,
}))
// Existing records retain their IDs, names and visual sources. The Services-only
// catalogue label distinguishes Classic Bob without changing the approved Home.
export const styleLibrary = [...homeStyles, ...extras].map(style => {
  const [description, ask] = homeGuidance[style.id] || [style.description, style.ask]
  const precise = /fade|pixie|blunt|french|caesar|buzz/.test(style.id)
  const polished = /quiff|pompadour|slick|comb-over|butterfly/.test(style.id)
  const curls = style.texture.includes('Curly')
  const fringe = /bangs/.test(style.id)
  return {
    ...style, catalogueName: style.id === 'women-bob' ? 'Classic Bob' : style.name,
    description, ask,
    maintenance: precise ? 'Regular shape refreshes' : 'Low–medium upkeep',
    stylingEffort: polished ? 'Blow-dry & styling time' : curls ? 'Curl prep & drying time' : style.length === 'Short' ? 'Easy daily styling' : 'Light styling',
    worksWell: curls
      ? 'You want to work with your natural curl pattern and are happy to discuss shrinkage, volume and drying time.'
      : polished
        ? 'You enjoy a styled finish and can allow time for blow-drying and a suitable hold product.'
        : style.length === 'Long'
          ? 'You want to keep length while refining the shape, and can maintain the ends between appointments.'
          : 'You want a defined shape that fits your routine. Your stylist can adapt the length to your density and growth patterns.',
    relatedServiceId: fringe ? 'fringe-trim' : style.id === 'men-buzz' ? 'clipper-cut' : style.length === 'Short' ? 'short-cut' : style.length === 'Long' ? 'long-cut' : 'medium-cut',
  }
})
export const lengthFilters = ['All', 'Short', 'Medium', 'Long']
export const textureFilters = ['All', 'Curly', 'Textured']
export const initialLibraryState = { collection: 'men', length: 'All', texture: 'All', limit: 8, selectedId: null }
export function getLibraryResults(state) {
  return styleLibrary.filter(style => style.collection === state.collection &&
    (state.length === 'All' || style.length === state.length) &&
    (state.texture === 'All' || style.texture.includes(state.texture)))
}
export function libraryReducer(state, action) {
  if (action.type === 'collection' && ['men','women'].includes(action.value)) return { ...initialLibraryState, collection: action.value }
  if (action.type === 'length' && lengthFilters.includes(action.value)) return { ...state, length: action.value, limit: 8, selectedId: null }
  if (action.type === 'texture' && textureFilters.includes(action.value)) return { ...state, texture: action.value, limit: 8, selectedId: null }
  if (action.type === 'reset') return { ...initialLibraryState, collection: state.collection }
  if (action.type === 'more') return { ...state, limit: Math.min(state.limit + 8, getLibraryResults(state).length) }
  if (action.type === 'open' && getLibraryResults(state).some(style => style.id === action.value)) return { ...state, selectedId: action.value }
  if (action.type === 'close') return { ...state, selectedId: null }
  return state
}

