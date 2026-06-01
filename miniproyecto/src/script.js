import { dataload } from "./portfolio"

const nav = document.querySelector("#menu")
const btnHamburger = document.querySelector("#btnMenu")
const lastModified = document.getElementById("lastModified")
const year = document.getElementById("year")
const body = document.querySelector('body')

const date = new Date()

lightMode()
dataload()

btnHamburger.addEventListener("click", () => {
    nav.dataset.open = nav.dataset.open === "true" ? "false" : "true";
    btnHamburger.classList.toggle("open");
})

year.textContent = date ? date.getFullYear() : "none"
lastModified.textContent = `Last Modified: ${document.lastModified}`


function lightMode() {
    const lightMode = document.querySelector('#btnLightMode')
    const img = lightMode.querySelector('img')
    let dataset = img.dataset.light

    lightMode.addEventListener('click', (e) => {
        body.classList.toggle('lightmode');
        
        dataset = dataset === 'off' ? 'on' : 'off'
        img.src = dataset === 'on' ? '/focoOn.png' : '/focoOff.png';
    })
}

