class Renderer {
    render(templateID, data, destination) {
        console.log(data)
        $(`.${destination}`).empty()
        const source = $(`#${templateID}`).html()
        const template = Handlebars.compile(source)
        
        const html = template(data)
        $(`.${destination}`).append(html)
    }

    clear(){
        $(".messages-area").empty()
    }

}