import Hoja, { Distancia, CrearHoja } from './hoja';
import Nodo from './nodo';

export default class AEstrella {
    private abiertos: Hoja[] = []; 
    private cerrados: Hoja[] = [];
    private origen: Hoja;
    private objetivo: Hoja;
    constructor (origen: Nodo, objetivo: Nodo) {
        this.AsignarOrigen(origen);
        this.AsignarObjetivo(objetivo);
    }

    AsignarOrigen (nodo: Nodo) {
        this.origen = CrearHoja(nodo, nodo);
    }

    get Origen () {
        return this.origen;
    }

    get Objetivo () {
        return this.objetivo;
    }

    EncontrarCamino () {
        this.Origen.Nodo.Hojas.forEach(hoja => {
            hoja.Camino = hoja.Distancia;
            this.abiertos.push(hoja);
        });
        console.log(this);
    }

    AsignarObjetivo (nodo: Nodo) {
        if (!this.objetivo || this.objetivo.Nodo.Nombre != nodo.Nombre) {
            this.objetivo = CrearHoja(this.Origen.Nodo, nodo);
            this.Origen.Nodo.AsignarObjetivo(this.objetivo.Nodo);
        }
    }
}