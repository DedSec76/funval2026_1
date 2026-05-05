const nav = document.querySelector("#menu")
const btnHamburger = document.querySelector("#btnMenu")
const lastModified = document.getElementById("lastModified")
const year = document.getElementById("year")

const date = new Date()

btnHamburger.addEventListener("click", () => {
    nav.dataset.open = nav.dataset.open === "true" ? "false" : "true";
    btnHamburger.classList.toggle("open");
})

year.textContent = date ? date.getFullYear() : "none"
lastModified.textContent = `Last Modified: ${document.lastModified}`
