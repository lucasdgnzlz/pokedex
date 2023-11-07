export function mostrarImagenPokemon(dataPokemon, indicadorPosicionPokemonEnLista) {
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

export function mostrarNombrePokemon(dataPokemon, indicadorPosicionPokemonEnLista) {
	const $titulosCartasPokemon = document.querySelectorAll(".nombre-pokemon");
	$titulosCartasPokemon[indicadorPosicionPokemonEnLista].textContent = dataPokemon.name;
}

export function mostrarIdentificacionPokemon(dataPokemon, indicadorPosicionPokemonEnLista) {
	const $numeroIdentificacionPokemon = document.querySelectorAll(".numero-identificacion-pokemon");
	$numeroIdentificacionPokemon[indicadorPosicionPokemonEnLista].textContent = `# ${dataPokemon.id}`;
}

export function mostrarTiposPokemon(dataPokemon, indicadorPosicionPokemonEnLista) {
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

export function mostrarImagenPokemonElegido(dataPokemon) {
	const $imagenPokemonElegido = document.querySelector(".imagen-pokemon-elegido");

	if(typeof dataPokemon.sprites === "string"){
		$imagenPokemonElegido.src = dataPokemon.sprites;
		$imagenPokemonElegido.alt = `Pokémon ${dataPokemon.name}`;
	} else{
		$imagenPokemonElegido.src = dataPokemon.sprites["front_default"];
		$imagenPokemonElegido.alt = `Pokémon ${dataPokemon.name}`;
	}
}

export function mostrarIdPokemonElegido(dataPokemon) {
	const $idPokemonElegido = document.querySelector(".id-pokemon-elegido");
	$idPokemonElegido.textContent = `# ${dataPokemon.id}`;
}

export function mostrarNombrePokemonElegido(dataPokemon) {
	const $nombrePokemonElegido = document.querySelector(".nombre-pokemon-elegido");
	$nombrePokemonElegido.textContent = dataPokemon.name;
}

export function mostrarTiposPokemonElegido(dataPokemon) {
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

export function mostrarStatsPokemon(dataPokemon) {
	let vidaPokemon = dataPokemon.stats["0"]["base_stat"];
	let ataquePokemon = dataPokemon.stats["1"]["base_stat"];
	let defensaPokemon = dataPokemon.stats["2"]["base_stat"];
	let ataqueEspecialPokemon = dataPokemon.stats["3"]["base_stat"];
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
