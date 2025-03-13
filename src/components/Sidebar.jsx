import React from "react";
import "./Sidebar.css";
import { MdHome, MdSearch, MdAlbum, MdPerson, MdOndemandVideo, MdPlayCircle, MdFolder, MdPhoneIphone } from "react-icons/md";

const Sidebar = () => {
  const menuItems = [
    { icon: <MdHome />, label: "Home", active: true },
    { icon: <MdSearch />, label: "Browse" },
    { icon: <MdAlbum />, label: "Album" },
    { icon: <MdPerson />, label: "Artists" },
    { icon: <MdOndemandVideo />, label: "Videos" },
  ];

  const musicItems = [
    { icon: <MdPlayCircle />, label: "Recently Played" },
    { icon: <MdFolder />, label: "Local Files" },
  ];

  return (
    <div className="sidebar">
      <div className="profile-section">
        <div className="profile-image">
          <img src="https://via.placeholder.com/40" alt="Profile" />
          <span className="online-indicator"></span>
        </div>
        <div className="profile-info">
          <h3>Parzan Paruk</h3>
          <p>@parzanparuk</p>
        </div>
      </div>

      <nav className="menu-section">
        <div className="menu-group">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${item.active ? "active" : ""}`}
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
            <span className="device-icon"><MdPhoneIphone /></span>
            <span>iPhone x</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
