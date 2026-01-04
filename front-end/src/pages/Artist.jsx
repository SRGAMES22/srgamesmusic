import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";

const Artist = () => {
  const { id } = useParams();

  const artist = artistArray.find((a) => a._id === id);

  if (!artist) {
    return (
      <div
        className="artist not-found"
        style={{ padding: "40px", color: "white", textAlign: "center" }}
      >
        <h2>Artista não encontrado</h2>
        <p>Desculpe, não encontramos o artista com o ID: {id}</p>
        <Link to="/" style={{ color: "#7e0d00ff", fontWeight: "bold" }}>
          Voltar para o início
        </Link>
      </div>
    );
  }

  const { name, banner, image } = artist;

  const songsFromArtist = songsArray.filter((song) => song.artist === name);

  const getRandomSongId = () => {
    if (songsFromArtist.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * songsFromArtist.length);
    return songsFromArtist[randomIndex]._id;
  };

  const randomIdFromArtist = getRandomSongId();

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(${
            banner ||
            image ||
            "https://via.placeholder.com/1920x600/000000/111111?text=Sem+Banner"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60svh",
          minHeight: "450px",
          display: "flex",
          alignItems: "flex-end",
          padding: "40px",
        }}
      >
        <h1
          className="artist__tittle"
          style={{
            color: "white",
            fontSize: "80px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {name}
        </h1>
      </div>

      <div className="artist__body" style={{ padding: "40px 20px" }}>
        <h2 style={{ color: "white", fontSize: "32px", marginBottom: "30px" }}>
          Populares
        </h2>
        <SongList songsArray={songsFromArtist} />
      </div>

      {randomIdFromArtist && (
        <Link to={`/song/${randomIdFromArtist}`}>
          <FontAwesomeIcon
            icon={faCirclePlay}
            style={{
              position: "fixed",
              bottom: "50px",
              right: "40px",
              fontSize: "55px",
              color: "#edf505ff",
              backgroundColor: "rgba(0,0,0,0.7)",
              padding: "10px 5px",
              borderRadius: "100%",

              boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
              zIndex: 1000,
            }}
          />
        </Link>
      )}
    </div>
  );
};

export default Artist;
