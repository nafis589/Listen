import React from "react";
import PropTypes from "prop-types";
import styles from "./Album.module.css";

const Album = ({ imageUrl, title, artist, isPlaying }) => {
  return (
    <div className={styles.albumCard}>
      <div className={styles.albumArtwork}>
        <img src={imageUrl} alt={title} />
        {isPlaying && (
          <div className={styles.playingIndicator}>
            <button className={styles.playPauseBtn}>
              <svg viewBox="0 0 24 24" fill="white" height="24" width="24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className={styles.albumInfo}>
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
    </div>
  );
};

Album.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool,
};

Album.defaultProps = {
  isPlaying: false,
};

export default Album;
