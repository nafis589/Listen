import React, { useState } from "react";
import "./Sidebar.css";
import {
  MdHome,
  MdSearch,
  MdAlbum,
  MdPerson,
  MdOndemandVideo,
  MdPlayCircle,
  MdFolder,
  MdPhoneIphone,
} from "react-icons/md";

const Sidebar = ({ onMenuChange }) => {
  const [activeMenu, setActiveMenu] = useState("Home");

  const menuItems = [
    { icon: <MdHome />, label: "Home" },
    { icon: <MdSearch />, label: "Browse" },
    { icon: <MdAlbum />, label: "Album" },
    { icon: <MdPerson />, label: "Artists" },
    { icon: <MdOndemandVideo />, label: "Videos" },
  ];

  const musicItems = [
    { icon: <MdPlayCircle />, label: "Recently Played" },
    { icon: <MdFolder />, label: "Local Files" },
  ];

  const handleMenuClick = (label) => {
    setActiveMenu(label);
    onMenuChange(label);
  };

  return (
    <div className="sidebar">
      <div className="app-name">
        <h1>Listen</h1>
      </div>

      <nav className="menu-section">
        <div className="menu-group">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${
                item.label === activeMenu ? "active" : ""
              }`}
              onClick={() => handleMenuClick(item.label)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="my-music-section">
          <h4>MY MUSIC</h4>
          {musicItems.map((item, index) => (
            <div key={index} className="menu-item">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="device-section">
          <div className="device-info">
            <span className="device-icon">
              <MdPhoneIphone />
            </span>
            <span>iPhone x</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
