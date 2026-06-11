import { filtrarLugares, filtrarHuespedes }  from "./filtrar"

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

let listenerRegistrado = false;
export function abrirModal() {
    const searchModal = document.querySelector("#searchModal")    
    
    if(!listenerRegistrado) {
        // Asignar listener de modal
        filtrarHuespedes()
        filtrarLugares()
        listenerRegistrado = true
    }

    searchModal.showModal()
}