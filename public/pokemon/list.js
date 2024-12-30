async function loadPokemonList(page, searchQuery) {
  const content = document.getElementById("content");
  const pagination = document.getElementById("pagination");
  content.innerHTML = "Cargando lista de Pokémon...";
  pagination.innerHTML = "";

  try {
    const response = await fetch(`/api/pokemon?page=${page}&limit=10&search=${searchQuery}`);
    const data = await response.json();

    content.innerHTML = data.data
      .map(
        (item) => `
          <div class="card" onclick="loadPokemonDetails('${item.url}')">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png" alt="${item.name}" />
            <p>${item.name}</p>
          </div>
        `
      )
      .join("");

    if (!searchQuery) {
      const prevButton = document.createElement("button");
      prevButton.innerText = "⟵ Anterior";
      prevButton.disabled = page === 1;
      prevButton.onclick = () => loadPokemonList(page - 1, searchQuery);

      const nextButton = document.createElement("button");
      nextButton.innerText = "Siguiente ⟶";
      nextButton.disabled = data.data.length < 10;
      nextButton.onclick = () => loadPokemonList(page + 1, searchQuery);

      pagination.appendChild(prevButton);
      pagination.appendChild(nextButton);
    }
  } catch (error) {
    content.innerHTML = "Error al cargar la lista de Pokémon.";
  }
}

export default loadPokemonList;
