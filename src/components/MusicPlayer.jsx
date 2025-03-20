import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MusicPlayer.css';

const MusicPlayer = ({ isVisible, onClose, track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (track?.preview) {
      audioRef.current = new Audio(track.preview);
      audioRef.current.volume = volume;
      return () => {
        audioRef.current?.pause();
      };
    }
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        startProgressUpdate();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const startProgressUpdate = () => {
    if (audioRef.current) {
      const interval = setInterval(() => {
        if (audioRef.current) {
          const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(currentProgress);

          if (currentProgress >= 100) {
            setIsPlaying(false);
            setProgress(0);
            clearInterval(interval);
          }
        }
      }, 100);

      return () => clearInterval(interval);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    const newTime = clickPosition * (audioRef.current?.duration || 0);
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress((newTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="music-player"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        >
          <div className="player-header">
            <div className="track-info">
              <img 
                src={track?.album?.cover_medium || 'default-album-art.jpg'} 
                alt="Album Cover" 
                className="album-cover"
              />
              <div className="track-details">
                <h3>{track?.title || 'Unknown Track'}</h3>
                <p>{track?.artist?.name || 'Unknown Artist'}</p>
              </div>
            </div>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="player-controls">
            <div 
              className="progress-bar" 
              onClick={handleProgressClick}
            >
              <div 
                className="progress" 
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="controls-main">
              <button className="control-button">
                <i className="fas fa-step-backward"></i>
              </button>
              <button 
                className="control-button play-pause" 
                onClick={handlePlayPause}
              >
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              <button className="control-button">
                <i className="fas fa-step-forward"></i>
              </button>
            </div>

            <div className="volume-control">
              <i className="fas fa-volume-up"></i>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayer;