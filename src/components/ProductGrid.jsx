import ProductCard from "./ProductCard";

export default function ProductGrid({ products, likedIds, onToggleLike, emptyText }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((p, i) => (
        <div className="col-12 col-sm-6 col-xl-4 plate-col" key={p.id}>
          <ProductCard
            product={p}
            index={i}
            liked={likedIds.includes(p.id)}
            onToggleLike={onToggleLike}
          />
        </div>
      ))}
    </div>
  );
}
