const html = document.querySelector("html")

const btnDark = document.querySelector("#darkMode")

function showDarkmode() {
    html.classList.toggle("dark")
}

btnDark.addEventListener("click", showDarkmode)