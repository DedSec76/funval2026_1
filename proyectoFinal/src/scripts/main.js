import { abrirModal } from "./utils.js"
import { aplicarFiltros } from "./filtrar.js"

const divSearch = document.querySelector("#divSearch")
divSearch.addEventListener("click", abrirModal);

aplicarFiltros()

