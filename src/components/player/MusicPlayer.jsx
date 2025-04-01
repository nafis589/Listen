import React from "react";
import "./MusicPlayer.css";

const MusicPlayer = ({ isVisible, onClose, track }) => {
  if (!isVisible || !track) return null;

  return (
    <div className="music-player">
      <div className="player-header">
        <div className="track-info">
          <img
            src={track.album.cover_medium}
            alt={track.title}
            className="album-cover"
          />
          <div className="track-details">
            <h3>{track.title}</h3>
            <p>{track.artist.name}</p>
          </div>
        </div>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close player"
        >
          ×
        </button>
      </div>

      <div className="player-controls">
        <div className="progress-bar">
          <div className="progress" style={{ width: "30%" }} />
        </div>
        <div className="controls-main">
          <button className="control-button" aria-label="Previous track">
            ⏮
          </button>
          <button className="control-button" aria-label="Play/Pause">
            ⏸
          </button>
          <button className="control-button" aria-label="Next track">
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;