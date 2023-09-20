export async function hacerSolicitud(indicadorPokemon) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${indicadorPokemon}&limit=20`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function buscarPokemonEspecifico(idPokemon) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
