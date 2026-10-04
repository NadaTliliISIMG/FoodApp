const ICON = "https://img.icons8.com";

export default function Navbar({
  theme,
  onToggleTheme,
  search,
  onSearch,
  likedCount,
  favoritesActive,
  onShowFavorites,
  onHome,
}) {
  const isDark = theme === "dark";

  return (
    <nav className="navbar sticky-top app-navbar">
      <div className="container d-flex flex-wrap gap-3 align-items-center">
        <button type="button" className="brand" onClick={onHome} title="Back to the pizza">
          <span className="brand-icon">
            <img src={`${ICON}/color/48/pizza.png`} alt="" width="28" height="28" />
          </span>
          Flavor
        </button>

        <label className="search-box flex-grow-1 order-3 order-md-2">
          <img
            src={`${ICON}/color/48/search--v1.png`}
            alt=""
            className="search-icon"
            width="20"
            height="20"
          />
          <input
            type="search"
            className="form-control"
            placeholder="Search a dish..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </label>

        <div className="d-flex gap-2 order-2 order-md-3 ms-auto">
          <button
            type="button"
            className={`nav-btn ${favoritesActive ? "active" : ""}`}
            onClick={onShowFavorites}
            aria-pressed={favoritesActive}
            title="My favorites"
          >
            <img src={`${ICON}/color/48/like--v1.png`} alt="Favorites" width="22" height="22" />
            <span className="nav-count">{likedCount}</span>
          </button>

          <button
            type="button"
            className="nav-btn"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            <img
              src={
                isDark
                  ? `${ICON}/color/48/sun--v1.png`
                  : `${ICON}/color/48/moon-symbol.png`
              }
              alt=""
              width="22"
              height="22"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
