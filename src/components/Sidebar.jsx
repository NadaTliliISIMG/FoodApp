const ICON = "https://img.icons8.com/color/48";

export default function Sidebar({ items, selected, onSelect, onBack }) {
  return (
    <aside className="rail">
      <button type="button" className="back-btn" onClick={onBack}>
        <img src={`${ICON}/pizza.png`} alt="" width="40" height="40" />
        <span>
          Back to
          <br />
          the pizza
        </span>
      </button>

      <div className="rail-list" role="tablist" aria-label="Categories">
        {items.map((item) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={selected === item.name}
            className={`rail-chip ${selected === item.name ? "active" : ""}`}
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
          </button>
        ))}
      </div>
    </aside>
  );
}
