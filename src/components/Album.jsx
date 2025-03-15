import React, { useState, useEffect } from "react";
import styles from "./Album.module.css";
import axios from "axios";

const Album = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        let endpoint = "https://api.deezer.com/chart/0/albums";

        if (activeTab === "classic") {
          endpoint = 'https://api.deezer.com/search/album?q=genre:"classical"';
        }

        const response = await axios.get(endpoint);
        const albumData =
          activeTab === "classic" ? response.data.data : response.data.data;
        setAlbums(albumData);
        setError(null);
      } catch (error) {
        setError(`Error fetching albums: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [activeTab]);

  const featuredAlbum = albums.length > 0 ? albums[0] : null;

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.albumContainer}>
      {featuredAlbum && (
        <div className={styles.featuredAlbum}>
          <img
            src={featuredAlbum.cover_xl}
            alt={featuredAlbum.title}
            className={styles.featuredImage}
          />
          <div className={styles.featuredOverlay}>
            <h2 className={styles.featuredTitle}>{featuredAlbum.title}</h2>
            <p className={styles.featuredSubtitle}>
              {featuredAlbum.artist.name}
            </p>
          </div>
        </div>
      )}

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${
            activeTab === "popular" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("popular")}
        >
          Popular
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "classic" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("classic")}
        >
          Classic
        </button>
      </div>

      <div className={styles.albumGrid}>
        {albums.map((album) => (
          <div key={album.id} className={styles.albumCard}>
            <img
              src={album.cover_medium}
              alt={album.title}
              className={styles.albumImage}
            />
            <div className={styles.albumOverlay}>
              <div className={styles.playButton}>▶</div>
              <h3 className={styles.albumTitle}>{album.title}</h3>
              <p className={styles.albumArtist}>{album.artist.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
