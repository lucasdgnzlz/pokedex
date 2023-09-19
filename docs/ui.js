import { hacerSolicitud, buscarPokemonEspecifico } from "./pokedex.js";

export async function gestionarPaginas() {
  const numeroPaginaActual = Number(document.querySelector(".active").textContent);
  const indicadorPagina = numeroPaginaActual - 1;
  const cantidadPokemonPorPagina = 20;
  let indicadorPokemon = indicadorPagina * cantidadPokemonPorPagina;

  const data = await hacerSolicitud(indicadorPokemon);
  gestionarAPI(data);
}

function gestionarAPI(data) {
  for (let i = 0; i < data.results.length; i++) {
    let urlPokemonABuscar = data.results[i]["url"];
    let indicadorPosicionPokemonEnLista = i;
    gestionarInformacionPokemon(urlPokemonABuscar, indicadorPosicionPokemonEnLista);
  }
}

async function gestionarInformacionPokemon(URL, indicadorPosicionPokemonEnLista) {
  try {
    const data = await buscarPokemonEspecifico(URL);
    mostrarImagenPokemon(data, indicadorPosicionPokemonEnLista);
    mostrarNombrePokemon(data, indicadorPosicionPokemonEnLista);
    mostrarIdentificacionPokemon(data, indicadorPosicionPokemonEnLista);
    mostrarTiposPokemon(data, indicadorPosicionPokemonEnLista);
  } catch (error) {
    console.error(error);
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
  const $imagenesCartasPokemon = document.querySelectorAll(".imagen-carta");
  $imagenesCartasPokemon[indicadorPosicionPokemonEnLista].src = dataPokemon.sprites["front_default"];
  $imagenesCartasPokemon[indicadorPosicionPokemonEnLista].alt = `Pokémon ${dataPokemon.name}`;
  $imagenesCartasPokemon[indicadorPosicionPokemonEnLista].id = `${dataPokemon.name}`;
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

  const $contenedorTiposPokemon =
    document.querySelectorAll(".contenedor-tipos-pokemon")[indicadorPosicionPokemonEnLista];

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
