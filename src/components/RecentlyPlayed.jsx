import React from "react";
import Album from "./Album";

const RecentlyPlayed = () => {
  const recentSongs = [
    {
      id: 1,
      title: "Starboy",
      artist: "The Weekend",
      imageUrl: "/albums/starboy.jpg",
      isPlaying: false,
    },
    {
      id: 2,
      title: "Pillow Talk",
      artist: "Zayn",
      imageUrl: "/albums/pillow-talk.jpg",
      isPlaying: true,
    },
    {
      id: 3,
      title: "Theme Song",
      artist: "Various Artists",
      imageUrl: "/albums/theme-song.jpg",
      isPlaying: false,
    },
  ];

  return (
    <section className="recently-played">
      <h2>Recently Played</h2>
      <div className="recent-songs-grid">
        {recentSongs.map((song) => (
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
        .recently-played {
          padding: 20px 0;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 16px;
        }

        .recent-songs-grid {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 8px 4px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .recent-songs-grid::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default RecentlyPlayed;