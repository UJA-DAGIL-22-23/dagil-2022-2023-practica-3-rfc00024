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
  


  describe("Plantilla Tags", function () {

    it("debería tener un tag para el ID", function () {
      expect(Plantilla.plantillaTags.ID).toBeDefined();
      expect(typeof Plantilla.plantillaTags.ID).toBe("string");
    });
  
    it("debería tener un tag para el nombre", function () {
      expect(Plantilla.plantillaTags.NOMBRE).toBeDefined();
      expect(typeof Plantilla.plantillaTags.NOMBRE).toBe("string");
    });
  
    it("debería tener un tag para los apellidos", function () {
      expect(Plantilla.plantillaTags.APELLIDOS).toBeDefined();
      expect(typeof Plantilla.plantillaTags.APELLIDOS).toBe("string");
    });
  
    it("debería tener un tag para las competiciones oficiales", function () {
      expect(Plantilla.plantillaTags.COMPETICIONES_OFICIALES).toBeDefined();
      expect(typeof Plantilla.plantillaTags.COMPETICIONES_OFICIALES).toBe("string");
    });
  
    it("debería tener un tag para las participaciones internacionales", function () {
      expect(Plantilla.plantillaTags.PARTICIPACIONES_INTERNACIONALES).toBeDefined();
      expect(typeof Plantilla.plantillaTags.PARTICIPACIONES_INTERNACIONALES).toBe("string");
    });
  
    it("debería tener un tag para los trofeos conseguidos", function () {
      expect(Plantilla.plantillaTags.TROFEOS_CONSEGUIDOS).toBeDefined();
      expect(typeof Plantilla.plantillaTags.TROFEOS_CONSEGUIDOS).toBe("string");
    });
  
  });
  


  describe('Plantilla.sustituyeTags', () => {
    it('sustituye los tags por los valores de la persona', () => {
      const plantilla = `
        <p>ID: ### ID ###</p>
        <p>NOMBRE: ### NOMBRE ###</p>
        <p>APELLIDOS: ### APELLIDOS ###</p>
        <p>COMPETICIONES_OFICIALES: ### COMPETICIONES_OFICIALES ###</p>
        <p>PARTICIPACIONES_INTERNACIONALES: ### PARTICIPACIONES_INTERNACIONALES ###</p>
        <p>TROFEOS_CONSEGUIDOS: ### TROFEOS_CONSEGUIDOS ###</p>
      `;
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
      const expected = `
        <p>ID: 666666</p>
        <p>NOMBRE: Pedro</p>
        <p>APELLIDOS: Cortes Heredia</p>
        <p>COMPETICIONES_OFICIALES: 2005,2006,2007,2009,2010,2012,2013,2014</p>
        <p>PARTICIPACIONES_INTERNACIONALES: 2</p>
        <p>TROFEOS_CONSEGUIDOS: 3</p>
      `;
  
      const result = Plantilla.sustituyeTags(plantilla, persona);
  
      expect(result).toBe(expected);
    });
  });


  describe("Plantilla.form", function() {
    it("debe tener una propiedad ID", function() {
      expect(Plantilla.form.hasOwnProperty('ID')).toBe(true);
    });
  
    it("debe tener una propiedad NOMBRE", function() {
      expect(Plantilla.form.hasOwnProperty('NOMBRE')).toBe(true);
    });
  
    it("debe tener una propiedad APELLIDOS", function() {
      expect(Plantilla.form.hasOwnProperty('APELLIDOS')).toBe(true);
    });
  
    it("debe tener una propiedad COMPETICIONES_OFICIALES", function() {
      expect(Plantilla.form.hasOwnProperty('COMPETICIONES_OFICIALES')).toBe(true);
    });
  
    it("debe tener una propiedad PARTICIPACIONES_INTERNACIONALES", function() {
      expect(Plantilla.form.hasOwnProperty('PARTICIPACIONES_INTERNACIONALES')).toBe(true);
    });
  
    it("debe tener una propiedad TROFEOS_CONSEGUIDOS", function() {
      expect(Plantilla.form.hasOwnProperty('TROFEOS_CONSEGUIDOS')).toBe(true);
    });
  });
  
  
describe("Plantilla.plantillaFormularioPersona.formulario", function() {
  it("debe contener las etiquetas de plantilla correspondientes", function() {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain("form-persona-id");
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain("form-persona-nombre");
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain("form-persona-apellidos");
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain("form-persona-competiciones_oficiales");
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain("form-persona-participaciones_oficiales");
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain("form-persona-trofeosConseguidos");
  });
});


describe('Plantilla.plantillaFormularioPersona.actualiza', () => {
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

  it('debe sustituir el ID de la persona', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(persona)
    expect(result.includes(persona.ref['@ref'].id)).toBe(true)
  })

  it('debe sustituir el nombre de la persona', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(persona)
    expect(result.includes(persona.data.nombre)).toBe(true)
  })

  it('debe sustituir los apellidos de la persona', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(persona)
    expect(result.includes(persona.data.apellidos)).toBe(true)
  })

  it('debe sustituir el participaciones_en_competiciones_oficiales de la persona', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(persona)
    expect(result.includes(persona.data.participaciones_en_competiciones_oficiales)).toBe(true)
  })

  it('debe sustituir el Participaciones_en_eventos_a_nivel_internacional de la persona', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(persona)
    expect(result.includes(persona.data.Participaciones_en_eventos_a_nivel_internacional)).toBe(true)
  })

  it('debe sustituir el numero_de_trofeos_conseguidos de la persona', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(persona)
    expect(result.includes(persona.data.numero_de_trofeos_conseguidos)).toBe(true)
  })
})

describe("almacenaDatos", function() {
  it("debe almacenar la persona proporcionada", function() {
    var persona = {
      ID: "666666",
      NOMBRE: "Pedro",
      APELLIDOS: "Cortes Heredia",
      COMPETICIONES_OFICIALES: [2005,2006,2007,2009,2010,2012,2013,2014],
      PARTICIPACIONES_INTERNACIONALES: "1",
      TROFEOS_CONSEGUIDOS: "2"
    };
    Plantilla.almacenaDatos(persona);
    expect(Plantilla.personaMostrada).toEqual(persona);
  });
});




  
  

/* EXPECTS HISTORIA DE USUARIO 8*/


describe("Plantilla.listarBuscador", () => {
  it("should call Plantilla.recuperaBuscador with search parameter", () => {
    spyOn(Plantilla, "recuperaBuscador");
    const search = "Pedro Cortes";
    Plantilla.listarBuscador(search);
    expect(Plantilla.recuperaBuscador).toHaveBeenCalledWith(Plantilla.imprime, search);
  });
});




/* EXPECTS HISTORIA DE USUARIO 10*/







/* EXPECTS HISTORIA DE USUARIO 12 y 13*/

describe('Plantilla.ModificarDatos', () => {
  it('Debe llamar a la función recupera con la función imprimeMuchasPersonas como argumento', () => {
    spyOn(Plantilla, 'recupera');
    spyOn(Plantilla, 'imprimeMuchasPersonas');
    Plantilla.ModificarDatos();
    expect(Plantilla.recupera).toHaveBeenCalledWith(Plantilla.imprimeMuchasPersonas);
  });
});


describe("Plantilla.plantillaTablaPersonas.cabecera", function() {
  it("Debería generar la cabecera de una tabla HTML con las columnas y encabezados correspondientes", function() {
    const columnasEsperadas = [
      "Id",
      "nombre",
      "apellidos",
      "fecha_nacimiento",
      "participaciones_comp_oficiales",
      "participaciones_comp_internacional",
      "numero_trofeos"
    ];

    const resultado = Plantilla.plantillaTablaPersonas.cabecera;

    const cabeceraEsperada = `
      <table width="100%" class="listado-proyectos">
        <thead>
          <tr>
            ${columnasEsperadas.map(c => `<th>${c}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
    `;
  });

  it("Debería incluir una etiqueta de cierre para la tabla HTML", function() {


    const resultado = Plantilla.plantillaTablaPersonas.cabecera;

    expect(resultado.endsWith("<tbody>")).toBe(true);
  });

  it("Debería tener una clase 'listado-proyectos'", function() {
    

    const resultado = Plantilla.plantillaTablaPersonas.cabecera;
    expect(resultado.includes('class="listado-proyectos"')).toBe(true);
  });

  it("Debería tener una etiqueta <thead> y <tbody> en la estructura de la tabla HTML", function() {
    
  
    const resultado = Plantilla.plantillaTablaPersonas.cabecera;

  
    expect(resultado.includes("<thead>")).toBe(true);
    expect(resultado.includes("</thead>")).toBe(true);
    expect(resultado.includes("<tbody>")).toBe(true);
  });
});


describe("Plantilla.plantillaTablaPersonas.pie", () => {
    it("debe contener la etiqueta </tbody>", () => {
      expect(Plantilla.plantillaTablaPersonas.pie).toContain("</tbody>");
    });

    it("debe contener la etiqueta </table>", () => {
      expect(Plantilla.plantillaTablaPersonas.pie).toContain("</table>");
    });

    it("debe tener una longitud mayor que cero", () => {
      expect(Plantilla.plantillaTablaPersonas.pie.length).toBeGreaterThan(0);
    });
});




describe('Plantilla.plantillaTablaPersonas.actualiza2', () => {
  const Persona = {
    ref: { '@ref': { id: '1234' } },
    data: {
      nombre: "Persona 1",
      apellidos: "Apellidos",
      participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
      Participaciones_en_eventos_a_nivel_internacional: 3,
      numero_de_trofeos_conseguidos: 2,
    }
  }

  it('deberia reemplazar el ID', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza2(Persona)
    expect(result.includes(Persona.ref['@ref'].id)).toBe(true)
  })

  it('deberia reemplazar el NOMBRE ', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza2(Persona)
    expect(result.includes(Persona.data.nombre)).toBe(true)
  })

  it('deberia reemplazar el  APELLIDOS', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza2(Persona)
    expect(result.includes(Persona.data.apellidos)).toBe(true)
  })

  it('deberia reemplazar el COMPETICIONES_OFICIALES ', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza2(Persona)
    expect(result.includes(Persona.data.participaciones_en_competiciones_oficiales)).toBe(true)
  })

  it('deberia reemplazar el PARTICIPACIONES_INTERNACIONALES', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza2(Persona)
    expect(result.includes(Persona.data.Participaciones_en_eventos_a_nivel_internacional)).toBe(true)
  })
  it('deberia reemplazar el TROFEOS_CONSEGUIDOS', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza2(Persona)
    expect(result.includes(Persona.data.numero_de_trofeos_conseguidos)).toBe(true)
  })
})



describe('Plantilla.plantillaTablaPersonas.actualiza', () => {
  const Persona = {
    ref: { '@ref': { id: '1234' } },
    data: {
      nombre: "Persona 1",
      apellidos: "Apellidos",
      participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
      Participaciones_en_eventos_a_nivel_internacional: 3,
      numero_de_trofeos_conseguidos: 2,
    }
  }

  it('deberia reemplazar el ID', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(Persona)
    expect(result.includes(Persona.ref['@ref'].id)).toBe(true)
  })

  it('deberia reemplazar el NOMBRE ', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(Persona)
    expect(result.includes(Persona.data.nombre)).toBe(true)
  })

  it('deberia reemplazar el  APELLIDOS', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(Persona)
    expect(result.includes(Persona.data.apellidos)).toBe(true)
  })

  it('deberia reemplazar el COMPETICIONES_OFICIALES ', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(Persona)
    expect(result.includes(Persona.data.participaciones_en_competiciones_oficiales)).toBe(true)
  })

  it('deberia reemplazar el PARTICIPACIONES_INTERNACIONALES', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(Persona)
    expect(result.includes(Persona.data.Participaciones_en_eventos_a_nivel_internacional)).toBe(true)
  })
  it('deberia reemplazar el TROFEOS_CONSEGUIDOS', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(Persona)
    expect(result.includes(Persona.data.numero_de_trofeos_conseguidos)).toBe(true)
  })
})


describe("personaComoFormulario2", function() {
  it("debe comprobar que la función devuelve el formulario de persona bien actualizado", function() {
    const persona = {
      ref: { "@ref": { id: "ref persona 2" } },
      data: { 
        nombre: "Persona 1",
        apellidos: "Apellidos",
        participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
        Participaciones_en_eventos_a_nivel_internacional: 3,
        numero_de_trofeos_conseguidos: 2,
    }
  }

    const formulario = '<form><input type="text" name="nombre" value="' + persona.data.nombre + '">' +
                        '<input type="text" name="pais" value="' + persona.data.apellidos + '">' +
                        '<input type="number" name="edad" value="' + persona.data.participaciones_en_competiciones_oficiales + '">' +
                        '<input type="text" name="modalidad" value="' + persona.data.Participaciones_en_eventos_a_nivel_internacional + '">' +
                        '<input type="number" name="grupo" value="' + persona.data.numero_de_trofeos_conseguidos + '">' +
                        '<input type="submit" value="Enviar"></form>';

    spyOn(Plantilla, 'sustituyeTags').and.returnValue(formulario);

    const resultado = Plantilla.personaComoFormulario(persona);

    expect(Plantilla.sustituyeTags).toHaveBeenCalledWith(Plantilla.plantillaFormularioPersona.formulario, persona);
    expect(resultado).toBe(formulario);
  });
});



describe('Plantilla.imprimePersona', () => {
  const persona = {
    ref: { "@ref": { id: "ref persona 2" } },
    data: { 
      nombre: "Persona 1",
      apellidos: "Apellidos",
      participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
      Participaciones_en_eventos_a_nivel_internacional: 3,
      numero_de_trofeos_conseguidos: 2,
    }
  };

  let actualizarSpy;
  let almacenaDatosSpy;

  beforeEach(() => {
    actualizarSpy = spyOn(Frontend.Article, 'actualizar');
    almacenaDatosSpy = spyOn(Plantilla, 'almacenaDatos');
  });

  it('debe llamar a la función Frontend.Article.actualizar', () => {
    Plantilla.imprimePersona(persona);
    expect(actualizarSpy).toHaveBeenCalled();
  });

  it('debe llamar a la función Plantilla.almacenaDatos', () => {
    Plantilla.imprimePersona(persona);
    expect(almacenaDatosSpy).toHaveBeenCalled();
  });

  it('debe llamar a la función Plantilla.personaComoFormulario', () => {
    spyOn(Plantilla, 'personaComoFormulario');
    Plantilla.imprimePersona(persona);
    expect(Plantilla.personaComoFormulario).toHaveBeenCalledWith(persona);
  });
});




describe('Plantilla.imprimePersona2', () => {
  const persona = {
    ref: { "@ref": { id: "ref persona 2" } },
    data: { 
      nombre: "Persona 1",
      apellidos: "Apellidos",
      participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
      Participaciones_en_eventos_a_nivel_internacional: 3,
      numero_de_trofeos_conseguidos: 2,
    }
  };

  let actualizar;
  let almacenaDatos;
  let personaComoFormulario;

  beforeEach(() => {
    actualizar = spyOn(Frontend.Article, 'actualizar');
    almacenaDatos = spyOn(Plantilla, 'almacenaDatos');
    personaComoFormulario = spyOn(Plantilla, 'personaComoFormulario2').and.returnValue("Formulario de la persona");
  });

  it('debe llamar a la función Frontend.Article.actualizar con el mensaje correcto', () => {
    Plantilla.imprimePersona2(persona);
    expect(actualizar).toHaveBeenCalledWith("Mostrar participante", "Formulario de la persona");
  });

  it('debe llamar a la función Plantilla.almacenaDatos con la persona', () => {
    Plantilla.imprimePersona2(persona);
    expect(almacenaDatos).toHaveBeenCalledWith(persona);
  });

  it('debe llamar a la función Plantilla.personaComoFormulario2 con la persona', () => {
    Plantilla.imprimePersona2(persona);
    expect(personaComoFormulario).toHaveBeenCalledWith(persona);
  });
});



describe('Plantilla.almacenaDatos', () => {
  const persona = {
    ref: { "@ref": { id: "ref persona 2" } },
    data: { 
      nombre: "Persona 1",
      apellidos: "Apellidos",
      participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
      Participaciones_en_eventos_a_nivel_internacional: 3,
      numero_de_trofeos_conseguidos: 2,
    }
  };

  it('debe almacenar correctamente la persona en Plantilla.personaMostrada', () => {
    Plantilla.almacenaDatos(persona);
    expect(Plantilla.personaMostrada).toEqual(persona);
  });
});



describe('Plantilla.recuperaDatosAlmacenados', () => {
  const persona = {
    ref: { "@ref": { id: "ref persona 2" } },
    data: { 
      nombre: "Persona 1",
      apellidos: "Apellidos",
      participaciones_en_competiciones_oficiales: [2005,2006,2007,2009,2010,2012,2013,2014],
      Participaciones_en_eventos_a_nivel_internacional: 3,
      numero_de_trofeos_conseguidos: 2,
    }
  };

  beforeEach(() => {
    Plantilla.personaMostrada = persona;
  });

  it('debe devolver la persona almacenada en Plantilla.personaMostrada', () => {
    const personaRecuperada = Plantilla.recuperaDatosAlmacenados();
    expect(personaRecuperada).toEqual(persona);
  });
});


describe('Plantilla.deshabilitarCamposEditables', () => {
  let spyHabilitarDeshabilitarCamposEditables;
  beforeEach(() => {
    spyHabilitarDeshabilitarCamposEditables = spyOn(Plantilla, 'habilitarDeshabilitarCamposEditables');
  });
  it('debe llamar a la función Plantilla.habilitarDeshabilitarCamposEditables con true', () => {
    Plantilla.deshabilitarCamposEditables();
    expect(spyHabilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(true);
  });

  it('debe retornar la instancia de la plantilla', () => {
    const resultado = Plantilla.deshabilitarCamposEditables();
    expect(resultado).toBe(Plantilla);
  });
});



describe('Plantilla.habilitarCamposEditables', () => {
  let spyHabilitarDeshabilitarCamposEditables;
  beforeEach(() => {
    spyHabilitarDeshabilitarCamposEditables = spyOn(Plantilla, 'habilitarDeshabilitarCamposEditables');
  });

  it('debe llamar a la función Plantilla.habilitarDeshabilitarCamposEditables con false', () => {
    Plantilla.habilitarCamposEditables();
    expect(spyHabilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
  });

  it('debe retornar la instancia de la plantilla', () => {
    const resultado = Plantilla.habilitarCamposEditables();
    expect(resultado).toBe(Plantilla);
  });
});



describe('Plantilla.ocultarOpcionesSecundarias', () => {
  let opcionesMostrarOcultarSpy;

  beforeEach(() => {
    opcionesMostrarOcultarSpy = spyOn(Plantilla, 'opcionesMostrarOcultar');
  });

  it('debe llamar a la función Plantilla.opcionesMostrarOcultar con el parámetro "opcion-secundaria" y false', () => {
    Plantilla.ocultarOpcionesSecundarias();
    expect(opcionesMostrarOcultarSpy).toHaveBeenCalledWith("opcion-secundaria", false);
  });
});



describe('Plantilla.mostrarOpcionesSecundarias', () => {
  let opcionesMostrarOcultarSpy;

  beforeEach(() => {
    opcionesMostrarOcultarSpy = spyOn(Plantilla, 'opcionesMostrarOcultar');
  });

  it('debe llamar a la función Plantilla.opcionesMostrarOcultar con el parámetro "opcion-secundaria" y true', () => {
    Plantilla.mostrarOpcionesSecundarias();
    expect(opcionesMostrarOcultarSpy).toHaveBeenCalledWith("opcion-secundaria", true);
  });
});


describe('Plantilla.mostrarOcionesTerciariasEditar', () => {
  let opcionesMostrarOcultarSpy;

  beforeEach(() => {
    opcionesMostrarOcultarSpy = spyOn(Plantilla, 'opcionesMostrarOcultar');
  });

  it('debe llamar a la función Plantilla.opcionesMostrarOcultar con classname="opcion-terciaria editar" y mostrando=true', () => {
    Plantilla.mostrarOcionesTerciariasEditar();
    expect(opcionesMostrarOcultarSpy).toHaveBeenCalledWith("opcion-terciaria editar", true);
  });
});



describe('Plantilla.ocultarOcionesTerciariasEditar', () => {
  let opcionesMostrarOcultarSpy;

  beforeEach(() => {
    opcionesMostrarOcultarSpy = spyOn(Plantilla, 'opcionesMostrarOcultar');
  });

  it('debe llamar a la función Plantilla.opcionesMostrarOcultar con los parámetros correctos', () => {
    Plantilla.ocultarOcionesTerciariasEditar();
    expect(opcionesMostrarOcultarSpy).toHaveBeenCalledWith('opcion-terciaria editar', false);
  });
});


describe("Plantilla.editar", function() {
  beforeEach(function() {
    spyOn(Plantilla, "ocultarOpcionesSecundarias");
    spyOn(Plantilla, "mostrarOcionesTerciariasEditar");
    spyOn(Plantilla, "habilitarCamposEditables");
  });

  it("debe llamar a Plantilla.ocultarOpcionesSecundarias", function() {
    Plantilla.editar();
    expect(Plantilla.ocultarOpcionesSecundarias).toHaveBeenCalled();
  });

  it("debe llamar a Plantilla.mostrarOcionesTerciariasEditar", function() {
    Plantilla.editar();
    expect(Plantilla.mostrarOcionesTerciariasEditar).toHaveBeenCalled();
  });

  it("debe llamar a Plantilla.habilitarCamposEditables", function() {
    Plantilla.editar();
    expect(Plantilla.habilitarCamposEditables).toHaveBeenCalled();
  });
});




describe("Plantilla.cancelar", function() {
  beforeEach(function() {
    spyOn(Plantilla, "imprimePersona2");
    spyOn(Plantilla, "deshabilitarCamposEditables");
    spyOn(Plantilla, "ocultarOcionesTerciariasEditar");
    spyOn(Plantilla, "mostrarOpcionesSecundarias");
    spyOn(Plantilla, "recuperaDatosAlmacenados").and.returnValue("datos de persona");
  });

  it("Tiene que llamar a imprimePersona2 con el resultado de recuperaDatosAlmacenados", function() {
    Plantilla.cancelar();
    expect(Plantilla.imprimePersona2).toHaveBeenCalledWith("datos de persona");
  });

  it("Tiene que llamar a deshabilitarCamposEditables", function() {
    Plantilla.cancelar();
    expect(Plantilla.deshabilitarCamposEditables).toHaveBeenCalled();
  });

  it("Tiene que llamar a ocultarOcionesTerciariasEditar", function() {
    Plantilla.cancelar();
    expect(Plantilla.ocultarOcionesTerciariasEditar).toHaveBeenCalled();
  });

  it("Tiene que llamar a mostrarOpcionesSecundarias", function() {
    Plantilla.cancelar();
    expect(Plantilla.mostrarOpcionesSecundarias).toHaveBeenCalled();
  });
});






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
