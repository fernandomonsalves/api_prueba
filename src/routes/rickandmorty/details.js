const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los detalles del personaje." });
  }
});

module.exports = router;
