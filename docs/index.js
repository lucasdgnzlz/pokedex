import {
  gestionarPaginas,
  gestionarActualizacionPagina,
  gestionarCambioPaginaSiguiente,
  gestionarCambioPaginaAnterior,
  gestionarBuscarPokemonPorId,
  gestionarBusquedaPokemonEspecifica,
  gestionarCierreDetallesPokemon,
} from "./ui.js";

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
  $carta.addEventListener("click", (e) => {
    let elementoClickeado = e.target.className;

    if (elementoClickeado === "imagen-carta") {
      let idPokemonClickeado = e.target.id;
      gestionarBusquedaPokemonEspecifica(idPokemonClickeado);
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
