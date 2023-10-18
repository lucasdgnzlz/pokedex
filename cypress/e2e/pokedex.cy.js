/// <reference types="Cypress"/>

const URL = "http://192.168.1.41:8080";

context("Pokédex", () => {
	beforeEach(() => {
		cy.visit(URL);
	});

	describe("Comprueba inicio página", () => {
		it("Comprueba funcionamiento pantalla de carga", () => {
			cy.get(".pantalla-de-carga").should("be.visible");

			cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20", {
				fixture: "listado-pagina-1",
			}).as("apiRequest");

			cy.wait("@apiRequest");

			cy.get(".pantalla-de-carga").should("not.be.visible");
		});
	});
});
