import { renderizarLista } from "./utils";
import { stays } from "./stays.js"

const mainContainer = document.querySelector("#contenedor")

const filtros = {
    city: "",
    guests: 0
}

// Funcion para obtener lugares según
// busqueda del usuario
export function filtrarLugares() {
    const location = document.querySelector("#inputLocation")
    const listStays = document.querySelector("#staysList")
    
    let html;

    location.addEventListener("input", (e) => {
        listStays.classList.remove("hidden")
        html = ""

        let value = location.value.toLowerCase().trim()

        if(value.length === 0) return
        filtros.city = value

        mainContainer.innerHTML = ""

        const filtrados = stays.filter(s => s.city.toLowerCase().includes(filtros.city))

        renderizarLista(mainContainer, filtrados)

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

            filtros.city = item

            aplicarFiltros()
        })
    }
}

// Objeto de huespedes
const huesped = {
    adults: {
        count: 0,
        span: null,
    },
    children: {
        count: 0,
        span: null,
    }
}

// Funcion para obtener la cantidad de huespedes
// que añade el usuario
export function filtrarHuespedes() {
    const containerGuest = document.querySelector("#containerGuest")
    const modalGuest = containerGuest.querySelector("#guest-popover")

    // Abrir el Popover para añadir huespedes
    containerGuest.addEventListener("click", (e) => {
        if(e.target.closest("#btnGuests")) { 
            modalGuest.classList.toggle("hidden")
        }
    })

    // Inicializamos las referencias a los spans y valores
    huesped.adults.span = modalGuest.querySelector("#adultSpan")
    huesped.children.span = modalGuest.querySelector("#childSpan")
    
    // convertimos texto del span a numeros
    huesped.adults.count = Number(huesped.adults.span.textContent) || 0
    huesped.children.count = Number(huesped.children.span.textContent) || 0

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
        if(!totalSpan) return
        
        totalSpan.textContent = `${total} ${total <= 1 ? "Guest" : "Guests"}`
        
        // Activa y desactiva boton al llegar al maximo
        actualizarBotones(total);

        // Pintar en HTML
        guest.span.textContent = guest.count

        // Filtra la busqueda por numero de huespedes
        filtros.guests = total

        aplicarFiltros()
    })
}

export function aplicarFiltros() {
    let resultados = stays

    if(filtros.city !== "") { 
        resultados = resultados.filter(s => s.city.toLowerCase() === filtros.city)
    }

    if(filtros.guests !== 0) { 
        resultados = resultados.filter(s => s.maxGuests >= filtros.guests)
    }

    if(resultados.length === 0) { 
        mainContainer.innerHTML = `<h3 class="mt-6 font-bold text-2xl text-center">Not Found Stays</h3>`    
    }

    renderizarLista(mainContainer, resultados)

    // Total de stays
    const spanStays = document.querySelector("#totalStays")
    if(!spanStays) return

    const cantidad = resultados.length
    spanStays.textContent = `${cantidad} ${cantidad > 1 ? "stays" : "stay"}`
        
}

function actualizarBotones(total) {
    let max = 10;
    const btns = document.querySelectorAll(`[data-action='increment']`)

    btns.forEach(b => {
        if(total >= max) {
            b.disabled = true
        } else {
            b.disabled = false
        }
    });
}

