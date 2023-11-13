export function esconderPaginador() {
	const $contenedorCambioPagina = document.querySelector(".contenedor-cambio-pagina");
	$contenedorCambioPagina.id = "oculto";
}

export function mostrarPaginador() {
	const $contenedorCambioPagina = document.querySelector(".contenedor-cambio-pagina");
	$contenedorCambioPagina.id = "";
}

export function actualizarNumerosIndicadorPagina(accionar, $indicadoresPagina, indicadorPaginaSolicitada) {
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

export function desactivarPaginaActiva() {
	const $contenedoresNumerosPagina = document.querySelectorAll(".pagina-item");

	$contenedoresNumerosPagina.forEach(($contenedorNumeroPagina) => {
		$contenedorNumeroPagina.classList.remove("active");
	});
}

export function mostrarNumeroPaginaActiva(indicadorPaginaSolicitada) {
	const numeroPaginaActual = indicadorPaginaSolicitada + 1;
	const $contenedoresNumerosPagina = document.querySelectorAll(".pagina-item");

	$contenedoresNumerosPagina.forEach(($contenedorNumeroPagina) => {
		const numeroIndicador = Number($contenedorNumeroPagina.textContent);

		if (numeroIndicador === numeroPaginaActual) {
			$contenedorNumeroPagina.classList.add("active");
		}
	});
}

export function activarBotonAnteriorPagina() {
	const $estadoBotonAnterior = document.querySelector(".indicador-estado-anterior");
	$estadoBotonAnterior.classList.remove("disabled");
}

export function desactivarBotonAnteriorPagina() {
	const $estadoBotonAnterior = document.querySelector(".indicador-estado-anterior");
	$estadoBotonAnterior.classList.add("disabled");
}

export function activarBotonSiguientePagina() {
	const $estadoBotonAnterior = document.querySelector(".indicador-estado-siguiente");
	$estadoBotonAnterior.classList.remove("disabled");
}

export function desactivarBotonSiguientePagina() {
	const $estadoBotonAnterior = document.querySelector(".indicador-estado-siguiente");
	$estadoBotonAnterior.classList.add("disabled");
}
