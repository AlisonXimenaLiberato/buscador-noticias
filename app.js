const selectCategoria = document.getElementById("categoria");
const divNoticias = document.getElementById("noticias");

selectCategoria.addEventListener("change", () => {
  const categoria = selectCategoria.value;
  if (!categoria) {
    divNoticias.innerHTML = "<p>Selecciona una categoría para ver noticias.</p>";
    return;
  }
  obtenerNoticias(categoria);
});

async function obtenerNoticias(categoria) {
  const apiKey = "996409b7df5142cc9e9698610b17d2f8"; // <-- coloca tu clave aquí
  const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=${apiKey}`;

  divNoticias.innerHTML = `
    <div class="text-center mt-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p>Cargando noticias...</p>
    </div>
  `;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.articles.length === 0) {
      divNoticias.innerHTML = `<p>No se encontraron noticias para la categoría "${categoria}".</p>`;
      return;
    }

    mostrarNoticias(datos.articles);
  } catch (error) {
    divNoticias.innerHTML = `<p>Error al cargar las noticias: ${error.message}</p>`;
  }
}

function mostrarNoticias(noticias) {
  divNoticias.innerHTML = "";

  noticias.forEach((noticia) => {
    const { title, description, url, urlToImage, source } = noticia;
    const imagen = urlToImage || "https://via.placeholder.com/300x200?text=Sin+Imagen";

    const card = document.createElement("div");
    card.classList.add("col-md-4", "noticia");

    card.innerHTML = `
      <div class="card h-100">
        <img src="${imagen}" class="card-img-top" alt="${title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description || "Sin descripción disponible."}</p>
          <p class="text-muted mt-auto">Fuente: ${source.name}</p>
          <a href="${url}" target="_blank" class="btn btn-primary mt-2">Leer más</a>
        </div>
      </div>
    `;

    divNoticias.appendChild(card);
  });
}
