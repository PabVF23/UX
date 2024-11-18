function buscarTexto() {
    let resultados = {};
    // Obtener texto del buscador
    let texto = $('input').val().toLowerCase()

    // Si el buscador está vacío, eliminar sección de resultados y terminar ejecución
    if (!texto) {
        let contenedorResultados = $("section")
        $(contenedorResultados).remove()
        return;
    }

    // Obtener contenidos de las páginas del proyecto
    let sobreMiFetch = fetch("sobremi.html").then(response => response.text())
    let aficionesFetch = fetch("aficiones.html").then(response => response.text())
    let proyectosFetch = fetch("proyectos.html").then(response => response.text())

    Promise.all([sobreMiFetch, aficionesFetch, proyectosFetch])
    .then(results => {
        var [sobreMiData, aficionesData, proyectosData] = results

        var sobreMiEntries = []

        // Buscar el texto en los contenidos de la página "sobremi"
        $(sobreMiData).find("p, h1, h2, h3, li").each(function() {
            let text = $(this).text()
            let textLower = text.toLowerCase()
            if (textLower.includes(texto)) {
                sobreMiEntries.push(text)
            }
        })

        // Si se han encontrado resultados, guardar los elementos que lo contengan
        if (sobreMiEntries.length) {
            resultados["sobremi"] = sobreMiEntries
        }

        var aficionesEntries = []

        // Buscar el texto en los contenidos de la página "aficiones", y guardar los elementos que lo contengan
        $(aficionesData).find("p, h1, h2, h3, li").each(function() {
            let text = $(this).text()
            let textLower = text.toLowerCase()
            if (textLower.includes(texto)) {
                aficionesEntries.push(text)
            }
        })

        // Si se han encontrado resultados, guardar los elementos que lo contengan
        if (aficionesEntries.length) {
            resultados["aficiones"] = aficionesEntries
        }

        var proyectosEntries = []
    
        // Buscar el texto en los contenidos de la página "proyectos"
        $(proyectosData).find("p, h1, h2, h3, li").each(function() {
            let text = $(this).text()
            let textLower = text.toLowerCase()
            if (textLower.includes(texto)) {
                proyectosEntries.push(text)
            }
        })

        // Si se han encontrado resultados, guardar los elementos que lo contengan
        if (proyectosEntries.length) {
            resultados["proyectos"] = proyectosEntries
        }

        // Mostrar resultados
        mostrarResultados(resultados);
    })
}

function mostrarResultados(resultados) {
    // Eliminar contenedor de resultados (en caso de estar presente)
    $("section").remove()

    // Añadir sección de resultados
    $("input").after("<section></section>")
    $("section").append("<h3>Resultados</h3>")

    // Si no hay sección de resultados, añadir texto de que no se encontraron
    if (!Object.keys(resultados).length) {
        $("section").append("<p>No se encontraron resultados.</p>")
    }

    // Obtener contenedor de resultados
    let contenedorResultados = $("section")

    // Si hay resultados en "sobremi", añadir los elementos en una sección propia
    if (resultados["sobremi"]) {
        $(contenedorResultados).append("<article></article>")
        var secciónResultados = $(contenedorResultados).find("article").last()
        $(secciónResultados).append("<h4>Sobre mí</h4>")
        $(secciónResultados).append("<ul></ul>")

        var list = $(secciónResultados).find("ul")

        resultados["sobremi"].forEach(r => {
            $(list).append("<li>" + r + "</li>")
        })
    }

    // Si hay resultados en "aficiones", añadir los elementos en una sección propia
    if (resultados["aficiones"]) {
        $(contenedorResultados).append("<article></article>")
        var secciónResultados = $(contenedorResultados).find("article").last()
        $(secciónResultados).append("<h4>Mis aficiones</h4>")
        $(secciónResultados).append("<ul></ul>")

        var list = $(secciónResultados).find("ul")

        resultados["aficiones"].forEach(r => {
            $(list).append("<li>" + r + "</li>")
        })
    }

    // Si hay resultados en "proyectos", añadir los elementos en una sección propia
    if (resultados["proyectos"]) {
        $(contenedorResultados).append("<article></article>")
        var secciónResultados = $(contenedorResultados).find("article").last()
        $(secciónResultados).append("<h4>Mis proyectos</h4>")
        $(secciónResultados).append("<ul></ul>")

        var list = $(secciónResultados).find("ul")

        resultados["proyectos"].forEach(r => {
            $(list).append("<li>" + r + "</li>")
        })
    }
}