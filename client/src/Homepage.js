import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Homepage() {
  const POKEMONS_PER_PAGE = 5;
  const [allPokemons, setAllPokemons] = React.useState([]);
  const [chosenPokemons, setChosenPokemons] = React.useState([]);

  const randomizeNewPokemons = () => {
    setChosenPokemons(pickRandomPokemons(allPokemons));
  };
  React.useEffect(() => {
    fetch("/pokemons")
      .then((res) => res.json())
      .then((data) => {
        setAllPokemons(data);
        setChosenPokemons(pickRandomPokemons(data));
      });
  }, []);

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
      <table id="pokemons-table-homepage">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {chosenPokemons.map((pokemon) => {
            return (
              <tr key={pokemon.id}>
                <td>
                  <img
                    src={`/thumbnails/${String(pokemon.id).padStart(
                      3,
                      "0"
                    )}.png`}
                    alt={`pokemin.name.english`}
                  />
                </td>
                <td>{pokemon.name.english}</td>

                <td>
                  <Link to={`/pokemons/${pokemon.id}`}>
                    <button className="button-details">More Details</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="button-refresh" onClick={randomizeNewPokemons}>
        Refresh
      </button>
    </div>
  );
}

export default Homepage;
