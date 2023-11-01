/// <reference types="Jest" />

import "jest-localstorage-mock";

import{
	guardarPokemonesEnLocalStorage
} from "../pokedex.js";

describe("pokedex", () => {	
	it("Debería devolver un mensaje de error por no cumplir con ninguna de las condiciones", () => {
		const listaDeArgumentos = [["1", { objetoDePrueba: "valor de prueba" }], [1, "stringDePrueba"]];
	
		for (let i = 0; i < listaDeArgumentos.length; i++) {
			expect(() => {
				guardarPokemonesEnLocalStorage(listaDeArgumentos[i][0], listaDeArgumentos[i][1]);
			}).toThrowError("Se necesita el número de la página a la que pertenece la data, y los pokemones para guardar en el localStorage");
		}
	});

	it("Debería guardar los datos de los pokemones al pasar parámetros correctos", () => {
		const numeroPruebaDePagina = 1;
		const datosDePrueba = {nombre: "Pikachu", tipos: ["electrico"]};

		guardarPokemonesEnLocalStorage(numeroPruebaDePagina, datosDePrueba);

		expect(JSON.parse(localStorage.getItem(`pagina_${numeroPruebaDePagina}`))["nombre"]).toEqual("Pikachu");
		expect(JSON.parse(localStorage.getItem(`pagina_${numeroPruebaDePagina}`))["tipos"][0]).toEqual("electrico");
	});
});
