const $botonBuscarPokemon = document.querySelector(".boton-buscar-pokemon");
const $botonCerrarDetallesPokemon = document.querySelector(".boton-cerrar-detalles");
const $cartasPokemon = document.querySelectorAll(".carta");

const $botonSiguientePagina = document.querySelector(".boton-siguiente-pagina");
const $botonAnteriorPagina = document.querySelector(".boton-anterior-pagina");

let indicadorPagina = 0;

async function hacerSolicitud() {
  const cantidadPokemonPorPagina = 20;
  let indicadorPokemon = indicadorPagina * cantidadPokemonPorPagina;

  if (indicadorPagina === 0) {
    try {
      const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await respuesta.json();
      gestionarAPI(data);
    } catch (error) {}
  } else {
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${indicadorPokemon}&limit=20`);
      const data = await respuesta.json();
      gestionarAPI(data);
    } catch (error) {}
  }
}
hacerSolicitud();

function gestionarAPI(data) {
  for (let i = 0; i < data.results.length; i++) {
    let urlPokemonABuscar = data.results[i]["url"];
    let indicadorPosicionPokemonEnLista = i;
    gestionarInformacionPokemon(urlPokemonABuscar, indicadorPosicionPokemonEnLista);
  }
}

async function gestionarInformacionPokemon(URL, indicadorPosicionPokemonEnLista) {
  try {
    const respuesta = await fetch(URL);
    const data = await respuesta.json();
    mostrarImagenPokemon(data, indicadorPosicionPokemonEnLista);
    mostrarNombrePokemon(data, indicadorPosicionPokemonEnLista);
    mostrarIdentificacionPokemon(data, indicadorPosicionPokemonEnLista);
    mostrarTiposPokemon(data, indicadorPosicionPokemonEnLista);
  } catch (error) {
    console.error(error);
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

async function buscarPokemonPorId(idPokemon) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    const data = await respuesta.json();
    mostrarCartaPokemonElegido();
    mostrarImagenPokemonElegido(data);
    mostrarIdPokemonElegido(data);
    mostrarNombrePokemonElegido(data);
    mostrarTiposPokemonElegido(data);
    mostrarStatsPokemon(data);
  } catch (error) {
    console.error(error);
  }
}

function mostrarImagenPokemonElegido(dataPokemon) {
  const $imagenPokemonElegido = document.querySelector(".imagen-pokemon-elegido");
  $imagenPokemonElegido.src = dataPokemon.sprites["front_default"];
  $imagenPokemonElegido.alt = `Pokémon ${dataPokemon.name}`;
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

function esconderGrilla() {
  const $grillaPokemon = document.querySelector(".contenedor-grilla");
  $grillaPokemon.id = "oculto";
}

function mostrarGrilla() {
  const $grillaPokemon = document.querySelector(".contenedor-grilla");
  $grillaPokemon.id = "";
}

function esconderCambioPagina() {
  const $contenedorCambioPagina = document.querySelector(".contenedor-cambio-pagina");
  $contenedorCambioPagina.id = "oculto";
}

function mostrarCambioPagina() {
  const $contenedorCambioPagina = document.querySelector(".contenedor-cambio-pagina");
  $contenedorCambioPagina.id = "";
}

function mostrarCartaPokemonElegido() {
  const $cartaPokemonElegido = document.querySelector(".carta-respuesta");
  $cartaPokemonElegido.id = "";
}

function ocultarCartaPokemonElegido() {
  const $cartaPokemonElegido = document.querySelector(".carta-respuesta");
  $cartaPokemonElegido.id = "oculto";
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

$botonBuscarPokemon.addEventListener("click", () => {
  const idPokemonABuscar = document.querySelector(".buscador-pokemon").value;

  let error = validarIdPokemon(idPokemonABuscar);

  if (error !== "") {
    mostrarErrorValidacionBuscador(error);
  } else {
    buscarPokemonPorId(idPokemonABuscar);
    esconderGrilla();
    esconderCambioPagina();
    eliminarErrorValidacion();
  }
});

$botonCerrarDetallesPokemon.addEventListener("click", () => {
  ocultarCartaPokemonElegido();
  mostrarGrilla();
  mostrarCambioPagina();
});

function activarBoton() {
  const $botonesCambiarPagina = document.querySelectorAll(".boton-cambiar-pagina");

  $botonesCambiarPagina.forEach((boton) => {
    if (boton.id !== "") {
      boton.id = "";
      boton.disabled = false;
    }
  });
}

function desactivarBoton(botonADesactivar) {
  botonADesactivar.id = "deshabilitado";
  botonADesactivar.disabled = true;
}

function mostrarIndicadorPagina() {
  const $indicadorPagina = document.querySelector(".indicador-pagina");
  $indicadorPagina.textContent = indicadorPagina + 1;
}

$botonSiguientePagina.addEventListener("click", () => {
  indicadorPagina++;
  hacerSolicitud();
  activarBoton();
  mostrarIndicadorPagina();
});

$botonAnteriorPagina.addEventListener("click", () => {
  if (indicadorPagina === 1) {
    indicadorPagina--;
    hacerSolicitud();
    activarBoton();
    mostrarIndicadorPagina();
    desactivarBoton($botonAnteriorPagina);
  } else {
    indicadorPagina--;
    hacerSolicitud();
    activarBoton();
    mostrarIndicadorPagina();
  }
});

$cartasPokemon.forEach(($carta) => {
  $carta.addEventListener("click", (e) => {
    let elementoClickeado = e.target.className;

    if (elementoClickeado === "imagen-carta") {
      let idPokemonClickeado = e.target.id;
      buscarPokemonPorId(idPokemonClickeado);
      esconderGrilla();
      esconderCambioPagina();
    }
  });
});
