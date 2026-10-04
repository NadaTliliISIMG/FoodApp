import { useState } from "react";

const ICON = "https://img.icons8.com/color/96";

const polar = (deg, r) => {
  const t = (deg * Math.PI) / 180;
  return [50 + r * Math.sin(t), 50 - r * Math.cos(t)];
};

const wedge = (a0, a1, r = 50) => {
  const pts = ["50% 50%"];
  for (let a = a0; a < a1; a += 4) {
    const [x, y] = polar(a, r);
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  const [x, y] = polar(a1, r);
  pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  return `polygon(${pts.join(",")})`;
};

export default function Pizza({ categories, counts, leaving, onPick, onPickAll }) {
  const [hover, setHover] = useState(null);
  const step = 360 / categories.length;

  return (
    <section className="wheel-section">
      <div className="wheel-intro">
        <h1>Spin it. Pick a slice.</h1>
        <p>Hover to pause the pizza, then click the slice you are craving.</p>
      </div>

      <div className={`wheel-wrap ${leaving ? "leaving" : ""}`}>
        <div className="wheel-stage">
          <div className="wheel">
            <div className="crust" />

            <div className="cheese">
              {/* colored slices + labels */}
              {categories.map((c, i) => {
                const mid = i * step;
                const [lx, ly] = polar(mid, 31);
                const [ux, uy] = polar(mid, 4.5); // pull direction (percent offset)
                return (
                  <div
                    key={c.name}
                    className={`slice-vis ${hover === i ? "pull" : ""}`}
                    style={{
                      "--dx": `${(ux - 50).toFixed(2)}%`,
                      "--dy": `${(uy - 50).toFixed(2)}%`,
                    }}
                  >
                    <div
                      className="fill"
                      style={{
                        "--c1": c.c1,
                        "--c2": c.c2,
                        clipPath: wedge(mid - step / 2 + 1.6, mid + step / 2 - 1.6),
                      }}
                    />
                    <div className="slice-label" style={{ left: `${lx}%`, top: `${ly}%` }}>
                      <div className="label-counter">
                        <div className="label-card">
                          <img
                            src={`${ICON}/${c.icon}.png`}
                            alt=""
                            onError={(e) => (e.currentTarget.style.display = "none")}
                          />
                          <strong>{c.name}</strong>
                          <small>{counts[c.name]} dishes</small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* pepperoni on the cuts */}
              {categories.flatMap((c, i) =>
                [19, 40].map((r) => {
                  const [px, py] = polar(i * step + step / 2, r);
                  return (
                    <span
                      key={`${c.name}-${r}`}
                      className="pep"
                      style={{ left: `${px}%`, top: `${py}%` }}
                    />
                  );
                })
              )}

              {/* invisible click zones, one per slice */}
              {categories.map((c, i) => {
                const mid = i * step;
                return (
                  <button
                    key={c.name}
                    type="button"
                    className="slice-hit"
                    style={{ clipPath: wedge(mid - step / 2, mid + step / 2) }}
                    aria-label={`${c.name}, ${counts[c.name]} dishes`}
                    disabled={leaving}
                    onClick={() => onPick(c.name)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                  />
                );
              })}
            </div>
          </div>

          <button type="button" className="hub" onClick={onPickAll} disabled={leaving}>
            All
            <small>the menu</small>
          </button>
        </div>
      </div>
    </section>
  );
}
