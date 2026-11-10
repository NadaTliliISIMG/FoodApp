import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Pizza from "./components/Pizza";
import Sidebar from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

// c1/c2 = slice colors, icon = icons8 icon name
const categories = [
  { name: "Burgers", icon: "hamburger", tagline: "Stack it high, bite it harder.", c1: "#ffd9a0", c2: "#f59e3b" },
  { name: "Pizza", icon: "pizza", tagline: "A slice of heaven, no refunds.", c1: "#ffc2b8", c2: "#ee5a46" },
  { name: "Pasta", icon: "spaghetti", tagline: "Carb-loading in progress.", c1: "#fff3b0", c2: "#f3cf4a" },
  { name: "Desserts", icon: "cupcake", tagline: "Life is short, eat dessert first.", c1: "#f7cdf2", c2: "#c071e0" },
  { name: "Drinks", icon: "cocktail", tagline: "Sip sip hooray.", c1: "#c4eaff", c2: "#4fb6ec" },
];

const products = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Burgers",
    description: "Juicy beef patty, cheddar, crisp lettuce and our house sauce.",
    price: 8.99,
    image: img("1568901346375-23c9450c58cd"),
  },
  {
    id: 2,
    name: "BBQ Smoke Burger",
    category: "Burgers",
    description: "Smoked BBQ glaze, caramelized onions and crunchy bacon.",
    price: 9.99,
    image: img("1553979459-d2229ba7433b"),
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    description: "San Marzano tomato, fresh mozzarella and basil leaves.",
    price: 10.99,
    image: img("1513104890138-7c749659a591"),
  },
  {
    id: 4,
    name: "Pepperoni Pizza",
    category: "Pizza",
    description: "Stone-baked crust loaded with spicy pepperoni slices.",
    price: 12.49,
    image: img("1565299624946-b28f40a0ae38"),
  },
  {
    id: 5,
    name: "Pasta Alfredo",
    category: "Pasta",
    description: "Creamy parmesan sauce tossed with fettuccine and herbs.",
    price: 9.99,
    image: img("1621996346565-e3dbc646d9a9"),
  },
  {
    id: 6,
    name: "Tomato Spaghetti",
    category: "Pasta",
    description: "Slow-cooked tomato sauce, garlic and a drizzle of olive oil.",
    price: 8.49,
    image: img("1473093295043-cdd812d0e601"),
  },
  {
    id: 7,
    name: "Chocolate Cake",
    category: "Desserts",
    description: "Molten dark chocolate layers with a silky ganache.",
    price: 5.99,
    image: img("1578985545062-69928b1d9587"),
  },
  {
    id: 8,
    name: "Glazed Donuts",
    category: "Desserts",
    description: "Soft, fluffy and glazed fresh every morning.",
    price: 4.49,
    image: img("1551024601-bec78aea704b"),
  },
  {
    id: 9,
    name: "Iced Coffee",
    category: "Drinks",
    description: "Cold-brewed coffee over ice with a touch of vanilla.",
    price: 3.49,
    image: img("1556679343-c7306c1976bc"),
  },
  {
    id: 10,
    name: "Berry Smoothie",
    category: "Drinks",
    description: "Strawberries, blueberries and yogurt blended smooth.",
    price: 4.99,
    image: img("1572490122747-3968b75cc699"),
  },
];

export default function App() {
  // category === null  -> the rolling pizza is shown
  // otherwise it is "All", "Favorites" or one of the category names
  const [category, setCategory] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const [theme, setTheme] = useState("light");
  const [likedIds, setLikedIds] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  // Escape = back to the pizza
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setCategory(null);
        setSearch("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // Toggle a product in the favorites list
  const toggleLike = (id) =>
    setLikedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );

  // From the pizza: play the exit animation first, then show the dishes.
  // From the dish view: switch right away.
  const open = (cat) => {
    if (leaving) return;
    if (category !== null) {
      setCategory(cat);
      return;
    }
    setLeaving(true);
    setTimeout(() => {
      setCategory(cat);
      setLeaving(false);
    }, 600);
  };

  const backToPizza = () => {
    setCategory(null);
    setSearch("");
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim() && category === null) open("All");
  };

  const counts = Object.fromEntries(
    categories.map((c) => [c.name, products.filter((p) => p.category === c.name).length])
  );

  const q = search.trim().toLowerCase();
  const visibleProducts =
    category === null
      ? []
      : products.filter((p) => {
          const inCategory =
            category === "All" ||
            (category === "Favorites" ? likedIds.includes(p.id) : p.category === category);
          return inCategory && p.name.toLowerCase().includes(q);
        });

  const meta = categories.find((c) => c.name === category);
  const heading =
    category === "Favorites" ? "Your favorites" : category === "All" ? "The whole menu" : category;
  const tagline = meta
    ? meta.tagline
    : category === "Favorites"
    ? "The dishes your heart picked."
    : "Everything. Because you deserve it.";
  const headIcon = meta ? meta.icon : category === "Favorites" ? "like--v1" : "pizza";
  const emptyText =
    category === "Favorites" && !q
      ? "No favorites yet. Go give a burger some love."
      : "Nothing here. The chef looked everywhere.";

  const railItems = [
    { name: "All" },
    ...categories.map((c) => ({ name: c.name, icon: c.icon })),
    { name: "Favorites", icon: "like--v1", badge: likedIds.length },
  ];

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        search={search}
        onSearch={handleSearch}
        likedCount={likedIds.length}
        favoritesActive={category === "Favorites"}
        onShowFavorites={() => open("Favorites")}
        onHome={backToPizza}
      />

      {category === null ? (
        <Pizza
          categories={categories}
          counts={counts}
          leaving={leaving}
          onPick={open}
          onPickAll={() => open("All")}
        />
      ) : (
        <Container as="main" className="menu-view">
          <div className="menu-layout">
            <Sidebar
              items={railItems}
              selected={category}
              onSelect={open}
              onBack={backToPizza}
            />

            <section>
              <header className="menu-head">
                <img
                  src={`https://img.icons8.com/color/96/${headIcon}.png`}
                  alt=""
                  width="64"
                  height="64"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div>
                  <h2>{heading}</h2>
                  <p>{tagline}</p>
                </div>
                <span className="count-badge">
                  {visibleProducts.length} {visibleProducts.length === 1 ? "dish" : "dishes"}
                </span>
              </header>

              <ProductGrid
                key={category}
                products={visibleProducts}
                likedIds={likedIds}
                onToggleLike={toggleLike}
                emptyText={emptyText}
              />
            </section>
          </div>
        </Container>
      )}

      <Footer />
    </>
  );
}
