/* eslint-env browser, node */
/* eslint-env jest */

/// <reference types="Jest" />

import { URL_BASE, LIMITE_POKEMONES,  hacerSolicitud, buscarPokemonEspecifico } from "../pokedex";
import listaPokemonFixture from "../../../cypress/fixtures/listado-pagina-3.json";
import pokemonFixture from "../../../cypress/fixtures/electivire.json";

beforeEach(() => {
	global.fetch = jest.fn();
});

console.error = jest.fn();

describe(("hacerSolicitud"), () => {
	it(("Carga lista de 20 pokémones"), () => {
		global.fetch = jest.fn()
			.mockImplementation(() => new Promise ((resolve) =>{
				const jsonPromise = new Promise ((r) => {
					r(listaPokemonFixture);
				});
				resolve({ json: () => jsonPromise});
			}));

		const INDICADOR_POKEMON = 40;

		hacerSolicitud(INDICADOR_POKEMON);
    
		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch).toHaveBeenCalledWith(`${URL_BASE}?offset=${INDICADOR_POKEMON}&limit=${LIMITE_POKEMONES}`);
	});

	it(("Debería dar error al pasar como parámetro un indicador erróneo"), async () => {
		const indicadorDePrueba = "prueba";
		global.fetch.mockRejectedValue(new Error ("Error en la solicitud a la API"));

		await hacerSolicitud(indicadorDePrueba);
		expect(console.error).toHaveBeenCalledWith(new Error ("Error en la solicitud a la API"));
	});
});
