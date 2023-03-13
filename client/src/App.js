import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import DetailsPage from "./components/DetailsPage";
import NavBar from "./components/NavBar";
import { NAV_BAR_ITEMS } from "./constants/navbar";
import { PokedexContext } from "./context/pokedex";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  useEffect(() => {
    fetch("/pokemons")
      .then((res) => res.json())
      .then((data) => {
        setAllPokemons(data);
      });
  }, []);
  return (
    <>
      <Router>
        <NavBar items={NAV_BAR_ITEMS} />
        <PokedexContext.Provider value={allPokemons}>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/:id" element={<DetailsPage />}></Route>
          </Routes>
        </PokedexContext.Provider>
      </Router>
    </>
  );
}

export default App;
