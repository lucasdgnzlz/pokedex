/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import { mostrarImagenPokemon, mostrarNombrePokemon, mostrarIdentificacionPokemon, mostrarTiposPokemon, mostrarImagenPokemonElegido, mostrarIdPokemonElegido, mostrarNombrePokemonElegido, mostrarTiposPokemonElegido, mostrarStatsPokemon, ocultarCartaPokemonElegido, mostrarCartaPokemonElegido} from "../cartasPokemon.js";
import { guardarDataPokemonEnLocalStorage, cargarDataPokemonDeLocalStorage } from "../../storage/pokedex.js";
import fixturePokemonDePrueba from "../../../cypress/fixtures/charmander.json";
import fixtureCartasPokemon from "./fixtures/cartasPokemon.fixture.js";

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
