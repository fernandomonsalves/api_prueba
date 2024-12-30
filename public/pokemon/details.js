async function loadPokemonDetails(url, onDetailsLoaded) {
  const details = document.getElementById("details");
  details.innerHTML = "Cargando detalles...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    details.innerHTML = `
      <div class="details-card">
        <img src="${data.sprites.front_default}" alt="${data.name}" />
        <h2>${data.name}</h2>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Altura:</strong> ${data.height}</p>
        <p><strong>Peso:</strong> ${data.weight}</p>
        <p><strong>Habilidades:</strong> ${data.abilities
          .map((ability) => ability.ability.name)
          .join(", ")}</p>
      </div>
    `;

    if (onDetailsLoaded) onDetailsLoaded();
  } catch (error) {
    details.innerHTML = "Error al cargar los detalles.";
  }
}

export default loadPokemonDetails;
