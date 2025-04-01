import React from "react";
import "./Artist.css";

const Artist = () => {
  return (
    <div className="artist-section">
      <h2 className="section-title">Featured Artists</h2>
      <div className="artist-scroll-container">
        <div className="artist-grid">
          {/* Sample artist data - replace with actual API data */}
          {[
            { id: 1, name: "Artist 1", online: true },
            { id: 2, name: "Artist 2", online: false },
            { id: 3, name: "Artist 3", online: true },
            { id: 4, name: "Artist 4", online: false },
            { id: 5, name: "Artist 5", online: true },
          ].map((artist) => (
            <div key={artist.id} className="artist-card">
              <div className="artist-avatar-container">
                <img
                  src={`https://picsum.photos/200?random=${artist.id}`}
                  alt={artist.name}
                  className="artist-avatar"
                />
                <div
                  className={`online-status ${artist.online ? "online" : ""}`}
                />
              </div>
              <p className="artist-name">{artist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;