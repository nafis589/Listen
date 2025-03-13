import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const PlayCard = ({ search }) => {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.deezer.com/search`, {
          params: { q: search },
        });
        setSong(response.data.data[0]);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  if (loading) return <p>chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!song) return <p>pas de resultat</p>;
  return (
    <div className="container">
      <h2>{song.title}</h2>
      <p>Artiste : {song.artist.name}</p>
      <img src={song.album.cover_medium} alt={song.title} width="200" />
      <audio controls key={song.preview}>
        <source src={song.preview} type="audio/mpeg" />
        Votre navigateur ne supporte pas l’élément audio.
      </audio>
      <div className="container-items"></div>
    </div>
  );
};

export default PlayCard;
