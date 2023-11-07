import{ validarIdPokemon } from "../validaciones/validaciones.js";

function probarValidacionIdPokemon() {
	console.assert(
		validarIdPokemon("...") === "Solo acepto números!",
		"validarIdPokemon con caracteres distintos a números no ha funcionado correctamente."
	);
}
probarValidacionIdPokemon();
