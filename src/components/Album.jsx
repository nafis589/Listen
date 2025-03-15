import React, { useState, useEffect } from "react";
import styles from "./Album.module.css";
import axios from "axios";

const Album = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const [maxSlides] = useState(10);
  const [isTransitioning, setIsTransitioning] = useState(false); // Increased number of slides

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      let endpoint = "https://api.deezer.com/chart/0/albums?limit=20";

      if (activeTab === "classic") {
        endpoint =
          'https://api.deezer.com/search/album?q=genre:"classical"&limit=20';
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

  useEffect(() => {
    fetchAlbums();
  }, [activeTab]);

  useEffect(() => {
    if (!autoScrollPaused && albums.length > 0) {
      const timer = setInterval(() => {
        setIsTransitioning(true);
        setCurrentSlide(
          (prev) => (prev + 1) % Math.min(albums.length, maxSlides)
        );
        setTimeout(() => setIsTransitioning(false), 500);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [autoScrollPaused, albums, maxSlides]);

  const handleDotClick = (index) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
    setAutoScrollPaused(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setAutoScrollPaused(false);
    }, 10000);
  };

  const featuredAlbums = albums.slice(0, maxSlides);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <button
          className={styles.closeButton}
          onClick={() => setError(null)}
          aria-label="Close error message"
        >
          ×
        </button>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
          <p className={styles.errorMessage}>{error}</p>
          <div className={styles.errorActions}>
            <button
              className={styles.retryButton}
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchAlbums();
              }}
            >
              Try Again
            </button>
            <a
              href="mailto:support@listen.com"
              className={styles.supportButton}
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.albumContainer}>
      {featuredAlbums.length > 0 && (
        <div className={styles.featuredAlbum}>
          <div
            className={styles.bannerContainer}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              opacity: isTransitioning ? 0.5 : 1,
              transition: `transform 0.5s ease-in-out, opacity 0.3s ease-in-out`,
            }}
          >
            {featuredAlbums.map((album) => (
              <div
                key={album.id}
                className={styles.bannerSlide}
                style={{ backgroundImage: `url(${album.cover_xl})` }}
              >
                <div className={styles.featuredOverlay}>
                  <h2 className={styles.featuredTitle}>{album.title}</h2>
                  <p className={styles.featuredSubtitle}>{album.artist.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.navigationDots}>
            {featuredAlbums.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  currentSlide === index ? styles.activeDot : ""
                }`}
                onClick={() => handleDotClick(index)}
              />
            ))}
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
