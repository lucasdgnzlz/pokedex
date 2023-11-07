/// <reference types="Jest" />

import { validarIdPokemon } from "../validaciones.js";

describe(("validarIdPokemon"), () => {
	it(("Debería devolver un texto indicando que solo se aceptan números"), () => {
		const ID_DE_PRUEBA = "e";

		expect(validarIdPokemon(ID_DE_PRUEBA)).toBe("Solo acepto números!");
	});

	it(("Debería devolver un texto vacío dando a indicar que cumple la validación"), () => {
		const ID_DE_PRUEBA = 321;

		expect(validarIdPokemon(ID_DE_PRUEBA)).toBe("");
	});
});
