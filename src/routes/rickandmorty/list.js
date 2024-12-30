const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;

  try {
    if (search) {
      let allCharacters = [];
      let nextPage = "https://rickandmortyapi.com/api/character";

      while (nextPage) {
        const response = await axios.get(nextPage);
        allCharacters = [...allCharacters, ...response.data.results];
        nextPage = response.data.info.next;
      }

      const filteredResults = allCharacters.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      );

      const offset = (page - 1) * limit;
      const paginatedResults = filteredResults.slice(offset, offset + limit);

      return res.json({
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredResults.length,
        data: paginatedResults.map((character) => ({
          id: character.id,
          name: character.name,
          status: character.status,
          species: character.species,
          image: character.image,
          url: `/api/rickandmorty/details/${character.id}`,
        })),
      });
    }

    const response = await axios.get("https://rickandmortyapi.com/api/character", {
      params: { page },
    });

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: response.data.info.count,
      data: response.data.results.map((character) => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        image: character.image,
        url: `/api/rickandmorty/details/${character.id}`,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos de Rick and Morty API" });
  }
});

module.exports = router;
