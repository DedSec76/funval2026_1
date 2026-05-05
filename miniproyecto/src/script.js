const nav = document.querySelector("#menu")
const btnHamburger = document.querySelector("#btnMenu")

btnHamburger.addEventListener("click", () => {
    nav.dataset.open = nav.dataset.open === "true" ? "false" : "true";
    btnHamburger.classList.toggle("open");
})
