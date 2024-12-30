async function loadRickList(page, searchQuery) {
  const content = document.getElementById("content");
  const pagination = document.getElementById("pagination");
  content.innerHTML = "Cargando lista de Rick and Morty...";
  pagination.innerHTML = "";

  try {
    const response = await fetch(`/api/rickandmorty?page=${page}&limit=20&search=${searchQuery}`);
    const data = await response.json();

    content.innerHTML = data.data
      .map(
        (item) => `
          <div class="card" onclick="loadRickDetails('${item.url}')">
            <img src="${item.image}" alt="${item.name}" />
            <p>${item.name}</p>
          </div>
        `
      )
      .join("");

    if (!searchQuery) {
      const prevButton = document.createElement("button");
      prevButton.innerText = "⟵ Anterior";
      prevButton.disabled = page === 1;
      prevButton.onclick = () => loadRickList(page - 1, searchQuery);

      const nextButton = document.createElement("button");
      nextButton.innerText = "Siguiente ⟶";
      nextButton.disabled = data.data.length < 20;
      nextButton.onclick = () => loadRickList(page + 1, searchQuery);

      pagination.appendChild(prevButton);
      pagination.appendChild(nextButton);
    }
  } catch (error) {
    content.innerHTML = "Error al cargar la lista de Rick and Morty.";
  }
}

export default loadRickList;
