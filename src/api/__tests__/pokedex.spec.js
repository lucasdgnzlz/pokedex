/* eslint-env browser, node */
/* eslint-env jest */

/// <reference types="Jest" />

import { URL_BASE, LIMITE_POKEMONES,  hacerSolicitud, buscarPokemonEspecifico } from "../pokedex";
import listaPokemonFixture from "../../../cypress/fixtures/listado-pagina-3.json";

beforeEach(() => {
	global.fetch = jest.fn();
});

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
});
