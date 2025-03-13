import React from "react";
import "./TopChart.css";
import axios from "axios";
import { useState, useEffect } from "react";

const TopChart = () => {
  const [song, setSong] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.deezer.com/chart");
        setSong(response.data.tracks.data);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="top-chart">
        <h2>Loading...</h2>
      </div>
    );
  if (error)
    return (
      <div className="top-chart">
        <h2>{error}</h2>
      </div>
    );
  if (!song.length)
    return (
      <div className="top-chart">
        <h2>No songs found</h2>
      </div>
    );

  return (
    <div className="top-chart">
      <h2 className="section-title">Billboard Topchart</h2>
      <div className="album-grid">
        {song.map((track) => (
          <div key={track.id} className="album-card">
            <div className="album-cover">
              <img src={track.album.cover_medium} alt={track.album.title} />
              <div className="play-overlay">
                <button className="play-button">▶</button>
              </div>
            </div>
            <h3 className="album-title">{track.album.title}</h3>
            <p className="album-artist">{track.artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopChart;
