/* =========================================
   EXPLORADOR DE VIAJES
   Archivo principal de la aplicación
========================================= */

/* =========================================
   IMPORTACIONES
========================================= */

import { obtenerPaises } from "./api/countriesApi.js";
import { mostrarCargando, mostrarError, renderPaises, actualizarContador } from "./ui/ui.js";

/* =========================================
   ESTADO DE LA APLICACIÓN
========================================= */

let paises = []

/* =========================================
   REFERENCIAS DEL DOM
========================================= */

const destinationsContainer = document.querySelector(
    "#destinations-container"
);

const resultsCount = document.querySelector(
    "#results-count"
);


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
    //RENDERIZAR PAISES EN EL CONTENEDOR
    renderPaises(paises, destinationsContainer);
    //ACTUALIZAR CONTADOR DE RESULTADOS
    actualizarContador(paises.length, resultsCount);
}


/* =========================================
   INICIAR APLICACIÓN
========================================= */
init();