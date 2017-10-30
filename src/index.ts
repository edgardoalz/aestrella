import Nodo from './nodo';
import Hoja from './hoja';
import AEstrella from './aestrella';
import {DibujarCamino} from './canvas';

const mochis = new Nodo("mochis", 20, 20);
const topolobamo = new Nodo("topolobampo", 20, 100);
const guasave = new Nodo("guasave", 170, 200);
const culiacan = new Nodo("culiacan", 200, 290);
const mazatlan = new Nodo("mazatlan", 340, 320);
// Asignar hojas
mazatlan.AgregarHojas([culiacan, topolobamo]);
guasave.AgregarHojas([culiacan, mochis]);
culiacan.AgregarHojas([mazatlan, guasave]);
mochis.AgregarHojas([guasave, topolobamo]);
topolobamo.AgregarHojas([mochis, mazatlan]);

const grafo = new AEstrella(mochis, mazatlan);
const final = grafo.EncontrarCamino();
DibujarCamino(final);
console.log(final);
