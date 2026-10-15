//SE ENCARGA DE PROCESAR DATOS

//FILTROS Y ORDENAMIENTO 
//FUNCIONES PARA PROCESAR DESTINOS

//BUSCAR PAISES POR NOMBRE 
export function buscarPaises(paises, texto) {
    const textoNormalizado = texto.trim().toLowerCase()
    //si el input esta vacio
    if(!textoNormalizado) {
        return paises
    }
    return paises.filter(pais => {
        const nombre = pais.names?.common?.toLowerCase() ?? ""
        return nombre.includes(textoNormalizado)
    })
}

//FILTRAR POR CONTINENTE
export function filtrarPorContinente(paises, continente) {
    //retornar todos los paises si el filtro es all
    if(continente === "all") {
        return paises
    }
    //filtrar por region
    return paises.filter(pais => pais.region === continente)
}

//ORDENAR PAISES A-Z
export function ordenarPaises(paises, criterio) {
    const paisesOrdenados = [...paises]
    if (criterio === "az") {
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? ""
            const nombreB = b.names?.common ?? ""
            return nombreA.localeCompare(nombreB)
        })
    }
    
    //CRITERIO ZA
    //OPTIONAL CHAINING PARA EVITAR ERRORES SI NAMES O COMMON SON UNDEFINED
    // regresa undefined si la referencia de la izquierda es null o undefined, en lugar de lanzar un error
    //NULLISH COALESCING PARA ASIGNAR UN VALOR POR DEFECTO SI NOMBRE ES UNDEFINED
    if(criterio === "za"){
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? ""
            const nombreB = b.names?.common ?? ""
            //localeCompare para comparar cadenas de texto y ordenar alfabeticamente
            return nombreB.localeCompare(nombreA)
        })
    }
    return paisesOrdenados
}

//PROCESAR UN PAIS CON TODOS LOS FILTROS APLICADOS
export function procesarPaises(paises, texto, continente, criterio) {
    let resultado = buscarPaises(paises, texto)
    resultado = filtrarPorContinente(resultado, continente)
    resultado = ordenarPaises(resultado, criterio)
    return resultado
}
