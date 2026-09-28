const row = (id, name, price, description, priceNote) => ({ id, name, price, description, priceNote })
export const serviceNavigation = [
  { id: 'cut-style', label: 'Cut & Style' }, { id: 'colour', label: 'Colour' },
  { id: 'treatments', label: 'Treatments' }, { id: 'grooming', label: 'Grooming' },
  { id: 'style-finish', label: 'Style & Finish' }, { id: 'hair-care', label: 'Hair Care' },
  { id: 'style-library', label: 'Style Library' },
]
export const serviceMenus = {
  cut: [
    row('consultation', 'Consultation', null, 'Talk through your hair, routine and the result you want.', 'Complimentary with a booked service'),
    row('clipper-cut', 'Clipper Cut', 45, 'An even, close cut with a clean finish.'),
    row('short-cut', 'Short Hair Cut & Finish', 65, 'Shape, balance and finishing for short hair.'),
    row('medium-cut', 'Medium Hair Cut & Finish', 80, 'A considered cut for ear-to-shoulder lengths.'),
    row('long-cut', 'Long Hair Cut & Finish', 95, 'Refine the shape, layers and ends of longer hair.'),
    row('restyle', 'Restyle / Transformation Cut', 110, 'More time to make a significant change in length or shape.'),
    row('fringe-trim', 'Fringe / Bang Trim', 25, 'Refresh a fringe or tidy face-framing details.'),
    row('cut-wash-blow', 'Wash & Blow', 45, 'A cleanse and blow-dry, shaped to your preferred finish.'),
  ],
  colour: [
    row('root-colour', 'Root Colour', 120, 'Refresh regrowth and blend with your existing shade.'),
    row('full-colour', 'Full Colour', 180, 'An all-over shade, chosen around your starting colour.'),
    row('gloss-toner', 'Gloss / Toner', 90, 'Refine tone and refresh the appearance of your colour.'),
    row('face-highlights', 'Face-Framing Highlights', 150, 'Targeted lighter pieces around the face.'),
    row('partial-highlights', 'Partial Highlights', 220, 'Dimension through selected sections.'),
    row('full-highlights', 'Full Highlights', 320, 'Light and depth placed throughout the hair.'),
    row('balayage', 'Balayage', 380, 'Painted dimension with a softer transition at the root.'),
    row('lightening', 'Bleach / Lightening', 250, 'A tailored lightening service; consultation recommended.'),
    row('creative-colour', 'Creative Colour', 280, 'Expressive shades with a plan for preparation and upkeep.'),
    row('correction', 'Colour Correction', null, 'An individual plan based on previous colour and hair condition.', 'Consultation required'),
  ],
  treatments: [
    row('hydration', 'Hydration Treatment', 75, 'Conditioning care for hair that feels dry.'),
    row('repair', 'Repair & Strengthening', 95, 'Targeted conditioning for hair that feels fragile or overworked.'),
    row('colour-protection', 'Colour Protection', 85, 'Care selected for colour-treated hair.'),
    row('smoothing', 'Smoothing Treatment', 180, 'Discuss a smoother finish and the upkeep it requires.'),
    row('scalp-refresh', 'Scalp Refresh', 65, 'A refreshing cleanse for the scalp and roots.'),
    row('curl-care', 'Curl Care Treatment', 90, 'Conditioning and definition for curls and coils.'),
    row('mask', 'Intensive Mask', 60, 'An extra conditioning step for lengths and ends.'),
    row('bond-care', 'Bond Care', 110, 'A professional care option for processed hair, selected in consultation.'),
  ],
  grooming: [
    row('clipper-refresh', 'Clipper Refresh', 35, 'Maintain an existing close-cut shape.'),
    row('fade-refresh', 'Fade Refresh', 45, 'Clean up the blend around the sides and nape.'),
    row('edge-cleanup', 'Neckline / Edge Clean-Up', 20, 'Refine the perimeter between full appointments.'),
    row('beard-trim', 'Beard Trim', 30, 'Tidy length and stray hairs.'),
    row('beard-shape', 'Beard Shape & Finish', 45, 'Shape the outline and finish with suitable styling care.'),
    row('hair-beard', 'Hair + Beard Combination', 95, 'Coordinate your haircut and beard shape in one visit.'),
  ],
  finish: [
    row('finish-wash-blow', 'Wash & Blow', 45, 'A cleanse and blow-dry, shaped to your preferred finish.'),
    row('smooth-finish', 'Smooth Finish', 55, 'A polished finish for your hair length and texture.'),
    row('waves-curls', 'Waves / Curls', 65, 'Soft movement or defined curls, styled to suit your plans.'),
    row('texture-styling', 'Texture Styling', 60, 'Add shape, separation and a considered finish.'),
    row('event-styling', 'Upstyle / Event Styling', 120, 'A dressed-up shape for an occasion; bring your references.'),
    row('braiding', 'Braiding / Detail Styling', 80, 'Braids or detail work, priced by time and complexity.'),
  ],
}
export const hairCareCategories = [
  ['Hydration', 'Conditioners and leave-ins for dry-feeling lengths.'],
  ['Repair', 'Targeted care for hair that feels fragile or overworked.'],
  ['Colour Care', 'Cleansing and conditioning suited to coloured hair.'],
  ['Curl Definition', 'Creams and gels selected for your curl pattern.'],
  ['Scalp Care', 'Cleansing options for your scalp and routine.'],
  ['Heat Protection', 'A prep step before blow-drying or heat styling.'],
  ['Styling & Hold', 'Pastes, sprays and gels for your preferred shape.'],
  ['Shine & Finish', 'Light finishing options for polished ends and texture.'],
]
export const colourGroups = [
  { name: 'Natural', shades: [['Black','#24201e'],['Espresso','#3b2924'],['Chocolate','#624331'],['Chestnut','#86583d']] },
  { name: 'Warm', shades: [['Caramel','#bc8954'],['Honey','#cfa05a'],['Copper','#a95531'],['Auburn','#793d2c']] },
  { name: 'Cool', shades: [['Ash Brown','#75685a'],['Mushroom','#9c9080'],['Cool Blonde','#c7bca6']] },
  { name: 'Light', shades: [['Beige Blonde','#d7bf94'],['Champagne','#e2cda8'],['Platinum','#e8e1ce']] },
  { name: 'Creative', shades: [['Burgundy','#632e3b'],['Cherry','#993d43'],['Rose','#bc8583'],['Fashion shades','#867084']] },
]

