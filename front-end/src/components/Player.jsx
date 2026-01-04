import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const Player = ({
  randomIdFromArtist = "",
  randomId2FromArtist = "",
  audio = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime || 0;
      const duration = audioRef.current.duration || 0;

      setCurrentTime(formatTime(current));

      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
    setIsPlaying(false);
    setCurrentTime("00:00");
    setTotalDuration("00:00");
    setProgress(0);
  }, [audio]);

  // Play / Pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="player">
      <div className="player__controllers">
        <Link to={`/song/${randomIdFromArtist}`}>
          <FontAwesomeIcon className="player__icon" icon={faRotateLeft} />
        </Link>

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={togglePlayPause}
          style={{ fontSize: "40px", cursor: "pointer" }}
        />

        <Link to={`/song/${randomId2FromArtist}`}>
          <FontAwesomeIcon className="player__icon" icon={faRotateRight} />
        </Link>
      </div>

      <div className="player__progress">
        <p className="player__time">{currentTime}</p>

        <div className="player__bar">
          <div
            className="player__bar-progress"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="player__time">{totalDuration}</p>
      </div>

      <audio
        ref={audioRef}
        src={audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setTotalDuration(formatTime(audioRef.current.duration || 0));
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default Player;
