function buscarTexto() {
    let resultados = {};
    let texto = $('input').val().toLowerCase()

    console.log(!texto)

    if (!texto) {
        mostrarResultados(resultados)
        return;
    }

    let sobreMiFetch = fetch("../sobremi.html").then(response => response.text())
    let aficionesFetch = fetch("../aficiones.html").then(response => response.text())
    let proyectosFetch = fetch("../proyectos.html").then(response => response.text())

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
    let contenedorResultados = $("section")
    $(contenedorResultados).empty()

    if (Object.keys(resultados).length) {
        $(contenedorResultados).append("<h3>Resultados</h3>")
    }

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