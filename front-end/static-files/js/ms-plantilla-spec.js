/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO);
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO);
const TITULO_HOME = "Plantilla Home";
const TITULO_ACERCA_DE = "Plantilla Acerca de";
const MOSTRAR_NOMBRES_JUGADORES = "Listado de proyectos";
const OBJETO_VACIO = "";

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})



/* EXPECTS HISTORIA DE USUARIO 3 */

describe('Plantilla.imprime', function () {
  // Realizo los expect
  it("debería mostrar una tabla con todos los datos de las personas de la plantilla",
      function () {
          const vector = [
              {
                  ref: { "@ref": { id: "ref persona 1" } },
                  data: { 
                      Nombre_completo: { Nombre: "Pedro", Apellidos: "Cortes Heredia" },
                  }
              },
              {
                  ref: { "@ref": { id: "ref persona 2" } },
                  data: { 
                      Nombre_completo: { Nombre: "Jose", Apellidos: "Fernandez Cortes" },
                     
              }
              }
          ];

          const expectedMsj = Plantilla.cabeceraTable() + Plantilla.cuerpoTr(vector[0]) + Plantilla.cuerpoTr(vector[1]) + Plantilla.pieTable();
          spyOn(Frontend.Article, 'actualizar');
          Plantilla.imprime(vector);
          expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de proyectos', expectedMsj);
      });
})



describe("Plantilla.pieTable ", function () {
  it("Debe devolverse el codigo html del pie de tabla",
      function () {
          expect(Plantilla.pieTable()).toBe("</tbody></table>");
      });
});

describe("Plantilla.cabeceraTable", function() {
  it('existe la función cabeceraTable', () => {
    expect(Plantilla.cabeceraTable).toBeDefined();
  });

  it('devuelve una cadena de texto', () => {
    const resultado = Plantilla.cabeceraTable();
    expect(typeof resultado).toBe('string');
  });

  it('devuelve una tabla con la clase "listado-proyectos"', () => {
    const resultado = Plantilla.cabeceraTable();
    expect(resultado).toContain('<table class="listado-proyectos"');
  });

  it('devuelve una tabla con la etiqueta "thead"', () => {
    const resultado = Plantilla.cabeceraTable();
    expect(resultado).toContain('<thead>');
  });

  it('devuelve una tabla con dos columnas', () => {
    const resultado = Plantilla.cabeceraTable();
    expect(resultado).toContain('<th>nombreCompleto</th>');
  });

  it('devuelve una tabla con el ID "myTable"', () => {
    const resultado = Plantilla.cabeceraTable();
    expect(resultado).toContain('id="myTable"');
  });
});




  
describe("Cuerpotr hu2", function(){

  it("comprueba que la función rellena la tabla correctamente con solo los nombres completos de los jugadores", function() {
      const c = {
          data: {
            nombre: 'Pedro',
            apellidos: ' Cortes Heredia'
          }
      };
      const resultado=Plantilla.cuerpoTr(c);
      expect(resultado).toBe('<tr><td><em>Pedro Cortes Heredia</em></td></tr>');

  });
})


/* EXPECTS HISTORIA DE USUARIO 3(Son los mismos que en la HU2) */

/* EXPECTS HISTORIA DE USUARIO 4*/

describe("Funcion imprime.Todo que muestra todos los datos de los jugadores", function(){
    
  it("debería mostrar una tabla con todos los datos de las personas de la plantilla",
  function () {
      const vector = [
        {
          ref: { "@ref": { id: "ref persona 1" } },
          data: { 
            nombre: "Proyecto 1",
            apellidos: "Apellido 1",
            fecha_de_nacimiento: { dia: 1, mes: 1, año: 2000 },
            participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
            Participaciones_en_eventos_a_nivel_internacional: 3,
            numero_de_trofeos_conseguidos: 2,
          }
        },
        {
          ref: { "@ref": { id: "ref persona 2" } },
          data: { 
            nombre: "Proyecto 1",
            apellidos: "Apellido 1",
            fecha_de_nacimiento: { dia: 1, mes: 1, año: 2000 },
            participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
            Participaciones_en_eventos_a_nivel_internacional: 3,
            numero_de_trofeos_conseguidos: 2,
             
          }
        }
    ];
      const expectedMsj = Plantilla.cabeceraTableTodo() + Plantilla.cuerpoTrTodo(vector[0]) + Plantilla.cuerpoTrTodo(vector[1]) + Plantilla.pieTable();
      spyOn(Frontend.Article, 'actualizar');
      Plantilla.imprimeTodo(vector);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de proyectos', expectedMsj);
  })
});


describe("Plantilla.cabeceraTableTodo()", function() {
  it("Debe devolver la informacion de las distintas columnas de un jugador", function() {
    const expected = `<table class="listado-proyectos" id="myTable">
        <thead>
        <th>nombre</th>
        <th>apellidos</th>
        <th>fecha_nacimiento</th>
        <th>participaciones_comp_oficiales</th>
        <th>participaciones_comp_internacional</th>
        <th>numero_trofeos</th>
        </thead>`;
    const result = Plantilla.cabeceraTableTodo();
    expect(result).toEqual(expected);
  });
});

describe("Plantilla.cuerpoTrTodo", () => {
  it("debe devolver un string con los datos de los jugadores en HTML", () => {
    const proyecto = {
      data: {
        nombre: "nombre 1",
        apellidos: "Apellido 1",
        fecha_de_nacimiento: { dia: 1, mes: 1, año: 2000 },
        participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
        Participaciones_en_eventos_a_nivel_internacional: 3,
        numero_de_trofeos_conseguidos: 2,
      },
      ref: { "@ref": { id: "123456" } },
    };
    const expectedOutput = `<tr title="123456">
    <td>nombre 1</td>
    <td>Apellido 1</td>
    <td>1/1/2000</td>
    <td>2005,2006,2007,2009,2010,2012,2013,2014</td>
    <td>3</td>
    <td>2</td>
    </tr>
    `;

    const result = Plantilla.cuerpoTrTodo(proyecto);

    expect(result).toBe(expectedOutput);
  });
});

/* EXPECTS HISTORIA DE USUARIO 6*/



  describe("personaComoFormulario", function() {
    it("comprueba que la función devuelve el formulario de persona correctamente actualizado", function() {
      const persona = {
        ref: {
          '@ref': {
            id: '222222'
          }
        },
        data: {
          nombre: 'Pedro',
          apellidos: 'Cortes Heredia',
          participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
          Participaciones_en_eventos_a_nivel_internacional: 5,
          numero_de_trofeos_conseguidos: 3
        }
      };

      const formulario = '<form><input type="text" name="nombre" value="' + persona.data.nombre + '">' +
                          '<input type="text" name="apellidos" value="' + persona.data.apellidos + '">' +
                          '<input type="number" name="participaciones_en_competiciones_oficiales" value="' + persona.data.participaciones_en_competiciones_oficiales + '">' +
                          '<input type="number" name="Participaciones_en_eventos_a_nivel_internacional" value="' + persona.data.Participaciones_en_eventos_a_nivel_internacional + '">' +
                          '<input type="number" name="numero_de_trofeos_conseguidos" value="' + persona.data.numero_de_trofeos_conseguidos + '">' +
                          '<input type="hidden" name="id" value="' + persona.ref['@ref'].id + '">' +
                          '<input type="submit" value="Enviar"></form>';

      spyOn(Plantilla, 'sustituyeTags').and.returnValue(formulario);

      const resultado = Plantilla.personaComoFormulario(persona);

      expect(Plantilla.sustituyeTags).toHaveBeenCalledWith(Plantilla.plantillaFormularioPersona.formulario, persona);
      expect(resultado).toBe(formulario);
    });
  });


  describe("Plantilla.imprimeUnaPersona", function () {

    let persona = {
      ref: {
        '@ref': {
          id: 'persona123'
        }
      },
      data: {
        nombre: 'Pedro',
        apellidos: 'Cortes Heredia',
        participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
        Participaciones_en_eventos_a_nivel_internacional: 2,
        numero_de_trofeos_conseguidos: 3
      }
    };
  
    beforeEach(function () {
      spyOn(Plantilla, 'personaComoFormulario').and.returnValue('<form></form>');
      spyOn(Frontend.Article, 'actualizar');
      spyOn(Plantilla, 'almacenaDatos');
    });
  
    it("llama a Plantilla.personaComoFormulario con la persona correspondiente", function () {
      Plantilla.imprimeUnaPersona(persona);
      expect(Plantilla.personaComoFormulario).toHaveBeenCalledWith(persona);
    });
  
    it("actualiza el artículo con el formulario generado por Plantilla.personaComoFormulario", function () {
      Plantilla.imprimeUnaPersona(persona);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Mostrar una persona", '<form></form>');
    });
  
    it("almacena los datos de la persona", function () {
      Plantilla.imprimeUnaPersona(persona);
      expect(Plantilla.almacenaDatos).toHaveBeenCalledWith(persona);
    });
  
  });
  

  describe("Prueba de Plantilla.mostrarP()", function() {
    let recuperaUnaPersonaSpy, imprimeUnaPersonaSpy;
  
    beforeEach(function() {

      recuperaUnaPersonaSpy = spyOn(Plantilla, "recuperaUnaPersona");
      imprimeUnaPersonaSpy = spyOn(Plantilla, "imprimeUnaPersona");
    });
  
    it("debe llamar a Plantilla.recuperaUnaPersona() con el ID de la persona", function() {
      // Configurar la prueba
      const idPersona = "666666";
  
      // Ejecutar el código a probar
      Plantilla.mostrarP(idPersona);
  
      // Comprobar el resultado
      expect(recuperaUnaPersonaSpy).toHaveBeenCalledWith(idPersona, jasmine.any(Function));
    });
  
    it("debe llamar a Plantilla.imprimeUnaPersona() con la persona recuperada", function() {
      // Configurar la prueba
      const persona = {
        ref: { "@ref": { id: "666666" } },
        data: {
          nombre: "Pedro",
          apellidos: "Cortes Heredia",
          participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
          Participaciones_en_eventos_a_nivel_internacional: 5,
          numero_de_trofeos_conseguidos: 3
        }
      };
      recuperaUnaPersonaSpy.and.callFake(function(id, callBackFn) {
        callBackFn(persona);
      });
  
      Plantilla.mostrarP("666666");
  
      expect(imprimeUnaPersonaSpy).toHaveBeenCalledWith(persona);
    });
  });


  describe('Plantilla.almacenaDatos', () => {
    it('debe almacenar correctamente la persona mostrada', () => {
      const persona = {
        ref: { '@ref': { id: '666666' } },
        data: {
          nombre: 'Pedro',
          apellidos: 'Cortes Heredia',
          participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
          Participaciones_en_eventos_a_nivel_internacional: 2,
          numero_de_trofeos_conseguidos: 3
        }
      };
  
      Plantilla.almacenaDatos(persona);
  
      expect(Plantilla.personaMostrada).toEqual(persona);
    });
  });
  
  
  
  

/* EXPECTS HISTORIA DE USUARIO 8*/






/* EXPECTS HISTORIA DE USUARIO 10*/







/* EXPECTS HISTORIA DE USUARIO 12*/






/* EXPECTS HISTORIA DE USUARIO 13*/











/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
