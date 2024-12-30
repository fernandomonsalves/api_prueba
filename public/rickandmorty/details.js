async function loadRickDetails(url, onDetailsLoaded) {
  const details = document.getElementById("details");
  details.innerHTML = "Cargando detalles...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    details.innerHTML = `
      <div class="details-card">
        <img src="${data.image}" alt="${data.name}" />
        <h2>${data.name}</h2>
        <p><strong>Estado:</strong> ${data.status}</p>
        <p><strong>Especie:</strong> ${data.species}</p>
        <p><strong>Género:</strong> ${data.gender}</p>
        <p><strong>Origen:</strong> ${data.origin.name}</p>
        <p><strong>Ubicación:</strong> ${data.location.name}</p>
      </div>
    `;

    if (onDetailsLoaded) onDetailsLoaded();
  } catch (error) {
    details.innerHTML = "Error al cargar los detalles.";
  }
}

export default loadRickDetails;
