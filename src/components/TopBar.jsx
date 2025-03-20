import React, { useState } from "react";
import "./TopBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const TopBar = () => {
  const [showPlaylistPopover, setShowPlaylistPopover] = useState(false);
  const [showLikedPopover, setShowLikedPopover] = useState(false);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="icon-container">
          <button
            className="icon-button"
            onMouseEnter={() => setShowPlaylistPopover(true)}
            onMouseLeave={() => setShowPlaylistPopover(false)}
          >
            {showPlaylistPopover && <div className="popover">Playlist</div>}
          </button>
          <button
            className="icon-button"
            onMouseEnter={() => setShowLikedPopover(true)}
            onMouseLeave={() => setShowLikedPopover(false)}
          >
            <FontAwesomeIcon icon={faHeart} />
            {showLikedPopover && <div className="popover">Liked Tracks</div>}
          </button>
        </div>
      </div>
      <div className="profile-section">
        <div className="profile-image">
          <img src="src/assets/profil.jpeg" alt="Profile" />
          <span className="online-indicator"></span>
        </div>
        <div className="profile-info">
          <h3>Prince Nafis</h3>
          <p>@princenafis</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
