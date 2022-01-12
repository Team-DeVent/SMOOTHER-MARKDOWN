async function getArticle(url) {
    let response = fetch(url);
    return response.then(res => res.text());
}

async function loadNavbar() {
    let body = document.querySelector("#__nav")
    let data = await getArticle("/articles/nav.html")
    body.innerHTML = data
}

async function loadFooter() {
    let body = document.querySelector("#__footer")
    let data = await getArticle("/articles/footer.html")
    body.innerHTML = data
}