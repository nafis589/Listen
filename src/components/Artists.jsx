import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Artists.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const fetchArtists = async () => {
    setRetrying(false);
    try {
      setIsLoading(true);
      // Using Deezer API to fetch artists
      const response = await axios.get("https://api.deezer.com/artist/chart");
      const artistsWithListeners = response.data.data.map((artist) => ({
        ...artist,
        monthlyListeners: Math.floor(Math.random() * 10000000) + 1000000, // Mock monthly listeners
      }));
      setArtists(artistsWithListeners);
      setFilteredArtists(artistsWithListeners);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching artists:", err);
      setError("Failed to load artists. Please try again later.");
      setIsLoading(false);

      // Fallback to mock data if API fails
      const mockArtists = [
        {
          id: 1,
          name: "The Weeknd",
          picture_medium:
            "https://e-cdns-images.dzcdn.net/images/artist/033c9b5cb85e5dfc6ec4b9e55994ff91/250x250-000000-80-0-0.jpg",
          monthlyListeners: 85432109,
        },
        {
          id: 2,
          name: "Dua Lipa",
          picture_medium:
            "https://e-cdns-images.dzcdn.net/images/artist/e6a04d735093a46dcc8be197681d1199/250x250-000000-80-0-0.jpg",
          monthlyListeners: 65329871,
        },
        {
          id: 3,
          name: "Billie Eilish",
          picture_medium:
            "https://e-cdns-images.dzcdn.net/images/artist/8b6e3a9cf78d742064d7b3deb4b2095f/250x250-000000-80-0-0.jpg",
          monthlyListeners: 72156489,
        },
        {
          id: 4,
          name: "Drake",
          picture_medium:
            "https://e-cdns-images.dzcdn.net/images/artist/5d2fa7f140a6bdc2c864c3465a61fc71/250x250-000000-80-0-0.jpg",
          monthlyListeners: 92457816,
        },
        {
          id: 5,
          name: "Ariana Grande",
          picture_medium:
            "https://e-cdns-images.dzcdn.net/images/artist/3b99aa38bc4f58b05d6671c918eeb03e/250x250-000000-80-0-0.jpg",
          monthlyListeners: 78965412,
        },
        {
          id: 6,
          name: "Taylor Swift",
          picture_medium:
            "https://e-cdns-images.dzcdn.net/images/artist/c5a63facb4a2b3e2bbc702a8f03d6f8d/250x250-000000-80-0-0.jpg",
          monthlyListeners: 89745632,
        },
        {
          id: 7,
          name: "Bad Bunny",
          picture_medium:
            "https://e-cdns-images.dzcdn.net/images/artist/f21442f56178c1eedc5d68c414944a83/250x250-000000-80-0-0.jpg",
          monthlyListeners: 68974523,
        },
        {
          id: 8,
          name: "Post Malone",
          picture_medium:
            "https://e-cdns-images.dzcdn.net/images/artist/b410fd3c4195a3fc9b02f889f4c3af0a/250x250-000000-80-0-0.jpg",
          monthlyListeners: 71548963,
        },
      ];
      setArtists(mockArtists);
      setFilteredArtists(mockArtists);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleRetry = () => {
    setRetrying(true);
    fetchArtists();
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArtists(artists);
    } else {
      const filtered = artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArtists(filtered);
    }
  }, [searchQuery, artists]);

  const formatListeners = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M monthly listeners`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K monthly listeners`;
    }
    return `${count} monthly listeners`;
  };

  // Skeleton loader for artist cards
  const SkeletonLoader = () => (
    <div className="artists-grid">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="artist-skeleton">
          <div className="artist-skeleton-image"></div>
          <div className="artist-skeleton-name"></div>
          <div className="artist-skeleton-listeners"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="artists-container">
      <h1 className="artists-title">Artists</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {isLoading || retrying ? (
        <SkeletonLoader />
      ) : error ? (
        <div className="error-container">
          <div className="error-message">{error}</div>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      ) : filteredArtists.length === 0 ? (
        <div className="no-results">
          No artists found matching "{searchQuery}"
        </div>
      ) : (
        <div className="artists-grid">
          {filteredArtists.map((artist) => (
            <Link
              to={`/artist/${artist.id}`}
              key={artist.id}
              className="artist-link"
            >
              <motion.div
                className="artist-card"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="artist-image-container">
                  <img
                    src={artist.picture_medium}
                    alt={artist.name}
                    className="artist-image"
                  />
                  <motion.div
                    className="play-icon-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaPlay className="play-icon" />
                  </motion.div>
                </div>
                <h3 className="artist-name">{artist.name}</h3>
                <p className="artist-listeners">
                  {formatListeners(artist.monthlyListeners)}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Artists;
