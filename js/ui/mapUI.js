//MAPA INTEGRACION DE LEAFLET

//INSTANCIA ACTUAL DEL MAPA
let mapaActual = null

//DESTRUIR MAPA ACTUAL 
export function destruirMapa() {
    if(mapaActual){
        mapaActual.remove()
        mapaActual = null
    }
}

export function crearMapa(latitud, longitud, nombre){
    if(typeof latitud !== "number" || typeof longitud !== "number") {
        console.warn("Coordenadas no disponibles")
        return 
    }
    destruirMapa()
    //INICIALIZAR LEAFLET 
    mapaActual = L.map("destination-map").setView([latitud, longitud],4)
    //AGREGAR CAPA DE OPENSTREETMAP
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:"&copy; OpenStreetMap contributors"
    }).addTo(mapaActual)
    //AGREGAR MARCADOR
    //para crear marcadores y asociar contenido emergente
    L.marker([latitud, longitud]).addTo(mapaActual).bindPopup(`<strong>${nombre}</strong>`).openPopup()

}

