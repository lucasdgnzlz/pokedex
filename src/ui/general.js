import { hacerSolicitud, buscarPokemonEspecifico } from "../api/pokedex.js";
import { validarIdPokemon } from "../validaciones/validaciones.js";
import { cargarPokemonesDeLocalStorage, guardarPokemonesEnLocalStorage, cargarDataPokemonDeLocalStorage, guardarDataPokemonEnLocalStorage } from "../storage/pokedex.js";
import { mostrarErrorValidacionBuscador, eliminarErrorValidacion } from "./validacionBuscador.js";
import { mostrarImagenPokemon, mostrarNombrePokemon, mostrarIdentificacionPokemon, mostrarTiposPokemon, mostrarImagenPokemonElegido, mostrarIdPokemonElegido, mostrarNombrePokemonElegido, mostrarTiposPokemonElegido, mostrarStatsPokemon, ocultarCartaPokemonElegido, mostrarCartaPokemonElegido } from "./cartasPokemon.js";
import { esconderPaginador, mostrarPaginador, actualizarNumerosIndicadorPagina, desactivarPaginaActiva, mostrarNumeroPaginaActiva, activarBotonAnteriorPagina, desactivarBotonAnteriorPagina, activarBotonSiguientePagina, desactivarBotonSiguientePagina } from "./paginador.js";

export async function gestionarPaginas() {
	const numeroPaginaActual = Number(document.querySelector(".active").textContent);
	const indicadorPagina = numeroPaginaActual - 1;
	const cantidadPokemonPorPagina = 20;

	try{
		const pokemones = cargarPokemonesDeLocalStorage(numeroPaginaActual);
		gestionarAPI(indicadorPagina, pokemones);
		mostrarPaginaPrincipal();
		ocultarPantallaDeCarga();
	} catch(e){
		const data = await hacerSolicitud(indicadorPagina * cantidadPokemonPorPagina);
		guardarPokemonesEnLocalStorage(numeroPaginaActual, data);
		gestionarAPI(indicadorPagina, data);
		mostrarPaginaPrincipal();
		ocultarPantallaDeCarga();
	}
}

function gestionarAPI(indicadorPagina, data) {
	const parametroCalcularIdPokemon = indicadorPagina * 20;

	for (let i = 0; i < data.results.length; i++) {
		let nombrePokemonABuscar = data.results[i]["name"];
		const idPokemon = (Number(Object.keys(data.results)[i]) + 1) + parametroCalcularIdPokemon;
		let indicadorPosicionPokemonEnLista = i;
		gestionarInformacionPokemon(idPokemon, nombrePokemonABuscar, indicadorPosicionPokemonEnLista);
	}
}

async function gestionarInformacionPokemon(idPokemon, nombrePokemon, indicadorPosicionPokemonEnLista) {
	try{
		const dataPokemon = cargarDataPokemonDeLocalStorage(idPokemon);
		mostrarImagenPokemon(dataPokemon, indicadorPosicionPokemonEnLista);
		mostrarNombrePokemon(dataPokemon, indicadorPosicionPokemonEnLista);
		mostrarIdentificacionPokemon(dataPokemon, indicadorPosicionPokemonEnLista);
		mostrarTiposPokemon(dataPokemon, indicadorPosicionPokemonEnLista);
	} catch(e){
		const data = await buscarPokemonEspecifico(nombrePokemon);
		guardarDataPokemonEnLocalStorage(data);
		mostrarImagenPokemon(data, indicadorPosicionPokemonEnLista);
		mostrarNombrePokemon(data, indicadorPosicionPokemonEnLista);
		mostrarIdentificacionPokemon(data, indicadorPosicionPokemonEnLista);
		mostrarTiposPokemon(data, indicadorPosicionPokemonEnLista);
	}
}

export async function gestionarBusquedaPokemonEspecifica(idPokemonClickeado) {
	ocultarPaginaPrincipal();
	mostrarPantallaDeCarga();

	try{
		const dataPokemon = cargarDataPokemonDeLocalStorage(idPokemonClickeado);
		esconderGrilla();
		esconderPaginador();
		mostrarCartaPokemonElegido();
		mostrarImagenPokemonElegido(dataPokemon);
		mostrarIdPokemonElegido(dataPokemon);
		mostrarNombrePokemonElegido(dataPokemon);
		mostrarTiposPokemonElegido(dataPokemon);
		mostrarStatsPokemon(dataPokemon);
		mostrarPaginaPrincipal();
		ocultarPantallaDeCarga();
	} catch(e){
		const respuesta = await buscarPokemonEspecifico(idPokemonClickeado);
		const data = await respuesta;
		esconderGrilla();
		esconderPaginador();
		mostrarCartaPokemonElegido();
		mostrarImagenPokemonElegido(data);
		mostrarIdPokemonElegido(data);
		mostrarNombrePokemonElegido(data);
		mostrarTiposPokemonElegido(data);
		mostrarStatsPokemon(data);
		mostrarPaginaPrincipal();
		ocultarPantallaDeCarga();
	}
}

export function gestionarCierreDetallesPokemon() {
	ocultarCartaPokemonElegido();
	mostrarGrilla();
	mostrarPaginador();
}

export async function gestionarBuscarPokemonPorId() {
	const idPokemonABuscar = document.querySelector(".buscador-pokemon").value;

	let error = validarIdPokemon(idPokemonABuscar);

	ocultarPaginaPrincipal();
	mostrarPantallaDeCarga();

	if (error !== "") {
		mostrarErrorValidacionBuscador(error);
		mostrarPaginaPrincipal();
		ocultarPantallaDeCarga();
	} else {
		try{
			const dataPokemon = cargarDataPokemonDeLocalStorage(idPokemonABuscar);
			esconderGrilla();
			esconderPaginador();
			eliminarErrorValidacion();
			mostrarCartaPokemonElegido();
			mostrarImagenPokemonElegido(dataPokemon);
			mostrarIdPokemonElegido(dataPokemon);
			mostrarNombrePokemonElegido(dataPokemon);
			mostrarTiposPokemonElegido(dataPokemon);
			mostrarStatsPokemon(dataPokemon);
			mostrarPaginaPrincipal();
			ocultarPantallaDeCarga();
		} catch(e){
			const respuesta = await buscarPokemonEspecifico(idPokemonABuscar);
			const data = await respuesta;
			guardarDataPokemonEnLocalStorage(data);
			esconderGrilla();
			esconderPaginador();
			eliminarErrorValidacion();
			mostrarCartaPokemonElegido();
			mostrarImagenPokemonElegido(data);
			mostrarIdPokemonElegido(data);
			mostrarNombrePokemonElegido(data);
			mostrarTiposPokemonElegido(data);
			mostrarStatsPokemon(data);
			mostrarPaginaPrincipal();
			ocultarPantallaDeCarga();
		}
	} 
}

export function gestionarActualizacionPagina($indicador, $indicadoresPagina) {
	const numeroPaginaSolicitada = $indicador.textContent;
	let indicadorPaginaSolicitada;
	const limitePokemon = 63;
	const accionar = "especifico";

	if (numeroPaginaSolicitada > limitePokemon) {
		desactivarBotonSiguientePagina();
		return false;
	} else {
		indicadorPaginaSolicitada = numeroPaginaSolicitada - 1;
		actualizarNumerosIndicadorPagina(accionar, $indicadoresPagina, indicadorPaginaSolicitada);
		desactivarPaginaActiva();
		mostrarNumeroPaginaActiva(indicadorPaginaSolicitada);
		gestionarPaginas();

		if (indicadorPaginaSolicitada !== 0) {
			activarBotonAnteriorPagina();
		} else if (indicadorPaginaSolicitada === 49) {
			desactivarBotonSiguientePagina();
		}
	}
}

export function gestionarCambioPaginaAnterior($indicadoresPagina) {
	const paginaActual = Number(document.querySelector(".active").textContent);
	let indicadorPagina = paginaActual - 1;
	let numeroPaginaSolicitada = paginaActual - 2;
	const accionar = "anterior";

	if (indicadorPagina === 0) {
		return false;
	} else if (indicadorPagina === 1) {
		desactivarBotonAnteriorPagina();
		actualizarNumerosIndicadorPagina(accionar, $indicadoresPagina, indicadorPagina);
		desactivarPaginaActiva();
		mostrarNumeroPaginaActiva(numeroPaginaSolicitada);
		gestionarPaginas();
	} else {
		activarBotonSiguientePagina();
		desactivarPaginaActiva();
		actualizarNumerosIndicadorPagina(accionar, $indicadoresPagina, indicadorPagina);
		mostrarNumeroPaginaActiva(numeroPaginaSolicitada);
		gestionarPaginas();
	}
}

export function gestionarCambioPaginaSiguiente($indicadoresPagina) {
	const paginaActual = Number(document.querySelector(".active").textContent);
	let indicadorPagina = paginaActual - 1;
	let numeroPaginaSolicitada = paginaActual;
	const limitePaginas = 62;
	const accionar = "siguiente";

	if (indicadorPagina === limitePaginas) {
		return false;
	} else if (indicadorPagina === limitePaginas - 1) {
		desactivarBotonSiguientePagina();
		desactivarPaginaActiva();
		actualizarNumerosIndicadorPagina(accionar, $indicadoresPagina, indicadorPagina);
		mostrarNumeroPaginaActiva(numeroPaginaSolicitada);
		gestionarPaginas();
	} else {
		activarBotonAnteriorPagina();
		desactivarPaginaActiva();
		actualizarNumerosIndicadorPagina(accionar, $indicadoresPagina, indicadorPagina);
		mostrarNumeroPaginaActiva(numeroPaginaSolicitada);
		gestionarPaginas();
	}
}

function esconderGrilla() {
	const $grillaPokemon = document.querySelector(".contenedor-grilla");
	$grillaPokemon.id = "oculto";
}

function mostrarGrilla() {
	const $grillaPokemon = document.querySelector(".contenedor-grilla");
	$grillaPokemon.id = "";
}

function mostrarPantallaDeCarga(){
	const $pantallaDeCarga = document.querySelector(".pantalla-de-carga");
	$pantallaDeCarga.id = "";
}

function ocultarPantallaDeCarga(){
	const $pantallaDeCarga = document.querySelector(".pantalla-de-carga");
	$pantallaDeCarga.id = "oculto";
}

function mostrarPaginaPrincipal(){
	const $estructuraPaginaPrincipal = document.querySelector(".contenedor-estructura-main");
	$estructuraPaginaPrincipal.id = "";

	const $cabecera = document.querySelector("header");
	$cabecera.id = "";
}

function ocultarPaginaPrincipal(){
	const $estructuraPaginaPrincipal = document.querySelector(".contenedor-estructura-main");
	$estructuraPaginaPrincipal.id = "";

	const $cabecera = document.querySelector("header");
	$cabecera.id = "";
}
