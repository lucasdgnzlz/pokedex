import { hacerSolicitud, buscarPokemonEspecifico } from "./pokedex.js";
import { validarIdPokemon } from "./validaciones.js";
import { cargarPokemonesDeLocalStorage, guardarPokemonesEnLocalStorage, cargarDataPokemonDeLocalStorage, guardarDataPokemonEnLocalStorage } from "./storage/pokedex.js";

export async function gestionarPaginas() {
	const numeroPaginaActual = Number(document.querySelector(".active").textContent);
	const indicadorPagina = numeroPaginaActual - 1;
	const cantidadPokemonPorPagina = 20;

	ocultarPaginaPrincipal();
	mostrarPantallaDeCarga();

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
	const respuesta = await buscarPokemonEspecifico(idPokemonClickeado);
	const data = await respuesta;
	esconderGrilla();
	esconderCambioPagina();
	mostrarCartaPokemonElegido();
	mostrarImagenPokemonElegido(data);
	mostrarIdPokemonElegido(data);
	mostrarNombrePokemonElegido(data);
	mostrarTiposPokemonElegido(data);
	mostrarStatsPokemon(data);
}

export function gestionarCierreDetallesPokemon() {
	ocultarCartaPokemonElegido();
	mostrarGrilla();
	mostrarCambioPagina();
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
			esconderCambioPagina();
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
			esconderCambioPagina();
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

function mostrarImagenPokemon(dataPokemon, indicadorPosicionPokemonEnLista) {
	if(typeof dataPokemon.sprites === "string"){
		const $imagenesCartasPokemon = document.querySelectorAll(".imagen-carta");
		$imagenesCartasPokemon[indicadorPosicionPokemonEnLista].src = dataPokemon.sprites;
		$imagenesCartasPokemon[indicadorPosicionPokemonEnLista].alt = `Pokémon ${dataPokemon.name}`;
		$imagenesCartasPokemon[indicadorPosicionPokemonEnLista].id = `${dataPokemon.name}`;
	} else{
		const $imagenesCartasPokemon = document.querySelectorAll(".imagen-carta");
		$imagenesCartasPokemon[indicadorPosicionPokemonEnLista].src = dataPokemon.sprites["front_default"];
		$imagenesCartasPokemon[indicadorPosicionPokemonEnLista].alt = `Pokémon ${dataPokemon.name}`;
		$imagenesCartasPokemon[indicadorPosicionPokemonEnLista].id = `${dataPokemon.name}`;
	}
}

function mostrarNombrePokemon(dataPokemon, indicadorPosicionPokemonEnLista) {
	const $titulosCartasPokemon = document.querySelectorAll(".nombre-pokemon");
	$titulosCartasPokemon[indicadorPosicionPokemonEnLista].textContent = dataPokemon.name;
}

function mostrarIdentificacionPokemon(dataPokemon, indicadorPosicionPokemonEnLista) {
	const $numeroIdentificacionPokemon = document.querySelectorAll(".numero-identificacion-pokemon");
	$numeroIdentificacionPokemon[indicadorPosicionPokemonEnLista].textContent = `# ${dataPokemon.id}`;
}

function mostrarTiposPokemon(dataPokemon, indicadorPosicionPokemonEnLista) {
	const cantidadTiposPokemon = dataPokemon.types.length;

	const $contenedorTiposPokemon = document.querySelectorAll(".contenedor-tipos-pokemon")[indicadorPosicionPokemonEnLista];

	if (cantidadTiposPokemon === 1) {
		const $primerImagenTipoPokemon = $contenedorTiposPokemon.children[0].children[0];
		$primerImagenTipoPokemon.src = `img/${dataPokemon.types["0"]["type"]["name"]}.svg`;

		const $segundaImagenTipoPokemon = $contenedorTiposPokemon.children[1].children[0];
		$segundaImagenTipoPokemon.id = "oculto";
	} else {
		const $primerImagenTipoPokemon = $contenedorTiposPokemon.children[0].children[0];
		const $segundaImagenTipoPokemon = $contenedorTiposPokemon.children[1].children[0];

		$primerImagenTipoPokemon.src = `img/${dataPokemon.types["0"]["type"]["name"]}.svg`;
		$segundaImagenTipoPokemon.src = `img/${dataPokemon.types["1"]["type"]["name"]}.svg`;
		$segundaImagenTipoPokemon.id = "";
	}
}

function mostrarImagenPokemonElegido(dataPokemon) {
	const $imagenPokemonElegido = document.querySelector(".imagen-pokemon-elegido");

	if(typeof dataPokemon.sprites === "string"){
		$imagenPokemonElegido.src = dataPokemon.sprites;
		$imagenPokemonElegido.alt = `Pokémon ${dataPokemon.name}`;
	} else{
		$imagenPokemonElegido.src = dataPokemon.sprites["front_default"];
		$imagenPokemonElegido.alt = `Pokémon ${dataPokemon.name}`;
	}
}

function mostrarIdPokemonElegido(dataPokemon) {
	const $idPokemonElegido = document.querySelector(".id-pokemon-elegido");
	$idPokemonElegido.textContent = `# ${dataPokemon.id}`;
}

function mostrarNombrePokemonElegido(dataPokemon) {
	const $nombrePokemonElegido = document.querySelector(".nombre-pokemon-elegido");
	$nombrePokemonElegido.textContent = dataPokemon.name;
}

function mostrarTiposPokemonElegido(dataPokemon) {
	const cantidadTiposPokemon = dataPokemon.types.length;

	if (cantidadTiposPokemon === 1) {
		const $primerImagenTipoPokemon = document.querySelector(".primer-tipo-pokemon-elegido");
		$primerImagenTipoPokemon.src = `img/${dataPokemon.types["0"]["type"]["name"]}.svg`;

		const $segundaImagenTipoPokemon = document.querySelector(".segundo-tipo-pokemon-elegido");
		$segundaImagenTipoPokemon.id = "oculto";
	} else {
		const $primerImagenTipoPokemon = document.querySelector(".primer-tipo-pokemon-elegido");
		const $segundaImagenTipoPokemon = document.querySelector(".segundo-tipo-pokemon-elegido");

		$primerImagenTipoPokemon.src = `img/${dataPokemon.types["0"]["type"]["name"]}.svg`;
		$segundaImagenTipoPokemon.src = `img/${dataPokemon.types["1"]["type"]["name"]}.svg`;
		$segundaImagenTipoPokemon.id = "";
	}
}

function mostrarStatsPokemon(dataPokemon) {
	let vidaPokemon = dataPokemon.stats["0"]["base_stat"];
	let ataquePokemon = dataPokemon.stats["1"]["base_stat"];
	let ataqueEspecialPokemon = dataPokemon.stats["2"]["base_stat"];
	let defensaPokemon = dataPokemon.stats["3"]["base_stat"];
	let defensaEspecialPokemon = dataPokemon.stats["4"]["base_stat"];
	let velocidadPokemon = dataPokemon.stats["5"]["base_stat"];

	const $respuestaVidaPokemon = document.querySelector(".vida-base-respuesta");
	const $respuestaAtaquePokemon = document.querySelector(".ataque-base-respuesta");
	const $respuestaDefensaPokemon = document.querySelector(".defensa-base-respuesta");
	const $respuestaAtaqueEspecialPokemon = document.querySelector(".ataque-especial-base-respuesta");
	const $respuestaDefensaEspecialPokemon = document.querySelector(".defensa-especial-base-respuesta");
	const $respuestaVelocidadPokemon = document.querySelector(".velocidad-base-respuesta");

	$respuestaVidaPokemon.textContent = vidaPokemon;
	$respuestaAtaquePokemon.textContent = ataquePokemon;
	$respuestaDefensaPokemon.textContent = defensaPokemon;
	$respuestaAtaqueEspecialPokemon.textContent = ataqueEspecialPokemon;
	$respuestaDefensaEspecialPokemon.textContent = defensaEspecialPokemon;
	$respuestaVelocidadPokemon.textContent = velocidadPokemon;
}

function mostrarErrorValidacionBuscador(error) {
	const $buscadorPokemon = document.querySelector(".buscador-pokemon");
	$buscadorPokemon.classList.add("is-invalid");
	$buscadorPokemon.placeholder = error;
	$buscadorPokemon.id = "error-validacion";
}

function eliminarErrorValidacion() {
	const $buscadorPokemon = document.querySelector(".buscador-pokemon");
	$buscadorPokemon.classList.remove("is-invalid");
	$buscadorPokemon.placeholder = "Seleccione un Pokémon!";
	$buscadorPokemon.id = "";
}

function esconderGrilla() {
	const $grillaPokemon = document.querySelector(".contenedor-grilla");
	$grillaPokemon.id = "oculto";
}

function mostrarGrilla() {
	const $grillaPokemon = document.querySelector(".contenedor-grilla");
	$grillaPokemon.id = "";
}

function ocultarCartaPokemonElegido() {
	const $cartaPokemonElegido = document.querySelector(".carta-respuesta");
	$cartaPokemonElegido.id = "oculto";
}

function mostrarCartaPokemonElegido() {
	const $cartaPokemonElegido = document.querySelector(".carta-respuesta");
	$cartaPokemonElegido.id = "";
}

function esconderCambioPagina() {
	const $contenedorCambioPagina = document.querySelector(".contenedor-cambio-pagina");
	$contenedorCambioPagina.id = "oculto";
}

function mostrarCambioPagina() {
	const $contenedorCambioPagina = document.querySelector(".contenedor-cambio-pagina");
	$contenedorCambioPagina.id = "";
}

function actualizarNumerosIndicadorPagina(accionar, $indicadoresPagina, indicadorPaginaSolicitada) {
	let accionesModal = ["anterior", "siguiente", "especifico"];

	if (accionar === accionesModal[0]) {
		let numeroAImprimir = indicadorPaginaSolicitada;
		$indicadoresPagina.forEach(($indicador) => {
			$indicador.textContent = numeroAImprimir;
			numeroAImprimir++;
		});
	} else if (accionar === accionesModal[1]) {
		let numeroAImprimir = indicadorPaginaSolicitada + 2;
		$indicadoresPagina.forEach(($indicador) => {
			$indicador.textContent = numeroAImprimir;
			numeroAImprimir++;
		});
	} else if (accionar === accionesModal[2]) {
		let numeroAImprimir = indicadorPaginaSolicitada + 1;
		$indicadoresPagina.forEach(($indicador) => {
			$indicador.textContent = numeroAImprimir;
			numeroAImprimir++;
		});
	} else {
		return false;
	}
}

function desactivarPaginaActiva() {
	const $contenedoresNumerosPagina = document.querySelectorAll(".pagina-item");

	$contenedoresNumerosPagina.forEach(($contenedorNumeroPagina) => {
		$contenedorNumeroPagina.classList.remove("active");
	});
}

function mostrarNumeroPaginaActiva(indicadorPaginaSolicitada) {
	const numeroPaginaActual = indicadorPaginaSolicitada + 1;
	const $contenedoresNumerosPagina = document.querySelectorAll(".pagina-item");

	$contenedoresNumerosPagina.forEach(($contenedorNumeroPagina) => {
		const numeroIndicador = Number($contenedorNumeroPagina.textContent);

		if (numeroIndicador === numeroPaginaActual) {
			$contenedorNumeroPagina.classList.add("active");
		}
	});
}

function activarBotonAnteriorPagina() {
	const $estadoBotonAnterior = document.querySelector(".indicador-estado-anterior");
	$estadoBotonAnterior.classList.remove("disabled");
}

function desactivarBotonAnteriorPagina() {
	const $estadoBotonAnterior = document.querySelector(".indicador-estado-anterior");
	$estadoBotonAnterior.classList.add("disabled");
}

function activarBotonSiguientePagina() {
	const $estadoBotonAnterior = document.querySelector(".indicador-estado-siguiente");
	$estadoBotonAnterior.classList.remove("disabled");
}

function desactivarBotonSiguientePagina() {
	const $estadoBotonAnterior = document.querySelector(".indicador-estado-siguiente");
	$estadoBotonAnterior.classList.add("disabled");
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
