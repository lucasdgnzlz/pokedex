/// <reference types="Jest" />

import "jest-localstorage-mock";

import{
	guardarPokemonesEnLocalStorage,
	cargarPokemonesDeLocalStorage,
	guardarDataPokemonEnLocalStorage,
	cargarDataPokemonDeLocalStorage
} from "../pokedex.js";

import fixturePaginaUno from "../../../cypress/fixtures/listado-pagina-1.json";
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
		const NUMERO_PAGINA_PRUEBA = 1;
		const datosDePrueba = {nombre: "Pikachu", tipos: ["electrico"]};

		guardarPokemonesEnLocalStorage(NUMERO_PAGINA_PRUEBA, datosDePrueba);

		expect(JSON.parse(localStorage.getItem(`pagina_${NUMERO_PAGINA_PRUEBA}`))["nombre"]).toEqual("Pikachu");
		expect(JSON.parse(localStorage.getItem(`pagina_${NUMERO_PAGINA_PRUEBA}`))["tipos"][0]).toEqual("electrico");
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
		const NUMERO_PAGINA_PRUEBA = 1;
		const datosPaginaDePrueba = fixturePaginaUno;

		guardarPokemonesEnLocalStorage(NUMERO_PAGINA_PRUEBA, datosPaginaDePrueba);
		const datosCargadosLocalStorage = cargarPokemonesDeLocalStorage(NUMERO_PAGINA_PRUEBA, datosPaginaDePrueba);

		expect((datosCargadosLocalStorage)).toEqual(datosPaginaDePrueba);
	});
});

describe(("guardarDataPokemonEnLocalStorage"), () => {
	it(("Debería devolver un mensaje de error al enviar un argumento invalido"), () => {
		const stringDePrueba = "";
		
		expect(() => {
			guardarDataPokemonEnLocalStorage(stringDePrueba);
		}).toThrowError("Se necesita la data del pokémon para guardarla en el localStorage");
	});

	it(("Debería guardar la data con éxito al pasarle un argumento correcto"), () => {
		localStorage.clear();
		const dataPokemonDePrueba = fixtureBeedrill;
		guardarDataPokemonEnLocalStorage(dataPokemonDePrueba);

		const dataPokemonGuardadosEnLocalStorage = JSON.parse(localStorage.getItem(`pokemon_${dataPokemonDePrueba["id"]}`));

		expect((dataPokemonGuardadosEnLocalStorage["name"])).toEqual(dataPokemonDePrueba["name"]);
		expect((dataPokemonGuardadosEnLocalStorage["id"])).toEqual(dataPokemonDePrueba["id"]);
	});
});

describe(("cargarDataPokemonDeLocalStorage"), () => {
	it(("Debería devolver un mensaje de error al ser el id del pokémon undefined"), () =>{
		expect(() => {
			cargarDataPokemonDeLocalStorage(undefined);
		}).toThrowError("Se necesita un identificador para cargar el pokémon correspondiente");
	});

	it(("Debería devolver un mensaje de error al intentar cargar la data y que devuelva null"), () => {
		localStorage.clear();

		const  ID_DE_PRUEBA = 25;

		expect(() => {
			cargarDataPokemonDeLocalStorage(ID_DE_PRUEBA);
		}).toThrowError(`Pokémon #${ID_DE_PRUEBA} no se encontró en el localStorage`);
	});

	it(("Debería devolver la data del pokémon correctamente al pasarle su id"), () => {
		localStorage.clear();

		const dataPokemonDePrueba = fixtureBeedrill;

		guardarDataPokemonEnLocalStorage(dataPokemonDePrueba);
		const dataPokemon = cargarDataPokemonDeLocalStorage(dataPokemonDePrueba.id);

		expect((dataPokemon["id"])).toEqual(dataPokemonDePrueba["id"]);
		expect((dataPokemon["name"])).toEqual(dataPokemonDePrueba["name"]);
	});
});
