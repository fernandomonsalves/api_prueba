import loadPokemonList from "./pokemon/list.js";
import loadPokemonDetails from "./pokemon/details.js";
import loadRickList from "./rickandmorty/list.js";
import loadRickDetails from "./rickandmorty/details.js";

let currentSearchQuery = "";
let currentPage = 1;

//Listado de Pokémon
document.getElementById("load-pokemon-list").addEventListener("click", () => {
  resetToListState();
  document.getElementById("search").placeholder = "Buscar Pokémon";
  document.getElementById("search").style.display = "inline-block";
  loadPokemonList(currentPage, currentSearchQuery);
});

//Búsqueda de Pokémon
document.getElementById("search").addEventListener("input", (e) => {
  currentSearchQuery = e.target.value;
  if (document.getElementById("search").placeholder === "Buscar Pokémon") {
    loadPokemonList(1, currentSearchQuery);
  } else {
    loadRickList(1, currentSearchQuery);
  }
});

//Listado de Rick and Morty
document.getElementById("load-rick-list").addEventListener("click", () => {
  resetToListState();
  document.getElementById("search").placeholder = "Buscar Personaje";
  document.getElementById("search").style.display = "inline-block";
  loadRickList(currentPage, currentSearchQuery);
});

//Detalles de un Pokémon
window.loadPokemonDetails = (url) => {
  hideListAndPagination();
  loadPokemonDetails(url);
};

//Detalles de un personaje de Rick and Morty
window.loadRickDetails = (url) => {
  hideListAndPagination();
  loadRickDetails(url);
};

//Ocultar lista y paginación al mostrar detalles
function hideListAndPagination() {
  document.getElementById("content").style.display = "none";
  document.getElementById("pagination").style.display = "none";
  document.getElementById("details").style.display = "block";
  document.getElementById("search").style.display = "none";
}

//Volver al estado de listado
function resetToListState() {
  document.getElementById("details").style.display = "none";
  document.getElementById("content").style.display = "grid";
  document.getElementById("pagination").style.display = "block";
  currentSearchQuery = "";
}
