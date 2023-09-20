export function validarIdPokemon(idPokemon){
  const regex = /^[0-9]+$/i;

  if (!regex.test(idPokemon)) {
    return "Solo acepto números!";
  } else{
    return "";
  }
}
