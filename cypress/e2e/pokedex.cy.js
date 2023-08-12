const URL = "http://192.168.1.41:8080";

context("Pokédex", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  describe("Comprueba la visibilidad de los elementos", () => {
    it("Comprueba visibilidad header", () => {
      cy.get(".logo-pokemon").should("be.visible");
      cy.get(".buscador-pokemon").should("be.visible");
      cy.get(".boton-buscar-pokemon").should("be.visible");
    });

    it("Comprueba visibilidad de las cartas pokémon", () => {
      cy.get(".carta").each(($carta) => {
        cy.wrap($carta).should("be.visible");
      });
      cy.get(".carta").should("have.length", 20);

      cy.get(".imagen-carta").each(($imagenPokemon) => {
        cy.wrap($imagenPokemon).should("be.visible");
      });
      cy.get(".imagen-carta").should("have.length", 20);

      cy.get(".numero-identificacion-pokemon").each(($idPokemon) => {
        cy.wrap($idPokemon).should("be.visible");
      });
      cy.get(".numero-identificacion-pokemon").should("have.length", 20);

      cy.get(".nombre-pokemon").each(($nombrePokemon) => {
        cy.wrap($nombrePokemon).should("be.visible");
      });
      cy.get(".nombre-pokemon").should("have.length", 20);

      cy.get(".primer-tipo").each(($primerTipoPokemon) => {
        cy.wrap($primerTipoPokemon).should("be.visible");
      });
      cy.get(".primer-tipo").should("have.length", 20);

      cy.get(".segundo-tipo").should("have.length", 20);
    });

    it("Comprueba visibilidad de los botones de cambio de página", () => {
      cy.get(".contenedor-cambio-pagina").should("be.visible");

      cy.get(".boton-anterior-pagina").should("be.visible");
      cy.get(".boton-siguiente-pagina").should("be.visible");

      cy.get(".indicador-pagina").each(($indicadorPagina) => {
        cy.wrap($indicadorPagina).should("be.visible");
      });
    });
  });

  describe("Verifica funcionamiento del buscador", () => {
    it("Comprueba que se muestre error en el input", () => {
      cy.get(".buscador-pokemon").should("be.visible");
      cy.get(".buscador-pokemon").should("have.attr", "placeholder", "Seleccione un Pokémon!");
      cy.get(".buscador-pokemon").should("have.value", "");

      cy.get(".boton-buscar-pokemon").should("be.visible").click();

      cy.get(".buscador-pokemon").should("have.attr", "placeholder", "Solo acepto números!");
      cy.get(".buscador-pokemon").should("have.attr", "id", "error-validacion");
    });

    it("Realiza búsqueda exitosa de un Pokémon específico", () => {
      cy.get(".contenedor-grilla").should("be.visible");
      cy.get(".contenedor-cambio-pagina").should("be.visible");
      cy.get(".contenedor-pokemon-elegido").should("not.visible");

      cy.get(".buscador-pokemon").should("be.visible").type("22");
      cy.get(".boton-buscar-pokemon").should("be.visible").click();

      cy.get(".contenedor-grilla").should("not.visible");
      cy.get(".contenedor-cambio-pagina").should("not.visible");
      cy.get(".contenedor-pokemon-elegido").should("be.visible");

      cy.get(".nombre-pokemon-elegido").should("be.visible");
      cy.get(".nombre-pokemon-elegido").should("text", "fearow");
      cy.get(".id-pokemon-elegido").should("be.visible");
      cy.get(".id-pokemon-elegido").should("text", "# 22");
      cy.get(".imagen-pokemon-elegido").should("be.visible");

      cy.get(".primer-tipo-pokemon-elegido").should("be.visible");
      cy.get(".segundo-tipo-pokemon-elegido").should("be.visible");

      cy.get(".informacion-stats").should("be.visible");
    });

    it("Cierra ventana detallada del Pokémon buscado", () => {
      cy.get(".contenedor-grilla").should("be.visible");
      cy.get(".contenedor-cambio-pagina").should("be.visible");
      cy.get(".contenedor-pokemon-elegido").should("not.visible");

      cy.get(".buscador-pokemon").should("be.visible").type("22");
      cy.get(".boton-buscar-pokemon").should("be.visible").click();

      cy.get(".contenedor-grilla").should("not.visible");
      cy.get(".contenedor-cambio-pagina").should("not.visible");
      cy.get(".contenedor-pokemon-elegido").should("be.visible");

      cy.get(".contenedor-pokemon-elegido").should("be.visible");
      cy.get(".boton-cerrar-detalles").should("be.visible").click();

      cy.get(".contenedor-grilla").should("be.visible");
      cy.get(".contenedor-cambio-pagina").should("be.visible");
      cy.get(".contenedor-pokemon-elegido").should("not.visible");
    });
  });

  describe("Comprueba el abrir detalles Pokémon con click en la foto", () => {
    it("Abre los detalles Pokémon con click en la imagen", () => {
      const pokemonABuscar = "kakuna";
      cy.wait(1000);

      cy.get(".contenedor-grilla").should("be.visible");
      cy.get(".carta-respuesta").should("not.visible");

      cy.get(`#${pokemonABuscar}`).should("be.visible").click();
      cy.get(".carta-respuesta").should("be.visible");
      cy.get(".nombre-pokemon-elegido").should("be.visible");
      cy.get(".nombre-pokemon-elegido").should("have.text", "kakuna");
    });
  });
});
