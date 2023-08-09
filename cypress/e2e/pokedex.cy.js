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
    });
  });
});
