import React from "react";
import Album from "./Album";

const TrendySongs = () => {
  const songs = [
    {
      id: 1,
      title: "The Weekend",
      artist: "The Weekend",
      imageUrl: "/albums/weekend.jpg",
      isPlaying: false,
    },
    {
      id: 2,
      title: "Havana",
      artist: "Camila Cabello",
      imageUrl: "/albums/havana.jpg",
      isPlaying: false,
    },
    {
      id: 3,
      title: "Lean On",
      artist: "Major Lazer",
      imageUrl: "/albums/major-lazer.jpg",
      isPlaying: false,
    },
  ];

  return (
    <section className="trendy-songs">
      <h2>Trendy Songs</h2>
      <div className="songs-grid">
        {songs.map((song) => (
          <Album
            key={song.id}
            imageUrl={song.imageUrl}
            title={song.title}
            artist={song.artist}
            isPlaying={song.isPlaying}
          />
        ))}
      </div>

      <style jsx>{`
        .trendy-songs {
          padding: 20px 0;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 16px;
        }

        .songs-grid {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 8px 4px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .songs-grid::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TrendySongs;
