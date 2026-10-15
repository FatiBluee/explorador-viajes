/* =========================================
   EXPLORADOR DE VIAJES
   Archivo principal de la aplicación
========================================= */
/* =========================================
   IMPORTACIONES
========================================= */
import { obtenerPaises } from "./api/countriesApi.js"; //MANEJO DE LA API
import { mostrarCargando, mostrarError, renderPaises, actualizarContador } from "./ui/ui.js"; //MANEJO DEL DOM
import { procesarPaises } from "./utils/filters.js"; //MANEJO DE DATOS
/* =========================================
   ESTADO DE LA APLICACIÓN
========================================= */
let paises = []
/* =========================================
   REFERENCIAS DEL DOM
========================================= */
const destinationsContainer = document.querySelector( "#destinations-container" );
const resultsCount = document.querySelector( "#results-count" );
//Referencias de los filtros
const searchInput = document.querySelector("#search-input")
const continentFilter = document.querySelector("#continent-filter")
const sortFilter = document.querySelector("#sort-filter")

//APLICAR FILTROS, RENDERIZAR Y ACTUALIZAR CONTADOR
function aplicarFiltros() {
    const texto = searchInput.value
    const continente = continentFilter.value
    const criterioOrden = sortFilter.value

    const resultados = procesarPaises(paises, texto, continente, criterioOrden)
    renderPaises(resultados, destinationsContainer)
    actualizarContador(resultados.length, resultsCount)
}

//REGISTRAR EVENTOS 
function registrarEventos() {
    searchInput.addEventListener("input", aplicarFiltros)
    continentFilter.addEventListener("change", aplicarFiltros)
    sortFilter.addEventListener("change", aplicarFiltros)
}
/* =========================================
   INICIALIZACIÓN DE LA APLICACIÓN
========================================= */
async function init() {
    console.log("Explorador de Viajes iniciado");
    //resultsCount.textContent = "0 destinos";
    //MOSTRAR ESTADO DE CARGA
    mostrarCargando(destinationsContainer);
    //OBTENER PAISES DESDE LA API
    paises = await obtenerPaises();
    //comprobar resultados
    console.log("PAISES OBTENIDOS", paises)
    //VALIDAR PAISES OBTENIDOS
    if (paises.length === 0) {
        mostrarError( destinationsContainer);
        actualizarContador( 0, resultsCount );
        return;
    }
    //MOSTRAR RESULTADOS INICIALES
    aplicarFiltros()
    //REGISTRAR EVENTOS DE FILTROS
    registrarEventos()

}
/* =========================================
   INICIAR APLICACIÓN
========================================= */
init();