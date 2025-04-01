import React from "react";
import "./PlayCard.css";

const PlayCard = ({ track, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(track);
    }
  };

  return (
    <div className="play-card" onClick={handleClick}>
      <div className="play-card-image">
        <img src={track.album.cover_medium} alt={track.title} />
        <div className="play-overlay">
          <span className="play-icon">▶</span>
        </div>
      </div>
      <div className="play-card-info">
        <h3 className="track-title">{track.title}</h3>
        <p className="artist-name">{track.artist.name}</p>
      </div>
    </div>
  );
};

export default PlayCard;