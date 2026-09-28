import { pageTitles } from './navigation'
const descriptions = {
  '/': 'VELORA is a fictional premium unisex Hair & Grooming Studio. Explore personal cuts, considered colour and professional care in this portfolio demo.',
  '/about': 'Meet the approach behind Velora: thoughtful consultation, individual style and considered hair care. A fictional unisex studio portfolio.',
  '/services': 'Explore Velora cuts, colour, grooming, treatments and a 48-style inspiration library. All services and RM prices are fictional demo examples.',
  '/team': 'Find a fictional Velora artist by cutting, colour, texture, grooming or care specialty. Explore profiles and demo appointment enquiries.',
  '/gallery': 'Browse the Velora Lookbook: cuts, colour, texture, grooming and styling. AI-generated inspiration, not real client work.',
  '/book': 'Explore the Velora appointment enquiry demo. Requests are not submitted or saved; use fictional details only.',
}
export function getRouteMeta(pathname) {
  const path = pathname.toLowerCase().replace(/\/+$/, '') || '/'
  return { title: (pageTitles[path] || '404 — Page Not Found') + ' | Velora Hair & Grooming Studio', description: descriptions[path] || 'This Velora page could not be found. Return Home or explore the studio services.' }
}

