import { getRouteMeta } from '../data/route-meta'
export function updateRouteMetadata(pathname, ownerDocument = document) {
  const meta = getRouteMeta(pathname)
  ownerDocument.title = meta.title
  for (const [selector, content] of [
    ['meta[name="description"]', meta.description],
    ['meta[property="og:title"]', meta.title],
    ['meta[property="og:description"]', meta.description],
  ]) ownerDocument.querySelector(selector)?.setAttribute('content', content)
}
export function restoreRouteViewport(hash, main, ownerDocument = document, viewport = window) {
  let id = ''
  try { id = decodeURIComponent(hash.replace(/^#/, '')) } catch { /* Malformed anchors fall back to the page top. */ }
  const target = id ? ownerDocument.getElementById(id) : null
  if (target) {
    target.focus({ preventScroll: true })
    target.scrollIntoView({ block: 'start', behavior: 'instant' })
  } else {
    viewport.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    main?.focus({ preventScroll: true })
  }
}

