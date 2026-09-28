import { useEffect, useRef, useState } from 'react'

// Native SVG image elements have no loading="lazy" support.
// Keep the sized viewport in place and defer only its raster request.
export default function LazyRasterImage({ href, eager = false, ...props }) {
  const [visible, setVisible] = useState(() => eager || (typeof window !== 'undefined' && !('IntersectionObserver' in window)))
  const image = useRef(null)
  useEffect(() => {
    if (visible) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect() }
    }, { rootMargin: '400px' })
    observer.observe(image.current.ownerSVGElement)
    return () => observer.disconnect()
  }, [visible])
  return <image ref={image} href={visible ? href : undefined} {...props} />
}
