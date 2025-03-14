import React from "react";
import ArtistAvatar from "./ArtistAvatar";

const PopularArtists = () => {
  const artists = [
    { id: 1, name: "Madroom", imageUrl: "/artists/madroom.jpg", isVerified: true },
    { id: 2, name: "Samira", imageUrl: "/artists/samira.jpg", isVerified: false },
    { id: 3, name: "Zedd", imageUrl: "/artists/zedd.jpg", isVerified: true },
    { id: 4, name: "Sheeran", imageUrl: "/artists/sheeran.jpg", isVerified: true },
    { id: 5, name: "Indoors", imageUrl: "/artists/indoors.jpg", isVerified: false },
    { id: 6, name: "Maron", imageUrl: "/artists/maron.jpg", isVerified: true },
    { id: 7, name: "Bryan", imageUrl: "/artists/bryan.jpg", isVerified: false },
    { id: 8, name: "Guy Hawkins", imageUrl: "/artists/guy.jpg", isVerified: true },
    { id: 9, name: "Jenny Wilson", imageUrl: "/artists/jenny.jpg", isVerified: true },
  ];

  return (
    <section className="popular-artists">
      <h2>Popular Artist</h2>
      <div className="artists-scroll">
        {artists.map((artist) => (
          <ArtistAvatar
            key={artist.id}
            imageUrl={artist.imageUrl}
            name={artist.name}
            isVerified={artist.isVerified}
          />
        ))}
      </div>

      <style jsx>{`
        .popular-artists {
          padding: 20px 0;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 16px;
        }

        .artists-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 8px 4px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .artists-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PopularArtists;