/// <reference types="Jest" />

import "jest-localstorage-mock";

import{
	guardarPokemonesEnLocalStorage,
	cargarPokemonesDeLocalStorage,
	guardarDataPokemonEnLocalStorage
} from "../pokedex.js";

import fixtureBeedrill from "../../../cypress/fixtures/beedrill.json";

describe("guardarPokemonesEnLocalStorage", () => {	
	it("Debería devolver un mensaje de error por no cumplir con ninguna de las condiciones", () => {
		const listaDeArgumentos = [["1", { objetoDePrueba: "valor de prueba" }], [1, "stringDePrueba"]];
	
		for (let i = 0; i < listaDeArgumentos.length; i++) {
			expect(() => {
				guardarPokemonesEnLocalStorage(listaDeArgumentos[i][0], listaDeArgumentos[i][1]);
			}).toThrowError("Se necesita el número de la página a la que pertenece la data, y los pokemones para guardar en el localStorage");
		}
	});

	it("Debería guardar los datos de los pokemones al pasar parámetros correctos", () => {
		const numeroPruebaDePagina = 1;
		const datosDePrueba = {nombre: "Pikachu", tipos: ["electrico"]};

		guardarPokemonesEnLocalStorage(numeroPruebaDePagina, datosDePrueba);

		expect(JSON.parse(localStorage.getItem(`pagina_${numeroPruebaDePagina}`))["nombre"]).toEqual("Pikachu");
		expect(JSON.parse(localStorage.getItem(`pagina_${numeroPruebaDePagina}`))["tipos"][0]).toEqual("electrico");
	});
});

describe(("cargarPokemonesDeLocalStorage"), () => {
	it(("Debería devolver un mensaje de error al pasarle un parámetro de tipo undefined"), () => {
		const numeroDePagina = undefined;

		expect(() => {
			cargarPokemonesDeLocalStorage(numeroDePagina);
		}).toThrowError("Se necesita una cantidad y un indicador de página para cargar a los pokemones");
	});

	it(("Debería devolver un mensaje de error si 'pokemones' es igual a null"), () => {
		localStorage.clear();
		const numeroDePagina = 1;
		
		expect(() => {
			cargarPokemonesDeLocalStorage(numeroDePagina);
		}).toThrowError("Pagina 1 de Pokemones no se encontró en el localStorage");
	});

	it(("Debería guardar y devolver la data de los pokemones"), () => {
		localStorage.clear();
		const numeroPruebaDePagina = 1;
		const datosDePrueba = {nombre: "Pikachu", tipos: ["electrico"]};

		guardarPokemonesEnLocalStorage(numeroPruebaDePagina, datosDePrueba);
		const datosCargadosLocalStorage = cargarPokemonesDeLocalStorage(numeroPruebaDePagina, datosDePrueba);

		expect((datosCargadosLocalStorage)).toEqual(datosDePrueba);
	});
});

describe(("guardarDataPokemonEnLocalStorage"), () => {
	it(("Debería devolver un mensaje de error al enviar un argumento invalido"), () => {
		const stringDePrueba = "";
		
		expect(() => {
			guardarDataPokemonEnLocalStorage(stringDePrueba);
		}).toThrowError("Se necesita la data del pokémon para guardarla en el localStorage");
	});
});
