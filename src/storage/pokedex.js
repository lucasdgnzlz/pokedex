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

export function guardarDataPokemonEnLocalStorage(data){
	let dataPokemon = {
		"name": data.name,
		"id": data.id,
		"types": data.types,
		"sprites": data.sprites["front_default"],
		"stats": data.stats
	};

	localStorage.setItem(`pokemon_${data.id}`, JSON.stringify(dataPokemon));
}

export function cargarDataPokemonDeLocalStorage(idPokemon){
	if(idPokemon === undefined){
		throw new Error("Se necesita un identificador para cargar el pokémon correspondiente");
	}

	const dataPokemon = JSON.parse(localStorage.getItem(`pokemon_${idPokemon}`));

	if(dataPokemon === null){
		throw new Error(`Pokémon #${idPokemon} no se encontró en el localStorage`);
	}

	return dataPokemon;
}