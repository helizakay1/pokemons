const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const POKEMONS_FILE = "pokemon-data/pokedex.json";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Get all pokemons
app.get("/pokemons", function (req, res) {
  fs.readFile(__dirname + "/" + POKEMONS_FILE, "utf8", function (err, data) {
    if (err) {
      console.log("An error occured while reading JSON file.", err);
      res.sendStatus(500);
    }
    res.status(200).send(data);
  });
});

// Get details for pokemon by id
app.get("/pokemons/:id", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + POKEMONS_FILE, "utf8", function (err, data) {
    if (err) {
      console.log("An error occured while reading JSON file.", err);
      res.sendStatus(500);
    }
    const pokemons = JSON.parse(data);
    const pokemon = pokemons.find((pokemon) => pokemon.id == req.params.id);
    if (!pokemon) {
      console.log(`No pokemon found with id ${req.params.id}`);
      res.status(400).send(`No pokemon found with id ${req.params.id}`);
    }
    res.status(200).send(JSON.stringify(pokemon));
  });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Edit existing pokemon by id
app.patch("/pokemons/:id", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + POKEMONS_FILE, "utf8", (err, data) => {
    if (err) {
      console.log("An error occured while reading JSON file.", err);
      res.sendStatus(500);
    }
    let pokemons = JSON.parse(data);
    if (!req?.body?.updated) {
      res.status(400).send("No updated object sent", err);
    }
    const updatedPokemon = req.body.updated;
    pokemons = pokemons.map((pokemon) => {
      if (pokemon.id == req.params.id) {
        return updatedPokemon;
      }
      return pokemon;
    });

    fs.writeFile(
      __dirname + "/" + POKEMONS_FILE,
      JSON.stringify(pokemons),
      "utf8",
      (err) => {
        if (err) {
          console.log(
            "An error occured while writing JSON Object to File.",
            err
          );
          res.sendStatus(500);
        }
        res.sendStatus(200);
      }
    );
  });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
