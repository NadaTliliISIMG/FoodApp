const HEART_OFF = "https://img.icons8.com/ios/50/like--v1.png";
const HEART_ON = "https://img.icons8.com/color/48/like--v1.png";

const TILTS = [-3, 2, -2, 3];

export default function ProductCard({ product, index, liked, onToggleLike }) {
  const { name, category, description, price, image } = product;

  return (
    <article
      className="plate-card"
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

      <h3 className="dish-name">{name}</h3>
      <p className="dish-desc">{description}</p>

      <div className="dish-footer">
        <span className={`dish-tag tag-${category.toLowerCase()}`}>{category}</span>
        <button
          type="button"
          className={`like-btn ${liked ? "liked" : ""}`}
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
        </button>
      </div>
    </article>
  );
}
