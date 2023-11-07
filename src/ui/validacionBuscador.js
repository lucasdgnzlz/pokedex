export function mostrarErrorValidacionBuscador(error) {
	const $buscadorPokemon = document.querySelector(".buscador-pokemon");
	$buscadorPokemon.classList.add("is-invalid");
	$buscadorPokemon.placeholder = error;
	$buscadorPokemon.id = "error-validacion";
}

export function eliminarErrorValidacion() {
	const $buscadorPokemon = document.querySelector(".buscador-pokemon");
	$buscadorPokemon.classList.remove("is-invalid");
	$buscadorPokemon.placeholder = "Seleccione un Pokémon!";
	$buscadorPokemon.id = "";
}