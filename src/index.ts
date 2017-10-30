import Nodo from './nodo';
import AEstrella from './aestrella';

const mazatlan = new Nodo("mazatlan", 90, 120);
const guasave = new Nodo("guasave", 20, 50);
const culiacan = new Nodo("culiacan", 50, 70);
const mochis = new Nodo("mochis", 10, 20);
// Asignar hojas
mazatlan.AgregarHojas([culiacan]);
guasave.AgregarHojas([culiacan, mochis]);
culiacan.AgregarHojas([mazatlan, guasave]);
mochis.AgregarHojas([guasave]);

const grafo = new AEstrella(mochis, mazatlan);

grafo.EncontrarCamino();
