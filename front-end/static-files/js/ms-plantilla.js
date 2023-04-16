                                                                                                                                                                                                                                                       /** * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};
Plantilla.datosJugadoresNulos=null;

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}



/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}


/*HISTORIA DE USUARIO 2 */

Plantilla.listar = function () {
    this.recupera(this.imprime);
}



/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Plantilla.pieTable = function () {
    return "</tbody></table>";
}

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTable = function () {
    return `<table class="listado-proyectos" id="myTable">
        <thead>
        <th>nombreCompleto</th>
        </thead>`;
}

/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Plantilla.cuerpoTr = function (p) {
    const d = p.data

    return `<tr><td><em>${d.nombre}${d.apellidos}</em></td></tr>`;
}




Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        callBackFn(vectorProyectos.data)
    }
}



/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
Plantilla.imprime = function (vector) {
    vector = vector || this.datosJugadoresNulos
    let msj = "";
    
    if (vector === null || vector.length === 0 || typeof vector !== "object") {
      msj = OBJETO_VACIO;
    } else {
      msj += Plantilla.cabeceraTable();
      vector.forEach(e => msj += Plantilla.cuerpoTr(e))
      msj += Plantilla.pieTable();
    }
    
    Frontend.Article.actualizar( "Listado de proyectos", msj );
  }



/*HISTORIA DE USUARIO 3 */

Plantilla.listar1 = function () {
    this.recupera1(this.imprime);
}


Plantilla.recupera1 = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        vectorProyectos.data.sort((a, b) => {
            const nombreA = a.data.nombre.toLowerCase();
            const nombreB = b.data.nombre.toLowerCase();
            if (nombreA < nombreB) {
                return -1;
            }
            if (nombreA > nombreB) {
                return 1;
            }
            return 0;
        });
        callBackFn(vectorProyectos.data)
    }
}






/*HISTORIA DE USUARIO 4 */

Plantilla.listarTodo = function () {
    this.recupera(this.imprimeTodo);
}


/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
Plantilla.imprimeTodo = function (vector) {
    vector = vector || this.datosJugadoresNulos
    let msj = "";
    
    if (vector === null || vector.length === 0 || typeof vector !== "object") {
      msj = OBJETO_VACIO;
    } else {
      msj += Plantilla.cabeceraTableTodo();
      vector.forEach(e => msj += Plantilla.cuerpoTrTodo(e))
      msj += Plantilla.pieTable();
    }
    
    Frontend.Article.actualizar( "Listado de proyectos", msj );
  }


/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTableTodo = function () {
    return `<table class="listado-proyectos" id="myTable">
        <thead>
        <th>nombre</th>
        <th>apellidos</th>
        <th>fecha_nacimiento</th>
        <th>participaciones_comp_oficiales</th>
        <th>participaciones_comp_internacional</th>
        <th>numero_trofeos</th>
        </thead>`;
}

/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Plantilla.cuerpoTrTodo = function (p) {
    const d = p.data
    const nombre = d.nombre;
    const apellidos = d.apellidos;
    const fecha_nacimiento = d.fecha_de_nacimiento;
    const participaciones_comp_oficiales=d.participaciones_en_competiciones_oficiales;
    const participaciones_comp_internacional=d.Participaciones_en_eventos_a_nivel_internacional;
    const numero_trofeos=d.numero_de_trofeos_conseguidos;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${nombre}</td>
    <td>${apellidos}</td>
    <td>${fecha_nacimiento.dia}/${fecha_nacimiento.mes}/${fecha_nacimiento.año}</td>
    <td>${participaciones_comp_oficiales}</td>
    <td>${participaciones_comp_internacional}</td>
    <td>${numero_trofeos}</td>
    </tr>
    `;
}



/*HISTORIA DE USUARIO 6 */



Plantilla.personaComoFormulario = function (persona) {
    return Plantilla.plantillaFormularioPersona.actualiza( persona );
}

Plantilla.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Plantilla.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(persona)
}


Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idPersona
        const response = await fetch(url);
            if (response) {
                const persona = await response.json()
                callBackFn(persona)
            }
    } catch (error) {
            alert("ErrorRecuperaUnaPersona: No se han podido acceder al API Gateway")
            console.error(error)
        }
}

Plantilla.mostrarP = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}

Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "COMPETICIONES_OFICIALES": "### COMPETICIONES_OFICIALES ###",
    "PARTICIPACIONES_INTERNACIONALES": "### PARTICIPACIONES_INTERNACIONALES ###",
    "TROFEOS_CONSEGUIDOS": "### TROFEOS_CONSEGUIDOS ###",
}

Plantilla.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Plantilla.plantillaTags.COMPETICIONES_OFICIALES, 'g'), persona.data.participaciones_en_competiciones_oficiales)
        .replace(new RegExp(Plantilla.plantillaTags.PARTICIPACIONES_INTERNACIONALES, 'g'), persona.data.Participaciones_en_eventos_a_nivel_internacional)
        .replace(new RegExp(Plantilla.plantillaTags.TROFEOS_CONSEGUIDOS, 'g'), persona.data.numero_de_trofeos_conseguidos)
        

}

Plantilla.plantillaFormularioPersona = {}

Plantilla.form = {
    ID: "form-persona-id",
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
    COMPETICIONES_OFICIALES: "form-persona-competiciones_oficiales",
    PARTICIPACIONES_INTERNACIONALES: "form-persona-participaciones_internacionales",
    TROFEOS_CONSEGUIDOS: "form-persona-trofeosConseguidos",
}

Plantilla.plantillaFormularioPersona.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.formulario, persona)
}

Plantilla.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table class="listado-proyectos">
        <thead>
            <th>Id</th>
            <th>Nombre</th>
            <th>APELLIDOS</th>
            <th></th>
            <th>COMPETICIONES_OFICIALES</th>
            <th></th>
            <th>PARTICIPACIONES_INTERNACIONALES</th>
            <th>TROFEOS_CONSEGUIDOS</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Plantilla.plantillaTags.ID}" 
                        name="id_persona"/></td>
                        
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apellidos" required value="${Plantilla.plantillaTags.APELLIDOS}" 
                        name="apellidos_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-competiciones_oficiales" required value="${Plantilla.plantillaTags.COMPETICIONES_OFICIALES}" 
                        name="competiciones_oficiales"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-participaciones_oficiales" required value="${Plantilla.plantillaTags.PARTICIPACIONES_INTERNACIONALES}" 
                        name="participaciones_oficiales"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-trofeosConseguidos" required value="${Plantilla.plantillaTags.TROFEOS_CONSEGUIDOS}" 
                        name="trofeos_conseguidos"/></td>
            </tr>
        </tbody>
    </table>
</form>
`;



Plantilla.personaMostrada = null

Plantilla.almacenaDatos = function (persona) {
    Plantilla.personaMostrada = persona;
}



/*FUNCIONES PARA HU8 */

Plantilla.listarBuscador= function (search){ 
    this.recuperaBuscador(this.imprime,search);
}
  
  
Plantilla.recuperaBuscador = async function (callBackFn,nombre) { 
    let response = null
  
    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)
  
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }
  
    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        const filtro=vectorPersonas.data.filter(persona => persona.data.nombre === nombre)
        callBackFn(filtro)
    }
}