const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
const $botonSiguientePagina = document.querySelector(".boton-siguiente-pagina");
const $botonAnteriorPagina = document.querySelector(".boton-anterior-pagina");

function actualizarNumerosIndicadorPagina() {
  let numeroAImprimir = indicadorPagina + 1;
  $indicadoresPagina.forEach(($indicador) => {
    $indicador.textContent = numeroAImprimir;
    numeroAImprimir++;
  });
}

function mostrarNumeroPaginaActiva() {
  const numeroPaginaActual = indicadorPagina + 1;
  const $contenedoresNumerosPagina = document.querySelectorAll(".pagina-item");

  $contenedoresNumerosPagina.forEach(($contenedorNumeroPagina) => {
    const numeroIndicador = Number($contenedorNumeroPagina.textContent);

    if (numeroIndicador === numeroPaginaActual) {
      $contenedorNumeroPagina.classList.add("active");
    }
  });
}

function desactivarPaginaActiva() {
  const $contenedoresNumerosPagina = document.querySelectorAll(".pagina-item");

  $contenedoresNumerosPagina.forEach(($contenedorNumeroPagina) => {
    $contenedorNumeroPagina.classList.remove("active");
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

$indicadoresPagina.forEach(($indicador, i) => {
  $indicador.addEventListener("click", () => {
    const numeroPaginaSolicitada = $indicador.textContent;
    const limitePokemon = 63;

    if (numeroPaginaSolicitada > limitePokemon) {
      desactivarBotonSiguientePagina();
      return false;
    } else {
      indicadorPagina = numeroPaginaSolicitada - 1;
      actualizarNumerosIndicadorPagina();
      mostrarNumeroPaginaActiva(i);
      hacerSolicitud();
      desactivarPaginaActiva();
      mostrarNumeroPaginaActiva();

      if (indicadorPagina !== 0) {
        activarBotonAnteriorPagina();
      } else if (indicadorPagina === 49) {
        desactivarBotonSiguientePagina();
      }
    }
  });
});

$botonSiguientePagina.addEventListener("click", () => {
  const limitePokemon = 62;

  if (indicadorPagina === limitePokemon) {
    return false;
  } else if (indicadorPagina === limitePokemon - 1) {
    desactivarBotonSiguientePagina();
    indicadorPagina++;
    hacerSolicitud();
    desactivarPaginaActiva();
    mostrarNumeroPaginaActiva();
  } else {
    activarBotonAnteriorPagina();
    indicadorPagina++;
    hacerSolicitud();
    actualizarNumerosIndicadorPagina();
    desactivarPaginaActiva();
    mostrarNumeroPaginaActiva();
  }
});

$botonAnteriorPagina.addEventListener("click", () => {
  if (indicadorPagina === 0) {
    return false;
  } else if (indicadorPagina === 1) {
    desactivarBotonAnteriorPagina();
    indicadorPagina--;
    hacerSolicitud();
    actualizarNumerosIndicadorPagina();
    desactivarPaginaActiva();
    mostrarNumeroPaginaActiva();
  } else {
    indicadorPagina--;
    hacerSolicitud();
    actualizarNumerosIndicadorPagina();
    activarBotonSiguientePagina();
    desactivarPaginaActiva();
    mostrarNumeroPaginaActiva();
  }
});
