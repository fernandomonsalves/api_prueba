const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    if (search) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      return res.json({
        page: 1,
        limit: 1,
        total: 1,
        data: [
          {
            id: response.data.id,
            name: response.data.name,
            url: `/api/pokemon/details/${response.data.id}`,
          },
        ],
      });
    }

    const offset = (page - 1) * limit;
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
      params: { offset, limit },
    });

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: response.data.count,
      data: response.data.results.map((pokemon, index) => ({
        id: offset + index + 1,
        name: pokemon.name,
        url: `/api/pokemon/details/${offset + index + 1}`,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos de PokeAPI" });
  }
});

module.exports = router;
