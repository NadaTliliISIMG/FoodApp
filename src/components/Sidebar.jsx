import { Button } from "react-bootstrap";

const ICON = "https://img.icons8.com/color/48";

export default function Sidebar({ items, selected, onSelect, onBack }) {
  return (
    <aside className="rail">
      <Button bsPrefix="back-btn" variant={null} onClick={onBack}>
        <img src={`${ICON}/pizza.png`} alt="" width="40" height="40" />
        <span>
          Back to
          <br />
          the pizza
        </span>
      </Button>

      <div className="rail-list" role="tablist" aria-label="Categories">
        {items.map((item) => (
          <Button
            key={item.name}
            bsPrefix="rail-chip"
            variant={null}
            role="tab"
            aria-selected={selected === item.name}
            active={selected === item.name}
            onClick={() => onSelect(item.name)}
          >
            <span className="rail-ico">
              {item.icon && (
                <img
                  src={`${ICON}/${item.icon}.png`}
                  alt=""
                  width="26"
                  height="26"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </span>
            <span className="rail-name">{item.name}</span>
            {item.badge !== undefined && <span className="rail-badge">{item.badge}</span>}
          </Button>
        ))}
      </div>
    </aside>
  );
}