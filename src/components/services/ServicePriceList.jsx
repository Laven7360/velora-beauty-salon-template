export default function ServicePriceList({ items, className = '' }) {
  return <dl className={'service-price-list ' + className}>{items.map(item => <div key={item.id}>
    <dt><span className="price-service-name">{item.name}</span><span className="price-description">{item.description}</span></dt>
    <dd>{item.price == null ? <span className="price-note">{item.priceNote}</span> : <><span className="price-from">from</span> RM {item.price}</>}</dd>
  </div>)}</dl>
}

