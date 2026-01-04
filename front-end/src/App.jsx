import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Artists from "./pages/Artists";
import Artist from "./pages/Artist";
import Songs from "./pages/Songs";
import Song from "./pages/Song";
import { songsArray } from "./assets/database/songs";

const App = () => {
  const defaultSong = songsArray[0] || { audio: "", duration: "0:00" };

  const getRandomIds = () => {
    if (songsArray.length < 2) return { random1: "", random2: "" };

    const idx1 = Math.floor(Math.random() * songsArray.length);
    let idx2 = idx1;
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * songsArray.length);
    }
    return {
      random1: songsArray[idx1]._id,
      random2: songsArray[idx2]._id,
    };
  };

  const { random1, random2 } = getRandomIds();

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {" "}
        <Header />
        <div className="content">
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/song/:id" element={<Song />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
