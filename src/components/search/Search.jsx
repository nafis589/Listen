import React from 'react';
import './Search.css';

const Search = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for songs, artists, or albums..."
        className="search-input"
      />
      <button className="search-button">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default Search;