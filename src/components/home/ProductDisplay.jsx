// Code-native house-product mockups. No ecommerce or third-party brands.
export default function ProductDisplay() {
  return <figure className="product-display" aria-label="Concept display of Velora hydration wash, curl cream and styling paste">
    <div className="product-plinth">
      <div className="product-bottle product-wash" aria-hidden="true"><span className="bottle-cap" /><span className="product-label"><strong>VELORA</strong><span>HYDRATION<br />WASH</span><small>STUDIO CARE · 250 ml</small></span></div>
      <div className="product-bottle product-cream" aria-hidden="true"><span className="bottle-cap" /><span className="product-label"><strong>VELORA</strong><span>CURL<br />CREAM</span><small>STUDIO CARE · 150 ml</small></span></div>
      <div className="product-jar" aria-hidden="true"><span className="jar-lid" /><span className="product-label"><strong>VELORA</strong><span>STYLING PASTE</span></span></div>
    </div>
    <figcaption>House-product concepts · For demonstration only</figcaption>
  </figure>
}

