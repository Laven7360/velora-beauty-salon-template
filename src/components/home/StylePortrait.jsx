import LazyRasterImage from '../LazyRasterImage'
// Raster portrait contact-sheet viewport. No drawn silhouettes remain.
// Omit image.cell to use a standalone photo with the same presentation.
export default function StylePortrait({ style }) {
  const { image, alt } = style
  return <div className="style-portrait">
    {image.cell == null
      ? <img src={image.src} alt={alt} loading="lazy" decoding="async" />
      : <svg viewBox={(image.cell % image.columns) * 100 + ' ' + Math.floor(image.cell / image.columns) * 150 + ' 100 150'} preserveAspectRatio="xMidYMid meet" role="img" aria-label={alt} focusable="false">
        <LazyRasterImage href={image.src} width={image.columns * 100} height={image.rows * 150} />
      </svg>}
  </div>
}

