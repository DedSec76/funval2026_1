import { filtrarHuespedes }  from "./filtrar"


export function renderizarLista(contenedor, lista) {
    lista.map(item => {
        contenedor.innerHTML += 
        `<div class="max-w-106 mx-auto">
            <img class="rounded-3xl w-105 h-58 md:h-72 object-cover" src="${item.photo}">

            <div class="px-3 my-2 flex justify-between items-center">
                ${item.superHost ? `<p class="[font-variant:small-caps] text-lg border px-3 font-semibold text-gray-600 rounded-full">superhost</p>` : ""}
    
                <p class="text-sm md:text-lg text-gray-500">Entire apartment ${item.beds ? `<span>. ${item.beds > 1 ? `${item.beds} beds` : `${item.beds} bed`}</span>` : ""} </p>
                <p class="flex items-center gap-1 text-sm md:text-lg text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        stroke-width="1.5" 
                        stroke="currentColor" 
                        class="fill-[#EB5757] stroke-none size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg> 
                    ${item.rating}
                </p>
            </div>
            <h2 class="px-3 md:text-xl font-semibold">${item.title}</h2>
         </div>
        `
    })
}

export function renderizarUno(contenedor, item) {
    console.log(item)
    contenedor.innerHTML = `
        <div class="max-w-106 mx-auto">
            <img class="rounded-3xl w-105 h-58 md:h-72 object-cover" src="${item.photo}">

            <div class="px-3 my-2 flex justify-between items-center">
                ${item.superHost ? `<p class="[font-variant:small-caps] text-lg border px-3 font-semibold text-gray-600 rounded-full">superhost</p>` : ""}
        
                <p class="text-sm md:text-lg text-gray-500">Entire apartment ${item.beds ? `<span>. ${item.beds > 1 ? `${item.beds} beds` : `${item.beds} bed`}</span>` : ""} </p>
                <p class="flex items-center gap-1 text-sm md:text-lg text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            stroke-width="1.5" 
                            stroke="currentColor" 
                            class="fill-[#EB5757] stroke-none size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg> 
                        ${item.rating}
                </p>
            </div>
            <h2 class="px-3 md:text-xl font-semibold">${item.title}</h2>
        </div>
    `
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
let listenerRegistrado = false;

export function abrirModal() {
    const searchModal = document.querySelector("#searchModal")
    const containerGuest = searchModal.querySelector("#containerGuest")
    const modalGuest = searchModal.querySelector("#guest-popover")
        
    // Inicializamos las referencias a los spans y valores
    huesped.adults.span = modalGuest.querySelector("#adultSpan")
    huesped.children.span = modalGuest.querySelector("#childSpan")

    // convertimos texto del span a numeros
    huesped.adults.count = Number(huesped.adults.span.textContent) || 0
    huesped.children.count = Number(huesped.children.span.textContent) || 0

    if(!listenerRegistrado) {
        // Asignar listener de modal
        filtrarHuespedes(modalGuest, huesped)
        listenerRegistrado = true
    }

    searchModal.showModal()

    // Abrir el Popover para añadir huespedes
    containerGuest.addEventListener("click", (e) => {
        if(e.target.closest("#btnGuests")) { 
            modalGuest.classList.toggle("hidden")
        }
    })
}

/* function filtrarHuespedes(modalGuest) {
    modalGuest.addEventListener("click", (e) => {
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
        
    })
} */

/* function actualizarBotones(total) {
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
} */