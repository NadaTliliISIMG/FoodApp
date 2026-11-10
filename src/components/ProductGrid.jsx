import { Row, Col } from "react-bootstrap";
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
    <Row g={4}>
      {products.map((p, i) => (
        <Col xs={12} sm={6} xl={4} className="plate-col" key={p.id}>
          <ProductCard
            product={p}
            index={i}
            liked={likedIds.includes(p.id)}
            onToggleLike={onToggleLike}
          />
        </Col>
      ))}
    </Row>
  );
}