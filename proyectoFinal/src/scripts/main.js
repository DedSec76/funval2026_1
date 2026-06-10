import { stays } from "./stays.js"
import { filtrarLugares } from "./filtrar.js"
import { renderizarLista, abrirModal } from "./utils.js"

const divSearch = document.querySelector("#divSearch")
divSearch.addEventListener("click", abrirModal);

const section = document.querySelector("#contenedor")
renderizarLista(section, stays);

filtrarLugares()

