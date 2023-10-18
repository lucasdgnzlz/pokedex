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

	describe.only("Comprueba funcionamiento de busqueda de un pokémon por ID", () => {
		it("Verifica la validación del buscador con campo de búsqueda vacío", () =>{
			cy.get(".buscador-pokemon")
				.should("be.visible")
				.should("have.id", "")
				.should("have.attr", "placeholder", "Seleccione un Pokémon!");
				
			cy.get(".boton-buscar-pokemon").should("be.visible").click();

			cy.get(".buscador-pokemon")
				.should("be.visible")
				.should("have.id", "error-validacion")
				.should("have.attr", "placeholder", "Solo acepto números!");
		});

		it("Realiza una correcta búsqueda por ID", () =>{
			cy.get(".carta-respuesta")
				.should("not.be.visible");

			cy.get(".buscador-pokemon")
				.should("be.visible")
				.type("466");

			cy.get(".boton-buscar-pokemon")
				.should("be.visible")
				.click();

			cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/466", {
				fixture: "electivire",
			}).as("apiRequest");

			cy.get(".carta-respuesta")
				.should("be.visible")
				.within(() => {
					cy.get(".nombre-pokemon-elegido").should("be.visible");
					cy.contains("electivire");

					cy.get(".id-pokemon-elegido").should("be.visible");
					cy.contains("# 466");
				});
		});
	});
});
