import { renderizarLista } from "./utils";
import { stays } from "./stays.js"

const mainContainer = document.querySelector("#contenedor")

/**
 * Objeto de filtros para persistencia de datos cuando filtramos
 * -> la clave parcialCity guarda el valor de lo que escribio el usuario en el input
 * -> la clave city guarda el valor cuando el usuario da click sobre un item de la lista de sugerencias
 * -> la clave guests guarda la cantidad total que el usuario agrego en el filtro de añadir huespedes
 */
const filtros = {
    parcialCity: "",
    city: "",
    guests: 0
}

/**
 * Objeto de huespedes guardamos los valores para persistencia
 * -> la clave count contiene la cantidad de adultos y niños
 * -> la clave span guarda el elemento asociado que se muestra cuando agrega o quita huespedes
 */
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

/**
 * Funcion para obtener lugares según lo que escriba el usuario,
 * el valor de lo que se escribe es usado en el filtro para que
 * en tiempo real se muestre una lista de sugerencias
 */
export function filtrarLugares() {
    const location = document.querySelector("#inputLocation")
    const listStays = document.querySelector("#staysList")
    
    let html;

    location.addEventListener("input", (e) => {
        // Mostramos la lista de sujerencias a lo que escribe 
        // el usuario
        listStays.classList.remove("hidden")

        // Limpiamos el filtro de sugerencias cada vez que el usuario
        // escribe algo, asi mantenemos las sugerencias sin redudancia
        html = ""

        // Creamos una variable para el valor en tiempo real
        // que escribe el usuario
        let value = location.value.toLowerCase().trim()
        
        // si el valor del input donde escribio el usuario esta vacio
        // asignamos dicho valor al filtro de ciudad tambien
        if(value.length === 0) {
            filtros.city = ""
        }

        // obtenemos el div de la pestaña principal que sirve
        // como pantalla
        document.querySelector("#addLocation").textContent = value || "Add location"

        // se guarda el valor del filtro en un objeto
        // para que no se pise con el otro filtro
        filtros.parcialCity = value

        // Limpiar contenedor principal para que
        // mientras el usuario escribe
        // se filtran nuevos hospedajes en tiempo real
        mainContainer.innerHTML = ""

        // llamamos a una función que aplica filtros según sea
        // el caso
        aplicarFiltros()

        // Aplicar lista de sugerencias
        let filtrados = stays.filter(s => s.city.toLowerCase().includes(value))
        filtrados = filtrados.filter((valor, index, array) => array.findIndex(v => v.city === valor.city) === index )

        // otra forma de no duplicar valores filtrados
        //const noduplicar = [...new Map(stays.map(item => [item.city, item])).values()]
        
        // Mostrar lista de sugerencias mientras usuario escribe
        if(filtrados.length === 0) {
            html = "<li class='w-full py-2 pl-4 text-red-700'>No Stays found</li>"
        } else {
            filtrados.forEach(f => {
                html += `<li data-city="${f.city}" class="text-gray-500 py-2 hover:bg-gray-200 hover:cursor-pointer">📍${f.city}, ${f.country}</li>`
            })
        }
        listStays.innerHTML = html
    })

    añadirValue()

    /**
     * Funcion que se dispara cuando el usuario da click en una
     * sugerencia mostrada al usuario y lo manda al input
     */
    function añadirValue() {
        listStays.addEventListener("click", (e) => {
            // Limpiamos el contenedor principal padre para que
            // al filtrar no se acumulen los valores
            mainContainer.innerHTML = ""

            // Obtenemos de la lista
            // la sugerencia que fue clickeada
            const city = e.target.closest("li")
            if(!city) return

            // guardamos el valor de la ciudad en minuscula
            const item = city.dataset.city.toLowerCase()
            
            // mandamos la ciudad obtenida al input
            location.value = item

            // Actualizamos los filtros de ciudad que es 
            // la sugerencia a la que dio click
            // y parcialCity que es el campo cuando escribe en input
            // de esta manera sincronizamos ambos valores
            filtros.city = item
            filtros.parcialCity = item

            // Sincronizamos el valor del input del modal
            // con el div plantilla de la pestaña de principal
            document.querySelector("#addLocation").textContent = location.value

            // Ocultamos las sugerencias ya que el usuario ya escogio una
            listStays.classList.add("hidden")

            // Sincronizamos los filtros
            aplicarFiltros()
        })

        /* Oculta la lista de sugerencias 
           en caso el usuario de click en cualquier parte
           que no sea la lista */
        document.addEventListener("click", (e) => {
            if(!e.target.closest("#inputLocation") && !e.target.closest("#staysList")) {
                listStays.classList.add("hidden")
            }
        })
    }
}

/**  Funcion para obtener la cantidad de huespedes
  *  que agrego el usuario, consume el objeto huesped
  *  para persistencia
*/
export function filtrarHuespedes() {
    const containerGuest = document.querySelector("#containerGuest")
    const modalGuest = containerGuest.querySelector("#guest-popover")

    // Abrir o Cerra Popover que agrega huespedes
    containerGuest.addEventListener("click", (e) => {
        if(e.target.closest("#btnGuests")) { 
            modalGuest.classList.toggle("hidden")
        }
    })
    // Cerrar el popover cuando le damos click en cualquier parte
    // que no sea el popover
    document.addEventListener("click", (e) => {
        if(!e.target.closest("#containerGuest")) { 
            modalGuest.classList.add("hidden")
        }
    })

    // Inicializamos las referencias a los spans y valores
    // y los guardamos en el objeto para persistencia de datos
    huesped.adults.span = modalGuest.querySelector("#adultSpan")
    huesped.children.span = modalGuest.querySelector("#childSpan")
    
    // convertimos texto del span a numeros si en caso no existen
    // el valor que devuelve es 0
    huesped.adults.count = Number(huesped.adults.span.textContent) || 0
    huesped.children.count = Number(huesped.children.span.textContent) || 0

    /**
     * Evento que escucha un click en los botones entonces agrega o quita
     * En el caso de que el click no suceda en los botones (+) (-)
     * termina y no ejecuta las demas lineas
     */
    modalGuest.addEventListener("click", (e) => {
        const button = e.target.closest("button");
        if(!button) return

        // Limpiamos el contenedor HTML donde se renderizará
        // lo filtrado
        mainContainer.innerHTML = ""

        // Guardamos cada boton -> adult o children
        // y cada acción -> increment o decrement
        let dataType = button.dataset.type
        let dataAction = button.dataset.action

        if(!dataType || !dataAction) return
        
        // Guardamos en una variable el huesped donde
        // sucedio el click (adult o children)
        const guest = huesped[dataType];
        if(!guest) return

        // Actualizar estado
        // Si es increment aumenta de 1 en 1
        // en otro caso quita de 1 en 1
        if (dataAction === "increment") {
            guest.count++
        } else if (guest.count > 0) {
            guest.count--
        }

        // Calcula y muestra el total de huespedes
        let total = huesped.adults.count + huesped.children.count;
        const totalSpan = document.querySelector("#totalGuests")
        if(!totalSpan) return
        
        // Pinta en el span la cantidad de huespedes totales que
        // se añaden
        totalSpan.textContent = `${total} ${total <= 1 ? "Guest" : "Guests"}`
        
        // Sincroniza el valor actual con el del div principal
        document.querySelector("#addGuests").textContent = totalSpan.textContent
        
        // Activa y desactiva boton al llegar al maximo
        actualizarBotones(huesped);

        // Pinta el contador independiente de si es adult
        // O children con el contador en tiempo real
        guest.span.textContent = guest.count

        // Llena el valor del objeto filtro con el total
        // de la suma de huespedes (adult y children) 
        filtros.guests = total

        // llama a funcion aplicarFiltros
        aplicarFiltros()
    })
}
/** Funcion que aplica los filtros
 * Filtros:
 * 1º Lo que el usuario escribio, guarda el valor que obtuvo
 * 2º Filtro sobre la sugerencia de hospedaje que el usuario dio click 
 * 3º Filtro de la cantidad total de huespedes que el usuario agrego
 */
export function aplicarFiltros() {
    let resultados = stays

    if(filtros.parcialCity.trim() !== "") {
        resultados = resultados.filter(s => s.city.toLowerCase().includes(filtros.parcialCity))
    }

    if(filtros.city.trim() !== "") { 
        resultados = resultados.filter(s => s.city.toLowerCase() === filtros.city)
    }

    if(filtros.guests !== 0) { 
        resultados = resultados.filter(s => s.maxGuests >= filtros.guests)
    }

    if(resultados.length === 0) { 
        mainContainer.innerHTML = `<h3 class="mt-6 font-bold text-2xl text-center">Not Found Stays</h3>`    
    }

    renderizarLista(mainContainer, resultados)

    // Renderiza en la ventana principal el total de Hospedajes
    const spanStays = document.querySelector("#totalStays")
    if(!spanStays) return

    const cantidad = resultados.length
    spanStays.textContent = `${cantidad} ${cantidad > 1 ? "stays" : "stay"}` 
}


/**
 * Funcion que desactiva los botones de aumento y decremento
 * Si ya supero el maximo de huespedes o no tiene ninguno
 * Recibe como parametro el objeto huesped que tiene información como
 * el (count) contador de huesped independiente
 */
function actualizarBotones(huesped) {
    let total = huesped.adults.count + huesped.children.count
    let max = 10;
    const btns = document.querySelectorAll(`[data-action='increment']`)
    
    // Itera los botones de incremento y si ya llegaron al maximo
    // los desactiva
    btns.forEach(b => {
        if(total >= max) {
            b.disabled = true
        } else {
            b.disabled = false
        }
    });

    // Desactiva cada boton de adult o children si ya llegaron a 0
    if(huesped.adults.count <= 0) {
        document.querySelector("[data-type='adults']").disabled = true
    } else {
        document.querySelector("[data-type='adults']").disabled = false
    }

    if(huesped.children.count <= 0) {
        document.querySelector("[data-type='children']").disabled = true
    } else {
        document.querySelector("[data-type='children']").disabled = false
    }
}

