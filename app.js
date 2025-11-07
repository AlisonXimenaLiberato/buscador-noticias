const obtenerNoticias = async () => {
    const categoria = document.querySelector("#categoria").value;

    if (categoria === "") {
        M.toast({ html: "⚠️ Selecciona una categoría primero", classes: "orange darken-2" });
        return;
    }

    // 1. Mostrar el indicador de carga ANTES de llamar a la API (Líneas movidas y mejoradas)
    let divlistadoNoticias = document.querySelector("#divlistadoNoticias");
    divlistadoNoticias.innerHTML = `
        <div style="text-align:center">
            <img src="loading-25.gif" width="150" height="150" alt="Cargando...">
            <p class="blue-text text-darken-3">Cargando noticias...</p>
        </div>`;

    const apikey = "996409b7df5142cc9e9698610b17d2f8";
const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${apikey}`; 

    // 2. Llamar a la API
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    console.log(resultado);

    let noticias = resultado.articles;
    let listadoNoticiasHTML = ``;

    // 3. Procesar las noticias
    if (noticias.length === 0) {
        // Manejar el caso de que no haya noticias para la categoría/país
        listadoNoticiasHTML = `<h5 class="center-align">No se encontraron noticias en esta categoría.</h5>`;
    } else {
        noticias.map(noticia => {
            const { urlToImage, url, title, description, source } = noticia;

            let imagen = (urlToImage)
                ? `<div class="card-image">
                    <img src="${urlToImage}" alt="${title}">
                    <span class="card-title">${source.name}</span>
                   </div>`: null;

            listadoNoticiasHTML += `
                <div class="col s12 m6 l4">
                    <div class="card">
                        ${imagen ? imagen : ''}
                        <div class="card-content">
                            <h3>${title}</h3>
                            <p>${description}</p>
                        </div>
                        <div class="card-action center-align">
                            <a href="${url}" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="waves-effect waves-light btn">
                              Ver Noticia Completa</a>
                        </div>
                    </div>
                </div>`;
        });
    }

    // 4. Quitar el setTimeout y mostrar las noticias inmediatamente después de obtenerlas
    // Si quieres conservar el efecto de "carga" de 2 segundos, puedes usar el setTimeout AQUÍ
    setTimeout(() => {
        divlistadoNoticias.innerHTML = listadoNoticiasHTML;
    }, 2000);
};