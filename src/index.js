import {
	gestionarPaginas,
	gestionarActualizacionPagina,
	gestionarCambioPaginaSiguiente,
	gestionarCambioPaginaAnterior,
	gestionarBuscarPokemonPorId,
	gestionarBusquedaPokemonEspecifica,
	gestionarCierreDetallesPokemon,
} from "./ui/general.js";

const $botonBuscarPokemon = document.querySelector(".boton-buscar-pokemon");
const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
const $botonSiguientePagina = document.querySelector(".boton-siguiente-pagina");
const $botonAnteriorPagina = document.querySelector(".boton-anterior-pagina");

const $cartasPokemon = document.querySelectorAll(".carta");
const $botonCerrarDetallesPokemon = document.querySelector(".boton-cerrar-detalles");

function iniciarPagina() {
	gestionarPaginas();
}
iniciarPagina();

$botonBuscarPokemon.addEventListener("click", () => {
	gestionarBuscarPokemonPorId();
});

$cartasPokemon.forEach(($carta) => {
	$carta.addEventListener("click", () => {
		const textoIdPokemon = $carta.querySelector(".numero-identificacion-pokemon").textContent;
		const idPokemon = Number(textoIdPokemon.match(/\d+/)[0]);

		if (typeof idPokemon === "number") {
			gestionarBusquedaPokemonEspecifica(idPokemon);
		}
	});
});

$botonCerrarDetallesPokemon.addEventListener("click", gestionarCierreDetallesPokemon);

$indicadoresPagina.forEach(($indicador) => {
	$indicador.addEventListener("click", () => {
		gestionarActualizacionPagina($indicador, $indicadoresPagina);
	});
});

$botonSiguientePagina.addEventListener("click", () => {
	gestionarCambioPaginaSiguiente($indicadoresPagina);
});

$botonAnteriorPagina.addEventListener("click", () => {
	gestionarCambioPaginaAnterior($indicadoresPagina);
});
