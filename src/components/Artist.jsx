import React from 'react';
import './Artist.css';

const Artist = () => {
  // Mock data for artists
  const artists = [
    { id: 1, name: 'Maskman', image: 'https://i.pravatar.cc/150?img=1', isOnline: true },
    { id: 2, name: 'Samira', image: 'https://i.pravatar.cc/150?img=2', isOnline: false },
    { id: 3, name: 'ABBA', image: 'https://i.pravatar.cc/150?img=3', isOnline: true },
    { id: 4, name: 'Shakira', image: 'https://i.pravatar.cc/150?img=4', isOnline: true },
    { id: 5, name: 'Indoors', image: 'https://i.pravatar.cc/150?img=5', isOnline: false },
    { id: 6, name: 'M83', image: 'https://i.pravatar.cc/150?img=6', isOnline: true },
    { id: 7, name: 'Bryan', image: 'https://i.pravatar.cc/150?img=7', isOnline: true },
    { id: 8, name: 'Guy Hawkins', image: 'https://i.pravatar.cc/150?img=8', isOnline: true },
  ];

  return (
    <div className="artist-section">
      <h2 className="section-title">Popular Artist</h2>
      <div className="artist-scroll-container">
        <div className="artist-grid">
          {artists.map((artist) => (
            <div key={artist.id} className="artist-card">
              <div className="artist-avatar-container">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="artist-avatar"
                />
                <div className={`online-status ${artist.isOnline ? 'online' : ''}`}></div>
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