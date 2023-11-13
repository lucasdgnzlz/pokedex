/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import { mostrarErrorValidacionBuscador, eliminarErrorValidacion } from "../validacionBuscador.js";
import fixtureBuscador from "../../../cypress/fixtures/buscadorPokemon.fixture.js";

describe(("mostrarErrorValidacionBuscador"), () => {
	it(("Debería mostrar el error al ingresar un valor distinto a un número"), () => {
		document.body.innerHTML = fixtureBuscador;
		const mensajeError = "error";

		expect(document.querySelector(".buscador-pokemon").id).toEqual("");

		mostrarErrorValidacionBuscador(mensajeError);

		expect(document.querySelector(".buscador-pokemon").placeholder).toEqual(mensajeError);
		expect(document.querySelector(".buscador-pokemon").id).toEqual("error-validacion");
	});
});

describe(("eliminarErrorValidacion"), () => {
	it(("Debería eliminar los errores mostrados al usuario"), () => {
		document.body.innerHTML = fixtureBuscador;
		const mensajeError = "error";

		expect(document.querySelector(".buscador-pokemon").id).toEqual("");

		mostrarErrorValidacionBuscador(mensajeError);

		expect(document.querySelector(".buscador-pokemon").placeholder).toEqual(mensajeError);
		expect(document.querySelector(".buscador-pokemon").id).toEqual("error-validacion");

		eliminarErrorValidacion();

		expect(document.querySelector(".buscador-pokemon").placeholder).toEqual("Seleccione un Pokémon!");
		expect(document.querySelector(".buscador-pokemon").id).toEqual("");
	});
});
