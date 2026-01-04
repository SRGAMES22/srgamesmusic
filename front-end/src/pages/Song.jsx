import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";

const Song = () => {
  const { id } = useParams();

  const { image, name, duration, artist, audio, index } = songsArray.filter(
    (currentSongObj) => currentSongObj._id === id
  )[0];

  const artistObj = artistArray.filter(
    (currentArtistObj) => currentArtistObj.name === artist
  )[0];

  const songsArrayFromArtist = songsArray.filter(
    (currentSongObj) => currentSongObj.artist === artist
  );

  const randomIndex = Math.floor(
    Math.random() * (songsArrayFromArtist.length - 1)
  );
  const randomIndex2 = Math.floor(
    Math.random() * (songsArrayFromArtist.length - 1)
  );

  const randomIdFromArtist = songsArrayFromArtist[randomIndex]._id;

  const randomId2FromArtist = songsArrayFromArtist[randomIndex2]._id;

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container"></div>
      </div>
      <div className="song__bar">
        <Link to={`/artist/${artistObj._id}`} className="song__artist-image">
          <img
            className="imagem__pequena"
            width={75}
            height={75}
            src={artistObj.image}
            alt={`imagem do artista ${artist}`}
          />
        </Link>{" "}
        <div>
          <p className="song__name">{name}</p>
          <p className="titulo__banda">{artist}</p>
        </div>
      </div>
      <Player
        audio={audio}
        duration={duration}
        randomIdFromArtist={randomIdFromArtist}
        randomId2FromArtist={randomId2FromArtist}
      />
    </div>
  );
};

export default Song;
