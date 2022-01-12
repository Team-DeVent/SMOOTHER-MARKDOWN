async function resizeTextarea(object) {
    object.style.height = '1px';
    object.style.height = 20+(object.scrollHeight)+"px";     
}

async function updateMarkdownPreview() {
    let body = await getMarkdownText();

    var converter = new showdown.Converter(),
    html      = converter.makeHtml(body);
    document.querySelector("#markdown_preview").innerHTML = html;
}


async function getMarkdownText() {
    let body = myCodeMirror.getValue();
    return body
}