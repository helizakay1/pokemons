import React, { useContext } from "react";
import "../App.css";
import { POKEMONS_PER_PAGE } from "../constants/homepage";
import PokemonsTable from "./PokemonsTable";
import { PokedexContext } from "../context/pokedex";

function Homepage() {
  const allPokemons = useContext(PokedexContext);
  const [chosenPokemons, setChosenPokemons] = React.useState([]);
  const randomizeNewPokemons = () => {
    const chosenPokemons = pickRandomPokemons(allPokemons);
    setChosenPokemons(chosenPokemons);
  };
  React.useEffect(() => {
    setChosenPokemons(pickRandomPokemons(allPokemons));
  }, [allPokemons]);

  const pickRandomPokemons = (pokemons) => {
    const randNums = [];
    for (let i = 0; i < POKEMONS_PER_PAGE; i++) {
      randNums.push(Math.floor(Math.random() * pokemons.length));
    }
    const chosenPokemons = pokemons.filter((pokemon) => {
      return randNums.includes(pokemon.id);
    });
    return chosenPokemons;
  };

  return (
    <div className="homepage">
      <h1>Pokemons List</h1>
      <PokemonsTable chosenPokemons={chosenPokemons} />
      <button className="button-refresh" onClick={randomizeNewPokemons}>
        Refresh
      </button>
    </div>
  );
}

export default Homepage;
