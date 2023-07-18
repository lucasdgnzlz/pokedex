// Con funciones asincrónicas

async function hacerSolicitud() {
  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await respuesta.json();
    console.log(data.results); // Imprime la información general de los primeros 20 pokémon
    gestionarAPI(data);
  } catch (error) {}
}
hacerSolicitud();

function gestionarAPI(data) {
  for (let i = 0; i < data.results.length; i++) {
    let urlPokemonABuscar = data.results[i]["url"];
    gestionarInformacionPokemon(urlPokemonABuscar);
  }
}

async function gestionarInformacionPokemon(URL) {
  try {
    const respuesta = await fetch(URL);
    const data = await respuesta.json();
    console.log(data); // Imprime información del pokémon correspondiente
    mostrarImagenPokemon(data);
    mostrarNombrePokemon(data);
    mostrarIdentificacionPokemon(data);
    mostrarTiposPokemon(data);
  } catch (error) {
    console.error(error);
  }
}

function mostrarImagenPokemon(dataPokemon) {
  let indicadorCartaPokemon = dataPokemon.id - 1;

  const $imagenesCartasPokemon = document.querySelectorAll(".imagen-carta");
  $imagenesCartasPokemon[indicadorCartaPokemon].src = dataPokemon.sprites["front_default"];
  $imagenesCartasPokemon[indicadorCartaPokemon].alt = `Pokémon ${dataPokemon.name}`;
}

function mostrarNombrePokemon(dataPokemon) {
  let indicadorCartaPokemon = dataPokemon.id - 1;

  const $titulosCartasPokemon = document.querySelectorAll(".nombre-pokemon");
  $titulosCartasPokemon[indicadorCartaPokemon].textContent = dataPokemon.name;
}

function mostrarIdentificacionPokemon(dataPokemon) {
  let indicadorCartaPokemon = dataPokemon.id - 1;

  const $numeroIdentificacionPokemon = document.querySelectorAll(".numero-identificacion-pokemon");
  $numeroIdentificacionPokemon[indicadorCartaPokemon].textContent = `# ${dataPokemon.id}`;
}

function mostrarTiposPokemon(dataPokemon) {
  let indicadorCartaPokemon = dataPokemon.id - 1;
  const cantidadTiposPokemon = dataPokemon.types.length;

  console.log(dataPokemon.types);
  console.log(cantidadTiposPokemon);

  const $contenedorTiposPokemon = document.querySelectorAll(".contenedor-tipos-pokemon")[indicadorCartaPokemon];
  console.log($contenedorTiposPokemon);
  console.log($contenedorTiposPokemon.children);

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
