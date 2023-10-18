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

	describe("Comprueba funcionamiento de busqueda de un pokémon por ID", () => {
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

	describe.only("Comprueba funcionamiento del paginador", () => {
		it("Verifica funcionamiento de los números del paginador", () => {
			cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20", {
				fixture: "listado-pagina-1"
			}).as("apiRequest");

			cy.fixture("listado-pagina-1").then((pokemonData) => {
				cy.get(".nombre-pokemon").each(($nombrePokemon, index) =>{
					cy.wrap($nombrePokemon).should("have.text", pokemonData.results[index]["name"]);
				});
			});

			cy.get(".paginador")
				.should("be.visible")
				.within(() => {
					cy.contains("1");
					cy.contains("2");
					cy.contains("3").click();

					cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon?offset=40&limit=20", {
						fixture: "listado-pagina-3"
					}).as("apiRequest");

					cy.contains("3");
					cy.contains("4");
					cy.contains("5");
				});

			cy.fixture("listado-pagina-3").then((pokemonData) => {
				cy.get(".nombre-pokemon").each(($nombrePokemon, index) =>{
					cy.wrap($nombrePokemon).should("have.text", pokemonData.results[index]["name"]);
				});
			});
		});

		it("Verifica funcionamiento del botón siguiente página", () =>{
			cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20" ,{
				fixture: "listado-pagina-1"
			}).as("apiRequest");

			cy.fixture("listado-pagina-1").then(($pokemonData) =>{
				cy.get(".nombre-pokemon").each(($nombrePokemon, index) => {
					cy.wrap($nombrePokemon).should("have.text", $pokemonData.results[index]["name"]);
				});
			});

			cy.get(".boton-siguiente-pagina")
				.should("be.visible")
				.click();

			cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20", {
				fixture: "listado-pagina-2"
			}).as("apiRequest");

			cy.fixture("listado-pagina-2").then(($pokemonData) =>{
				cy.get(".nombre-pokemon").each(($nombrePokemon, index) =>{
					cy.wrap($nombrePokemon).should("have.text", $pokemonData.results[index]["name"]);
				});
			});
		});
	});
});
