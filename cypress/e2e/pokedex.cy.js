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

		it("Verifica la correcta carga de los primeros 20 pokémon", () => {
			cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20", {
				fixture: "listado-pagina-1",
			}).as("apiRequest");

			cy.fixture("listado-pagina-1").then((pokemonData) => {
				cy.get(".nombre-pokemon").each(($nombrePokemon, index) =>{
					cy.wrap($nombrePokemon).should("have.text", pokemonData.results[index]["name"]);
				});
			});
		});
	});
});
