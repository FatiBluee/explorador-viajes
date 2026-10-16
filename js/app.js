/* =========================================
   EXPLORADOR DE VIAJES
   Archivo principal de la aplicación
========================================= */
/* =========================================
   IMPORTACIONES
========================================= */
import { obtenerPaises } from "./api/countriesApi.js"; //MANEJO DE LA API
import {
  mostrarCargando,
  mostrarError,
  renderPaises,
  actualizarContador,
  mostrarDetalle,
  cerrarDetalle,
} from "./ui/ui.js"; //MANEJO DEL DOM
import { procesarPaises } from "./utils/filters.js"; //MANEJO DE DATOS
import { crearMapa, destruirMapa } from "./ui/mapUI.js";
/* =========================================
   ESTADO DE LA APLICACIÓN
========================================= */
let paises = [];
/* =========================================
   REFERENCIAS DEL DOM
========================================= */
const destinationsContainer = document.querySelector("#destinations-container");
const resultsCount = document.querySelector("#results-count");
//Referencias de los filtros
const searchInput = document.querySelector("#search-input");
const continentFilter = document.querySelector("#continent-filter");
const sortFilter = document.querySelector("#sort-filter");
//referencias para el mapa
const detailModal = document.querySelector("#detail-modal");
const detailModalContent = document.querySelector("#detail-modal-content");

//BUSCAR PAIS POR CODIGO
function obtenerPaisPorCodigo(codigo) {
  //FIND DEVUELVE EL PRIMER ELEMENTO QUE COINCIDA
  return paises.find((pais) => pais.codes?.alpha_3 === codigo);
}
//APLICAR FILTROS, RENDERIZAR Y ACTUALIZAR CONTADOR
function aplicarFiltros() {
  const texto = searchInput.value;
  const continente = continentFilter.value;
  const criterioOrden = sortFilter.value;

  const resultados = procesarPaises(paises, texto, continente, criterioOrden);
  renderPaises(resultados, destinationsContainer);
  actualizarContador(resultados.length, resultsCount);
}
//ABRIR DETALLE DEL DESTINO
function abrirDetalle(codigo) {
  const pais = obtenerPaisPorCodigo(codigo);
  if (!pais) {
    console.warn("Pais no encontrado");
    return;
  }
  const datosMapa = mostrarDetalle(pais, detailModal, detailModalContent);
  //CREAR EL MAPA DESPUES DE RENDERIZAR EL MODAL
  setTimeout(() => {
    crearMapa(datosMapa.latitud, datosMapa.longitud, datosMapa.nombre);
  }, 0);
}

//REGISTRAR EVENTOS
function registrarEventos() {
  searchInput.addEventListener("input", aplicarFiltros);
  continentFilter.addEventListener("change", aplicarFiltros);
  sortFilter.addEventListener("change", aplicarFiltros);

  //ACCIONES DE LAS TARJETAS
  destinationsContainer.addEventListener("click", (event) => {
    const boton = event.target.closest("[data-action]");
    if (!boton) return;

    const accion = boton.dataset.action;
    const codigo = boton.dataset.countryCode;

    if (accion === "detail") {
      abrirDetalle(codigo);
    }
  });

  //CERAR MODAL
  detailModal.addEventListener("click", (event) => {
    if (event.target.id === "btn-close-detail") cerrarModalDetalle();
    if (event.target === detailModal) cerrarModalDetalle();
  });

  //CERRAR CON ESCAPE
  document.addEventListener("keydown", event => {
    if(event.key === "Escape" && !detailModal.classList.contains("hidden")) cerrarDetalle()
  })
}


function cerrarModalDetalle() {
  destruirMapa();
  cerrarDetalle(detailModal, detailModalContent);
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
  console.log("PAISES OBTENIDOS", paises);
  //VALIDAR PAISES OBTENIDOS
  if (paises.length === 0) {
    mostrarError(destinationsContainer);
    actualizarContador(0, resultsCount);
    return;
  }
  //MOSTRAR RESULTADOS INICIALES
  aplicarFiltros();
  //REGISTRAR EVENTOS DE FILTROS
  registrarEventos();
}
/* =========================================
   INICIAR APLICACIÓN
========================================= */
init();
