/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import { mostrarImagenPokemon, mostrarNombrePokemon, mostrarIdentificacionPokemon, mostrarTiposPokemon, mostrarImagenPokemonElegido, mostrarIdPokemonElegido, mostrarNombrePokemonElegido, mostrarTiposPokemonElegido, mostrarStatsPokemon, ocultarCartaPokemonElegido, mostrarCartaPokemonElegido} from "../cartasPokemon.js";
import { guardarDataPokemonEnLocalStorage, cargarDataPokemonDeLocalStorage } from "../../storage/pokedex.js";

import fixturePokemonDePrueba from "../../../cypress/fixtures/charmander.json";
import segundoFixturePokemon from "../../../cypress/fixtures/venusaur.json";
import fixtureCartasPokemon from "../../../cypress/fixtures/cartasPokemon.fixture.js";
import fixtureCartaPokemonElegido from "../../../cypress/fixtures/cartaPokemonElegido.fixture.js";

describe(("mostrarImagenPokemon"), () =>{
	it(("Muestra la imagen del pokémon con la data traida de la API"), () => {
		document.body.innerHTML = fixtureCartasPokemon;

		const fixturePokemon = fixturePokemonDePrueba;
		const INDICADOR_DE_PRUEBA = 3;

		mostrarImagenPokemon(fixturePokemon, INDICADOR_DE_PRUEBA);
		expect(document.querySelectorAll(".imagen-carta")[INDICADOR_DE_PRUEBA].src).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png");
	});

	it(("Muestra la imagen del pokémon con la data cargada del localStorage"), () =>{		
		document.body.innerHTML = fixtureCartasPokemon;
		const INDICADOR_DE_PRUEBA = 3;
		
		const dataPokemonAGuardar = fixturePokemonDePrueba;
		guardarDataPokemonEnLocalStorage(dataPokemonAGuardar);

		const dataPokemon = cargarDataPokemonDeLocalStorage(dataPokemonAGuardar["id"]);

		mostrarImagenPokemon(dataPokemon, INDICADOR_DE_PRUEBA);
		expect(document.querySelectorAll(".imagen-carta")[INDICADOR_DE_PRUEBA].src).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png");
		
		localStorage.clear();
	});
});

describe(("mostrarNombrePokemon"), () => {
	it(("Muestra el nombre del pokémon que corresponde según el posicionamiento del mismo"), () => {
		document.body.innerHTML = fixtureCartasPokemon;
		const dataPokemonDePrueba = {"name": "testeado"};
		const INDICADOR_POSICION_DE_PRUEBA = 3;
		
		mostrarNombrePokemon(dataPokemonDePrueba, INDICADOR_POSICION_DE_PRUEBA);

		expect(document.querySelectorAll(".nombre-pokemon")[INDICADOR_POSICION_DE_PRUEBA].textContent).toContain(dataPokemonDePrueba.name);
	});
});

describe(("mostrarIdentificacionPokemon"), () => {
	it(("Muestra el ID del pokémon que corresponde según el posicionamiento"), () => {
		document.body.innerHTML = fixtureCartasPokemon;
		const dataDePrueba = {"id": "Test"};
		const INDICADOR_POSICION_DE_PRUEBA = 3;

		mostrarIdentificacionPokemon(dataDePrueba, INDICADOR_POSICION_DE_PRUEBA);
		expect(document.querySelectorAll(".numero-identificacion-pokemon")[INDICADOR_POSICION_DE_PRUEBA].textContent).toContain(dataDePrueba.id);
	});
});

describe(("mostrarTiposPokemon"), ()=>{
	it(("Muestra el tipo de un pokémon de un solo tipo"), () => {
		document.body.innerHTML = fixtureCartasPokemon;
		const INDICADOR_POSICION_DE_PRUEBA = 3;
		const dataPokemon = fixturePokemonDePrueba;

		const tipoPokemon = dataPokemon.types["0"]["type"]["name"];

		mostrarTiposPokemon(dataPokemon, INDICADOR_POSICION_DE_PRUEBA);

		expect(document.querySelectorAll(".primer-tipo")[INDICADOR_POSICION_DE_PRUEBA].src).toEqual(`http://localhost/img/${tipoPokemon}.svg`);
	});

	it(("Muestra los tipos de un pokémon con más de un tipo"), () => {
		document.body.innerHTML = fixtureCartasPokemon;
		const INDICADOR_POSICION_DE_PRUEBA = 3;
		const dataPokemon = segundoFixturePokemon;

		const tiposPokemon = [dataPokemon.types["0"]["type"]["name"], dataPokemon.types["1"]["type"]["name"]];

		mostrarTiposPokemon(dataPokemon, INDICADOR_POSICION_DE_PRUEBA);

		expect(document.querySelectorAll(".primer-tipo")[INDICADOR_POSICION_DE_PRUEBA].src).toEqual(`http://localhost/img/${tiposPokemon[0]}.svg`);
		expect(document.querySelectorAll(".segundo-tipo")[INDICADOR_POSICION_DE_PRUEBA].src).toEqual(`http://localhost/img/${tiposPokemon[1]}.svg`);
	});
});

describe(("mostrarImagenPokemonElegido"), () => {
	it(("Muestra la imagen del pokemon elegido con data cargada de LocalStorage"), () => {
		document.body.innerHTML = fixtureCartaPokemonElegido;
		const dataPokemon = fixturePokemonDePrueba;

		guardarDataPokemonEnLocalStorage(dataPokemon);
		
		const dataCargadaDeLocalStorage = cargarDataPokemonDeLocalStorage(dataPokemon.id);
		mostrarImagenPokemonElegido(dataCargadaDeLocalStorage);

		expect(document.querySelector(".imagen-pokemon-elegido").src).toEqual(dataCargadaDeLocalStorage.sprites);

		localStorage.clear();
	});

	it(("Muestra la imagen del pokémon elegido con la data de la API"), () => {
		document.body.innerHTML = fixtureCartaPokemonElegido;
		const dataPokemon = fixturePokemonDePrueba;

		mostrarImagenPokemonElegido(dataPokemon);
		expect(document.querySelector(".imagen-pokemon-elegido").src).toEqual(dataPokemon.sprites["front_default"]);
	});
});

describe(("mostrarIdPokemonElegido"), ()=>{
	it(("Debería mostrar el ID del pokémon elegido"), () => {
		document.body.innerHTML = fixtureCartaPokemonElegido;
		const dataPokemon = {"id": 33};

		mostrarIdPokemonElegido(dataPokemon);
		expect(document.querySelector(".id-pokemon-elegido").textContent).toEqual(`# ${dataPokemon.id}`);
	});
});

describe(("mostrarNombrePokemonElegido"), () => {
	it(("Debería mostrar el nombre del pokémon elegido"), () =>{
		document.body.innerHTML = fixtureCartaPokemonElegido;
		const dataPokemon = {"name": "test"};

		mostrarNombrePokemonElegido(dataPokemon);
		expect(document.querySelector(".nombre-pokemon-elegido").textContent).toEqual(dataPokemon.name);
	});
});

describe(("mostrarTiposPokemonElegido"), () => {
	it(("Muestra el tipo de un pokémon elegido de un solo tipo"), () =>{
		document.body.innerHTML = fixtureCartaPokemonElegido;
		const dataPokemon = fixturePokemonDePrueba;
		const tipoPokemon = dataPokemon.types["0"]["type"]["name"];

		mostrarTiposPokemonElegido(dataPokemon);

		expect(document.querySelector(".primer-tipo-pokemon-elegido").src).toEqual(`http://localhost/img/${tipoPokemon}.svg`);
	});
});
