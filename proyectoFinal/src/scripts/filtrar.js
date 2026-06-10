import { renderizarLista } from "./utils";
import { stays } from "./stays.js"

const mainContainer = document.querySelector("#contenedor")

export function filtrarLugares() {
    const location = document.querySelector("#inputLocation")
    const listStays = document.querySelector("#staysList")
    
    let html;

    location.addEventListener("input", (e) => {
        listStays.classList.remove("hidden")
        html = ""

        let value = location.value.toLowerCase().trim()

        if(value.length === 0) return

        const filtrados = stays.filter(s => s.city.toLowerCase().includes(value))
        
        if(filtrados.length === 0) {
            html = "<p>No Stays found</p>"
        
        } else {
            filtrados.forEach(f => {
                html += `<li data-city="${f.city}" class="text-gray-500">📍${f.city}, ${f.country}</li>`
            })
        }

        listStays.innerHTML = html
    })

    añadirValue()

    function añadirValue() {
        listStays.addEventListener("click", (e) => {
            // Limpiamos el contenedor principal padre para filtrar 
            // y no se acumulen los valores
            mainContainer.innerHTML = ""

            const city = e.target.closest("li")

            if(!city) return

            const item = city.dataset.city.toLowerCase()
            
            listStays.classList.add("hidden")
            location.value = city.textContent

            const filtrados = stays.filter(s => s.city.toLowerCase() === item)
            renderizarLista(mainContainer, filtrados)

            const spanStays = document.querySelector("#totalStays")
            if(!spanStays) return

            const cantidad = filtrados.length
            spanStays.textContent = `${cantidad} ${cantidad > 1 ? "stays" : "stay"}`
        })
    }
}

export function filtrarHuespedes(modalGuest, huesped) {
    modalGuest.addEventListener("click", (e) => {
        mainContainer.innerHTML = ""

        let dataType = e.target.dataset.type
        let dataAction = e.target.dataset.action

        if(!dataType || !dataAction) return
            
        const guest = huesped[dataType];
        if(!guest) return

        // Actualizar estado
        if (dataAction === "increment") {
            guest.count++
        } else if (guest.count > 0) {
            guest.count--
        }

        // Calcula y muestra el total de huespedes
        let total = huesped.adults.count + huesped.children.count;
        const totalSpan = document.querySelector("#totalGuests")
        totalSpan.textContent = `${total} ${total <= 1 ? "Guest" : "Guests"}`
        
        // Activa y desactiva boton al llegar al maximo
        actualizarBotones(total);

        // Pintar en HTML
        guest.span.textContent = guest.count

        // Filtra la busqueda por numero de huespedes
        const filtrados = stays.filter(s => s.maxGuests >= total)
        renderizarLista(mainContainer, filtrados)
    })
}

function actualizarBotones(total) {
    let max = 10;
    const btns = document.querySelectorAll(`[data-action='increment']`)
    
    if(!btns) return

    btns.forEach(b => {
        if(total >= max) {
            b.disabled = true
        } else {
            b.disabled = false
        }
    });
}

