export function guardarPokemonesEnLocalStorage(paginaPokemon, dataPokemon){
	localStorage.setItem(`pagina_${paginaPokemon}`, JSON.stringify(dataPokemon));
}

export function cargarPokemonesDeLocalStorage(numeroPaginaActual){
	if(numeroPaginaActual === undefined){
		throw new Error("Se necesita una cantidad y un indicador de página para cargar a los pokemones");
	}

	const pokemones = JSON.parse(localStorage.getItem(`pagina_${numeroPaginaActual}`));

	if(pokemones === null){
		throw new Error(`Pagina ${numeroPaginaActual} de Pokemones no se encontró en el localStorage`);
	}

	return pokemones;
}
