"use strict"
class Lector {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            this.soportaAPIFile = true;
        } else {
            $("h2").after("<p>Este navegador no soporta el API File</p>")
            this.soportaAPIFile = false;
        }
    }

    readInputFile(file) {
        $("input + section").remove()
        $($("input")).after("<section></section>")

        let archivo = $("input").prop("files")[0];
        console.log(archivo.name.split(".").at(-1))
        let lector = this

        if (archivo.name.split(".").at(-1) === "fb2") {
            let reader = new FileReader();
            reader.onload = function(evento) {

                let contents = $.parseXML(reader.result);
                lector.processFile(contents)
            }

            reader.readAsText(archivo);
        } else {
            $("section").append("<p>Error: El archivo indicado no es de tipo FB2<p>")
        }
    }

    processFile(fileContents) {
        $("section").append("<section></section>")
        this.processDocumentDescription($(fileContents).find("description"))
    }

    processDocumentDescription(fileDescription) {
        var documentDataSection = $("section > section")

        documentDataSection.append("<h3>Datos del texto</h3>")
        var authorData = $(fileDescription).find("title-info > author")
        var authorName = ""

        authorName += $(authorData).find("first-name").text()
        authorName += $(authorData).find("middle-name").length ? " " + $(authorData).find("middle-name").text() + " " : " "
        authorName += $(authorData).find("last-name").text()
        
        documentDataSection.append("<h4>Autor:</h4>")
        documentDataSection.append("<p>" + authorName + "</p>")

        documentDataSection.append("<h4>Título:</h4>")
        if ($(fileDescription).find("title-info > book-title").length) {
            var title = $(fileDescription).find("title-info > book-title").text()

            documentDataSection.append("<p>" + title + "</p>")
        } else {
            documentDataSection.append("<p>El texto no tiene título</p>")
        }

        var genre = $(fileDescription).find("title-info > genre").text()

        documentDataSection.append("<h4>Género:</h4>")
        documentDataSection.append("<p>" + genre.charAt(0).toUpperCase() + genre.slice(1) + "</p>")

        documentDataSection.append("<h4>Editor:</h4>")
        if ($(fileDescription).find("publish-info > publisher").length) {
            var publisher = $(fileDescription).find("publish-info > publisher").text()

            documentDataSection.append("<p>" + publisher + "</p>")
        } else {
            documentDataSection.append("<p>El texto no tiene editor</p>")
        }

        documentDataSection.append("<h4>Año:</h4>")
        if ($(fileDescription).find("publish-info > year").length) {
            var year = $(fileDescription).find("publish-info > year").text()

            documentDataSection.append("<p>" + year + "</p>")
        } else {
            documentDataSection.append("<p>El texto no tiene año de publicación</p>")
        }
    }
}