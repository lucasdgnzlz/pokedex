export const URL_BASE = "https://pokeapi.co/api/v2/pokemon";
export const LIMITE_POKEMONES = 20;

export async function hacerSolicitud(indicadorPokemon) {
	try {
		const respuesta = await fetch(`${URL_BASE}?offset=${indicadorPokemon}&limit=${LIMITE_POKEMONES}`);
		const data = await respuesta.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function buscarPokemonEspecifico(idPokemon) {
	try {
		const respuesta = await fetch(`${URL_BASE}/${idPokemon}`);
		const data = await respuesta.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
