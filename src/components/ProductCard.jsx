import { Card, Button } from "react-bootstrap";

const HEART_OFF = "https://img.icons8.com/ios/50/like--v1.png";
const HEART_ON = "https://img.icons8.com/color/48/like--v1.png";

const TILTS = [-3, 2, -2, 3];

export default function ProductCard({ product, index, liked, onToggleLike }) {
  const { name, category, description, price, image } = product;

  return (
    <Card
      as="article"
      bsPrefix="plate-card"
      style={{
        "--i": index,
        "--tilt": `${TILTS[index % TILTS.length]}deg`,
        "--fx": index % 2 === 0 ? "-70px" : "70px",
        "--fy": "-170px",
      }}
    >
      <div className="plate">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <span className="price-sticker">${price.toFixed(2)}</span>

      <Card.Title as="h3" bsPrefix="dish-name">{name}</Card.Title>
      <Card.Text bsPrefix="dish-desc">{description}</Card.Text>

      <div className="dish-footer">
        <span className={`dish-tag tag-${category.toLowerCase()}`}>{category}</span>
        <Button
          bsPrefix="like-btn"
          variant={null}
          className={liked ? "liked" : ""}
          onClick={() => onToggleLike(product.id)}
          aria-pressed={liked}
          aria-label={liked ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        >
          <img
            src={liked ? HEART_ON : HEART_OFF}
            alt=""
            width="22"
            height="22"
            className={liked ? "" : "icon-mono"}
          />
        </Button>
      </div>
    </Card>
  );
}