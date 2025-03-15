import Sidebar from "./components/Sidebar";
import TopChart from "./components/TopChart";
import Search from "./components/Search";
import { useState } from "react";
import Album from "./components/Album";

function App() {
  const [activeMenu, setActiveMenu] = useState("Home");

  const handleMenuChange = (menuLabel) => {
    setActiveMenu(menuLabel);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#fff" }}>
      <Sidebar onMenuChange={handleMenuChange} />
      <main style={{ flex: 1, overflow: "auto" }}>
        {activeMenu === "Home" ? <TopChart /> : null}
        {activeMenu === "Browse" ? <Search /> : null}
        {activeMenu === "Album" ? <Album /> : null}
      </main>
    </div>
  );
}

export default App;

/*function App() {
  const [search, setSearch] = useState("Eminem");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Lecteur de musique Deezer</h1>
      <input
        type="text"
        placeholder="Rechercher une chanson..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px" }}
      />
      <PlayCard search={search} />
    </div>
  );
}

export default App;*/
