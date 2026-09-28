import { serviceMenus } from './services'
import { teamMembers } from './team'
import { getLook } from './gallery'
import { styleLibrary } from './style-library'

export const bookingSteps = ['Service', 'Hair details', 'Artist', 'Date & time', 'Your details', 'Review']
export const serviceGroups = [
  { id: 'cut', name: 'Cut & Style', specialty: 'Precision Cutting', duration: '45–90 minutes', services: serviceMenus.cut.filter(item => item.id !== 'consultation') },
  { id: 'colour', name: 'Colour', specialty: 'Colour', duration: '90–240 minutes', services: serviceMenus.colour },
  { id: 'treatments', name: 'Treatment', specialty: 'Hair Health', duration: '30–60 minutes', services: serviceMenus.treatments },
  { id: 'grooming', name: 'Grooming', specialty: 'Fades & Grooming', duration: '20–60 minutes', services: serviceMenus.grooming },
  { id: 'finish', name: 'Style & Finish', specialty: 'Creative Styling', duration: '30–90 minutes', services: serviceMenus.finish },
  { id: 'consultation', name: 'Consultation', specialty: null, duration: '20–30 minutes', services: [serviceMenus.cut.find(item => item.id === 'consultation')] },
]
export const bookingServices = serviceGroups.flatMap(group => group.services)
export const hairOptions = { length: ['Short','Medium','Long'], texture: ['Straight','Wavy','Curly','Coily / Highly Textured'], condition: ['Healthy','Dry','Colour-treated','Damaged / fragile','Not sure'] }
export const emptyBooking = { serviceId: '', category: 'cut', length: '', texture: '', condition: '', goals: '', artistId: '', date: '', time: '', name: '', email: '', phone: '', contact: 'Email', notes: '', lookId: '', styleId: '' }
export const getService = id => bookingServices.find(service => service.id === id)
export const getArtist = id => teamMembers.find(artist => artist.id === id)
export function createBooking(search = '', navigationState = {}) {
  const params = new URLSearchParams(search)
  const look = getLook(params.get('look'))
  const style = styleLibrary.find(item => item.id === navigationState?.styleId)
  const service = getService(params.get('service')) || getService(look?.serviceId) || getService(style?.relatedServiceId)
  const artist = getArtist(navigationState?.stylistId)
  return { ...emptyBooking, serviceId: service?.id || '', category: serviceGroups.find(group => group.services.includes(service))?.id || 'cut', lookId: look?.id || '', styleId: look ? '' : style?.id || '', artistId: artist?.id || '' }
}
export function getInspiration(data) {
  const look = getLook(data.lookId)
  if (look) return { title: look.title, image: look.image, alt: look.alt }
  const style = styleLibrary.find(item => item.id === data.styleId)
  return style ? { title: style.catalogueName, style } : null
}
export function tomorrow(now = new Date()) {
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0')
}
function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [y,m,d] = value.split('-').map(Number), date = new Date(y,m-1,d,12)
  return date.getFullYear() === y && date.getMonth() === m-1 && date.getDate() === d ? date : null
}
export function timeWindows(value) {
  const date = parseDate(value)
  if (!date || date.getDay() === 1) return []
  return date.getDay() === 0 || date.getDay() === 6
    ? ['Morning · 9am–12pm', 'Afternoon · 12pm–5pm']
    : ['Morning · 10am–12pm', 'Afternoon · 12pm–4pm', 'Evening · 4pm–7pm']
}
export function validateStep(step, data, now = new Date()) {
  const errors = {}
  if (step === 0 && !getService(data.serviceId)) errors.serviceId = 'Choose a service, or start with a consultation.'
  if (step === 1) for (const key of Object.keys(hairOptions)) if (!hairOptions[key].includes(data[key])) errors[key] = 'Choose your hair ' + key + '.'
  if (step === 2 && data.artistId && !getArtist(data.artistId)) errors.artistId = 'Choose an artist or No preference.'
  if (step === 3) {
    if (!parseDate(data.date) || data.date < tomorrow(now)) errors.date = 'Choose a future date, starting tomorrow.'
    else if (!timeWindows(data.date).length) errors.date = 'The demo studio is closed on Mondays. Choose another day.'
    if (!timeWindows(data.date).includes(data.time)) errors.time = 'Choose a preferred time window for this date.'
  }
  if (step === 4) {
    if (!data.name.trim()) errors.name = 'Enter a demo name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Enter an email such as alex@example.com.'
    const digits = data.phone.replace(/\D/g,'')
    if (!/^\+?[\d\s().-]+$/.test(data.phone) || digits.length < 7 || digits.length > 15) errors.phone = 'Enter a phone number with 7–15 digits.'
    if (!['Email','Phone'].includes(data.contact)) errors.contact = 'Choose Email or Phone.'
  }
  return errors
}
export function firstInvalidStep(data, now = new Date()) {
  for (let step=0; step<5; step++) if (Object.keys(validateStep(step,data,now)).length) return step
  return null
}
export function updateBooking(data, field, value) {
  if (field === 'category') return { ...data, category: value, serviceId: '' }
  if (field === 'date') return { ...data, date: value, time: '' }
  if (field === 'removeInspiration') return { ...data, lookId: '', styleId: '' }
  return { ...data, [field]: value }
}

export function createBookingFlow({ search = '', navigationState } = {}) {
  return { data: createBooking(search,navigationState), step: 0, errors: {}, complete: false }
}
export function bookingReducer(state, action) {
  if (action.type === 'update') {
    const errors = { ...state.errors }
    delete errors[action.field]
    if (action.field === 'category') delete errors.serviceId
    if (action.field === 'date') delete errors.time
    return { ...state, errors, data: updateBooking(state.data,action.field,action.value) }
  }
  if (action.type === 'back') return { ...state, step: Math.max(0,state.step-1), errors: {} }
  if (action.type === 'edit' && Number.isInteger(action.step) && action.step >= 0 && action.step < 5) return { ...state, step: action.step, errors: {} }
  if (action.type === 'next') {
    const invalid = state.step === 5 ? firstInvalidStep(state.data,action.now) : state.step
    if (invalid === null) return { ...state, complete: true, errors: {} }
    const errors = validateStep(invalid,state.data,action.now)
    if (Object.keys(errors).length) return { ...state, step: invalid, errors }
    return { ...state, step: Math.min(5,state.step+1), errors: {} }
  }
  return state
}

