function buscarTexto() {
    let resultados = {};
    let texto = $('input').val().toLowerCase()

    console.log(!texto)

    if (!texto) {
        mostrarResultados(resultados)
        return;
    }

    let sobreMiFetch = fetch("https://pabvf23.github.io/UX/sobremi.html").then(response => response.text())
    let aficionesFetch = fetch("https://pabvf23.github.io/UX/aficiones.html").then(response => response.text())
    let proyectosFetch = fetch("https://pabvf23.github.io/UX/proyectos.html").then(response => response.text())

    Promise.all([sobreMiFetch, aficionesFetch, proyectosFetch])
    .then(results => {
        var [sobreMiData, aficionesData, proyectosData] = results

        var sobreMiEntries = []

        $(sobreMiData).find("p, h1, h2, h3, li").each(function() {
            let text = $(this).text()
            let textLower = text.toLowerCase()
            if (textLower.includes(texto)) {
                sobreMiEntries.push(text)
            }
        })

        if (sobreMiEntries.length) {
            resultados["sobremi"] = sobreMiEntries
        }

        var aficionesEntries = []

        $(aficionesData).find("p, h1, h2, h3, li").each(function() {
            let text = $(this).text()
            let textLower = text.toLowerCase()
            if (textLower.includes(texto)) {
                aficionesEntries.push(text)
            }
        })

        if (aficionesEntries.length) {
            resultados["aficiones"] = aficionesEntries
        }

        var proyectosEntries = []

        $(proyectosData).find("p, h1, h2, h3, li").each(function() {
            let text = $(this).text()
            let textLower = text.toLowerCase()
            if (textLower.includes(texto)) {
                proyectosEntries.push(text)
            }
        })

        if (proyectosEntries.length) {
            resultados["proyectos"] = proyectosEntries
        }

        mostrarResultados(resultados);
    })
}

function mostrarResultados(resultados) {
    let contenedorResultados = $("article").last()
    $(contenedorResultados).empty()

    if (Object.keys(resultados).length) {
        $(contenedorResultados).append("<h3>Resultados</h3>")
    }

    if (resultados["sobremi"]) {
        $(contenedorResultados).append("<p>Sobre mí:</p>")
        $(contenedorResultados).append("<ul></ul>")

        var list = $(contenedorResultados).find("ul").last()

        resultados["sobremi"].forEach(r => {
            $(list).append("<li>" + r + "</li>")
        })
    }

    if (resultados["aficiones"]) {
        $(contenedorResultados).append("<p>Mis aficiones:</p>")
        $(contenedorResultados).append("<ul></ul>")

        var list = $(contenedorResultados).find("ul").last()

        resultados["aficiones"].forEach(r => {
            $(list).append("<li>" + r + "</li>")
        })
    }

    if (resultados["proyectos"]) {
        $(contenedorResultados).append("<p>Mis proyectos:</p>")
        $(contenedorResultados).append("<ul></ul>")

        var list = $(contenedorResultados).find("ul").last()

        resultados["proyectos"].forEach(r => {
            $(list).append("<li>" + r + "</li>")
        })
    }
}