/**
 * @jest-environment jsdom
 */

/// <reference types="Jest" />

import {
	esconderPaginador, 
	mostrarPaginador, 
	actualizarNumerosIndicadorPagina, 
	desactivarPaginaActiva, 
	mostrarNumeroPaginaActiva, 
	activarBotonAnteriorPagina, 
	desactivarBotonAnteriorPagina, 
	activarBotonSiguientePagina, 
	desactivarBotonSiguientePagina } from "../paginador";

import paginadorFixture from "../../../cypress/fixtures/paginador.fixture.js";

describe(("esconderPaginador"), () => {
	it(("Debería esconder el paginador"), () => {
		document.body.innerHTML = paginadorFixture;
		const $paginador = document.querySelector(".contenedor-cambio-pagina");

		expect($paginador.id).toEqual("");

		esconderPaginador();

		expect($paginador.id).toEqual("oculto");
	});
});
