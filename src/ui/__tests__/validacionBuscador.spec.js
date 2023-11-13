/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import { mostrarErrorValidacionBuscador, eliminarErrorValidacion } from "../validacionBuscador.js";
import fixtureHTML from "../../../cypress/fixtures/buscadorPokemon.fixture.js";

describe(("mostrarErrorValidacionBuscador"), () => {
	it(("Debería mostrar el error al ingresar un valor distinto a un número"), () => {
		document.body.innerHTML = fixtureHTML;
		const mensajeError = "error";

		expect(document.querySelector(".buscador-pokemon").id).toEqual("");

		mostrarErrorValidacionBuscador(mensajeError);

		expect(document.querySelector(".buscador-pokemon").placeholder).toEqual(mensajeError);
		expect(document.querySelector(".buscador-pokemon").id).toEqual("error-validacion");
	});
});
