const $botonSiguientePagina = document.querySelector(".boton-siguiente-pagina");
const $botonAnteriorPagina = document.querySelector(".boton-anterior-pagina");

let indicadorPágina = 1;

async function hacerSolicitud() {
  const cantidadPokemonPorPagina = 20;
  let indicadorPokemon = indicadorPágina * cantidadPokemonPorPagina;
  
  if (indicadorPágina === 1) {
    try {
      const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await respuesta.json();
      console.log(data); // Imprime la información general de los primeros 20 pokémon
      gestionarAPI(data);
    } catch (error) {}
  } else {
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${indicadorPokemon}&limit=20`);
      const data = await respuesta.json();
      console.log(data); // Imprime la información general de los primeros 20 pokémon
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
    // console.log(data); // Imprime información del pokémon correspondiente
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
    $primerImagenTipoPokemon.src = `../img/${dataPokemon.types["0"]["type"]["name"]}.svg`;

    const $segundaImagenTipoPokemon = $contenedorTiposPokemon.children[1].children[0];
    $segundaImagenTipoPokemon.id = "oculto";
  } else {
    const $primerImagenTipoPokemon = $contenedorTiposPokemon.children[0].children[0];
    const $segundaImagenTipoPokemon = $contenedorTiposPokemon.children[1].children[0];

    $primerImagenTipoPokemon.src = `../img/${dataPokemon.types["0"]["type"]["name"]}.svg`;
    $segundaImagenTipoPokemon.src = `../img/${dataPokemon.types["1"]["type"]["name"]}.svg`;
  }
}

function activarBoton(){
  const $botonesCambiarPagina = document.querySelectorAll (".boton-cambiar-pagina");

  $botonesCambiarPagina.forEach((boton) => {
    if(boton.id !== ""){
      boton.id = "";
    }
  })
}

$botonSiguientePagina.addEventListener("click", () => {
  indicadorPágina++;
  hacerSolicitud();
  activarBoton();
});
