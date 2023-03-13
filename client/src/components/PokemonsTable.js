import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function PokemonsTable({ chosenPokemons }) {
  return (
    <div className="pokemons-table">
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
            const thumbnailNumber = String(pokemon.id).padStart(3, "0");
            const thumbnailSrc = `/thumbnails/${thumbnailNumber}.png`;
            return (
              <tr key={pokemon.id}>
                <td>
                  <img src={thumbnailSrc} alt={`pokemon.name.english`} />
                </td>
                <td>{pokemon.name?.english}</td>

                <td>
                  <Link to={`/${pokemon.id}`}>
                    <button className="button-details">More Details</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonsTable;
