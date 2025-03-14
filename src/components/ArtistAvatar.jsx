import React from "react";
import PropTypes from "prop-types";

const ArtistAvatar = ({ imageUrl, name, isVerified }) => {
  return (
    <div className="artist-avatar">
      <div className="avatar-wrapper">
        <img src={imageUrl} alt={name} className="avatar-image" />
        {isVerified && (
          <div className="verified-badge">
            <svg viewBox="0 0 24 24" fill="#1DB954" height="16" width="16">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        )}
      </div>
      <span className="artist-name">{name}</span>

      <style jsx>{`
        .artist-avatar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: transform 0.2s ease;
          padding: 4px;
        }

        .artist-avatar:hover {
          transform: scale(1.05);
        }

        .avatar-wrapper {
          position: relative;
          width: 64px;
          height: 64px;
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .verified-badge {
          position: absolute;
          bottom: -2px;
          right: -2px;
          background: #000;
          border-radius: 50%;
          padding: 2px;
        }

        .artist-name {
          font-size: 0.875rem;
          color: #fff;
          text-align: center;
          max-width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

ArtistAvatar.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isVerified: PropTypes.bool,
};

ArtistAvatar.defaultProps = {
  isVerified: false,
};

export default ArtistAvatar;