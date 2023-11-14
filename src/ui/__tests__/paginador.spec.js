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

describe(("mostrarPaginador"), () => {
	it(("Debería devolverle la visibilidad al paginador"), () => {
		document.body.innerHTML = paginadorFixture;
		const $paginador = document.querySelector(".contenedor-cambio-pagina");
		expect($paginador.id).toEqual("");

		esconderPaginador();

		expect($paginador.id).toEqual("oculto");

		mostrarPaginador();

		expect($paginador.id).toEqual("");
	});
});

describe(("actualizarNumerosIndicadorPagina"), () => {
	it(("Actualiza el paginador imprimiendo un número previo al de la página actual"), () => {
		document.body.innerHTML = paginadorFixture;
		const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
		const paginaActual = Number(document.querySelector(".active").textContent);

		const numerosEnPaginador = [];
		const numerosAObtener = [];
		const accionarDePrueba = "anterior";
		const paginaSolicitada = paginaActual - 1;

		$indicadoresPagina.forEach(($pagina) => {
			numerosEnPaginador.push(Number($pagina.textContent));
			numerosAObtener.push(Number($pagina.textContent) - 1);
		});

		$indicadoresPagina.forEach(($pagina, i) => {
			expect(Number($pagina.textContent)).toEqual(numerosEnPaginador[i]);
		});

		actualizarNumerosIndicadorPagina(accionarDePrueba, $indicadoresPagina, paginaSolicitada);

		$indicadoresPagina.forEach(($pagina, i) => {
			expect(Number($pagina.textContent)).toEqual(numerosAObtener[i]);
		});
	});

	it(("Actualiza el paginador imprimiendo siguientes números al de la página actual"), () => {
		document.body.innerHTML = paginadorFixture;
		const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
		const paginaActual = Number(document.querySelector(".active").textContent);

		const numerosEnPaginador = [];
		const numerosAObtener = [];
		const accionarDePrueba = "siguiente";
		const paginaSolicitada = paginaActual - 1;

		$indicadoresPagina.forEach(($pagina) => {
			numerosEnPaginador.push(Number($pagina.textContent));
			numerosAObtener.push(Number($pagina.textContent) + 1);
		});

		$indicadoresPagina.forEach(($pagina, i) => {
			expect(Number($pagina.textContent)).toEqual(numerosEnPaginador[i]);
		});

		actualizarNumerosIndicadorPagina(accionarDePrueba, $indicadoresPagina, paginaSolicitada);

		$indicadoresPagina.forEach(($pagina, i) => {
			expect(Number($pagina.textContent)).toEqual(numerosAObtener[i]);
		});
	});

	it(("Actualiza el paginador respecto a la página elegida"), () => {
		document.body.innerHTML = paginadorFixture;
		const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
		const paginaActual = Number(document.querySelector(".active").textContent);

		const numerosEnPaginador = [];
		const numerosAObtener = [];
		const accionarDePrueba = "especifico";
		const paginaSolicitada = paginaActual + 1;

		$indicadoresPagina.forEach(($pagina) => {
			numerosEnPaginador.push(Number($pagina.textContent));
			numerosAObtener.push(Number($pagina.textContent) + 2);
		});

		$indicadoresPagina.forEach(($pagina, i) => {
			expect(Number($pagina.textContent)).toEqual(numerosEnPaginador[i]);
		});

		actualizarNumerosIndicadorPagina(accionarDePrueba, $indicadoresPagina, paginaSolicitada);

		$indicadoresPagina.forEach(($pagina, i) => {
			expect(Number($pagina.textContent)).toEqual(numerosAObtener[i]);
		});
	});

	it(("Debería retornar en false al pasarle 'accionar' distinto a los parámetros guardados"), () => {
		document.body.innerHTML = paginadorFixture;
		const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
		const paginaActual = document.querySelector(".active");

		const numerosEnPaginador = [];
		const accionarDePrueba = "error";
		const paginaSolicitada = paginaActual + 1;

		$indicadoresPagina.forEach(($pagina) => {
			numerosEnPaginador.push(Number($pagina.textContent));
		});

		$indicadoresPagina.forEach(($pagina, i) => {
			expect(Number($pagina.textContent)).toEqual(numerosEnPaginador[i]);
		});

		expect(actualizarNumerosIndicadorPagina(accionarDePrueba, $indicadoresPagina, paginaSolicitada)).toBe(false);

		$indicadoresPagina.forEach(($pagina, i) => {
			expect(Number($pagina.textContent)).toEqual(numerosEnPaginador[i]);
		});
	});
});

describe(("desactivarPaginaActiva"), () => {
	it(("Debería eliminar remarcado sobre el indicador de la página activa"), () => {
		document.body.innerHTML = paginadorFixture;
		const $paginaActiva = document.querySelector(".active");
		let indicadorPagina = $paginaActiva.textContent;

		expect($paginaActiva.classList).toContain("active");
		expect(indicadorPagina).toContain("3");

		desactivarPaginaActiva();
		
		expect(indicadorPagina).toContain("3");
		expect($paginaActiva.classList).not.toContain("active");
	});
});
