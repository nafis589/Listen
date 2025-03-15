import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const updateRecentSearches = (query, track) => {
    if (!query.trim()) return;

    const newSearch = {
      query,
      title: track?.title || query,
      artist: track?.artist?.name || "",
      image: track?.album?.cover_small || "",
    };

    const newSearches = [
      newSearch,
      ...recentSearches.filter((item) => item.query !== query),
    ].slice(0, 15);

    setRecentSearches(newSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newSearches));
  };

  const removeRecentSearch = (searchToRemove) => {
    const updatedSearches = recentSearches.filter(
      (item) => item.query !== searchToRemove.query
    );
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search.query);
    handleSearch(search.query);
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.deezer.com/search`, {
        params: { q: query },
      });
      setSearchResults(response.data.data);
      if (response.data.data.length > 0) {
        updateRecentSearches(query, response.data.data[0]);
      } else {
        updateRecentSearches(query);
      }
    } catch (error) {
      setError(`Error searching: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h4>Recent Searches</h4>
            <div className="recent-searches-list">
              {recentSearches.map((search, index) => (
                <div key={index} className="recent-search-item">
                  {search.image && (
                    <img src={search.image} alt={search.title} />
                  )}
                  <div className="item-info">
                    <div className="item-title">{search.title}</div>
                    {search.artist && (
                      <div className="item-artist">{search.artist}</div>
                    )}
                  </div>
                  <button
                    className="remove-search"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecentSearch(search);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="search-results">
        {loading && <div className="loading">Searching...</div>}
        {error && <div className="error">{error}</div>}
        {!loading && !error && searchResults.length > 0 && (
          <div className="results-grid">
            {searchResults.map((track) => (
              <div key={track.id} className="result-card">
                <div className="track-cover">
                  <img src={track.album.cover_medium} alt={track.title} />
                  <div className="play-overlay">
                    <button className="play-button">▶</button>
                  </div>
                </div>
                <div className="track-info">
                  <h3>{track.title}</h3>
                  <p>{track.artist.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
