import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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