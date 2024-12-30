const express = require("express");
const pokemonListRoutes = require("./pokemon/list");
const pokemonDetailsRoutes = require("./pokemon/details");
const rickAndMortyListRoutes = require("./rickandmorty/list");
const rickAndMortyDetailsRoutes = require("./rickandmorty/details");

const router = express.Router();

router.use("/pokemon", pokemonListRoutes);
router.use("/pokemon/details", pokemonDetailsRoutes);
router.use("/rickandmorty", rickAndMortyListRoutes);
router.use("/rickandmorty/details", rickAndMortyDetailsRoutes);

module.exports = router;
