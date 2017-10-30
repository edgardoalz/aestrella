import Nodo from './nodo';
import Hoja from './hoja';
import AEstrella from './aestrella';

const mochis = new Nodo("Los Mochis", 20, 20);
const topolobamo = new Nodo("Topolobampo", 20, 100);
const guasave = new Nodo("Guasave", 170, 200);
const culiacan = new Nodo("Culiacan", 200, 290);
const mazatlan = new Nodo("Mazatlan", 340, 320);
// Asignar hojas
mazatlan.AgregarHojas([culiacan, topolobamo]);
guasave.AgregarHojas([culiacan, mochis]);
culiacan.AgregarHojas([mazatlan, guasave]);
mochis.AgregarHojas([guasave, topolobamo]);
topolobamo.AgregarHojas([mochis, mazatlan]);

const grafo = new AEstrella(mochis, mazatlan);
const final = grafo.EncontrarCamino();
console.log(grafo);
console.log(final);
