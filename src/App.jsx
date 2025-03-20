import Sidebar from "./components/Sidebar";
import TopChart from "./components/TopChart";
import Search from "./components/Search";
import TopBar from "./components/TopBar";
import { useState } from "react";
import Album from "./components/Album";
import "./App.css";
import Artists from "./components/Artists";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const handleMenuChange = (menuLabel) => {
    setActiveMenu(menuLabel);
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlayerVisible(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerVisible(false);
  };

  return (
    <div className="app-container">
      <Sidebar onMenuChange={handleMenuChange} />
      <div className="main-content">
        <TopBar />
        <div className="content-area">
          {activeMenu === "Home" && <TopChart onTrackSelect={handleTrackSelect} />}
          {activeMenu === "Browse" && <Search onTrackSelect={handleTrackSelect} />}
          {activeMenu === "Album" && <Album onTrackSelect={handleTrackSelect} />}
          {activeMenu === "Artists" && <Artists onTrackSelect={handleTrackSelect} />}
        </div>
      </div>
      <MusicPlayer 
        isVisible={isPlayerVisible}
        onClose={handleClosePlayer}
        track={currentTrack}
      />
    </div>
  );
}

export default App;
