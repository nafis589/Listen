import React from "react";
import Album from "./components/Album";
import ArtistAvatar from "./components/ArtistAvatar";

const App = () => {
  const popularArtists = [
    { id: 1, name: "Madkissos", imageUrl: "/artists/artist1.jpg", isVerified: true },
    { id: 2, name: "Samira", imageUrl: "/artists/artist2.jpg", isVerified: true },
    { id: 3, name: "2000", imageUrl: "/artists/artist3.jpg", isVerified: false },
    { id: 4, name: "Sheeran", imageUrl: "/artists/artist4.jpg", isVerified: true },
    { id: 5, name: "Indoors", imageUrl: "/artists/artist5.jpg", isVerified: false },
    { id: 6, name: "Mikey", imageUrl: "/artists/artist6.jpg", isVerified: true },
  ];

  const trendySongs = [
    { id: 1, title: "The Weekend", artist: "Artist 1", imageUrl: "/albums/weekend.jpg" },
    { id: 2, title: "Havana", artist: "Camila Cabello", imageUrl: "/albums/havana.jpg" },
    { id: 3, title: "Lean On", artist: "Major Lazer", imageUrl: "/albums/major.jpg" },
  ];

  const recentlyPlayed = [
    { id: 1, title: "Starboy", artist: "The Weeknd", imageUrl: "/albums/starboy.jpg" },
  ];

  return (
    <div className="app-container">
      <div className="section">
        <h2>Popular Artist</h2>
        <div className="artists-grid">
          {popularArtists.map((artist) => (
            <ArtistAvatar
              key={artist.id}
              name={artist.name}
              imageUrl={artist.imageUrl}
              isVerified={artist.isVerified}
            />
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Trendy Songs</h2>
        <div className="albums-grid">
          {trendySongs.map((album) => (
            <Album
              key={album.id}
              title={album.title}
              artist={album.artist}
              imageUrl={album.imageUrl}
              isPlaying={false}
            />
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Recently Played</h2>
        <div className="albums-grid">
          {recentlyPlayed.map((album) => (
            <Album
              key={album.id}
              title={album.title}
              artist={album.artist}
              imageUrl={album.imageUrl}
              isPlaying={false}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .app-container {
          padding: 24px;
          background: #121212;
          min-height: 100vh;
          color: white;
        }

        .section {
          margin-bottom: 32px;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .artists-grid {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 16px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .artists-grid::-webkit-scrollbar {
          display: none;
        }

        .albums-grid {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          padding-bottom: 16px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .albums-grid::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default App;
