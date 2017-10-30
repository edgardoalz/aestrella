import Hoja, { Distancia, CrearHoja, F } from './hoja';
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

    get Origen (): Hoja {
        return this.origen;
    }

    get Objetivo (): Hoja {
        return this.objetivo;
    }

    get Abiertos (): Hoja[] {
        return this.abiertos;
    }

    get Cerrados (): Hoja[] {
        return this.cerrados;
    }

    AsignarOrigen (nodo: Nodo) {
        this.origen = CrearHoja(nodo, nodo);
    }

    EncontrarCamino (): Hoja {
        var destino: Hoja = null;
        var actual: Hoja = null;
        this.Origen.Coste = this.Origen.Distancia;
        this.Abiertos.push(this.Origen);
        while (!destino || destino.Nodo.Nombre !== this.Objetivo.Nodo.Nombre) {
            if (!this.Abiertos.length) {
                throw "La cola de abiertos esta vacia";
            } else {
                actual = this.HojaMenorCoste();
                this.Cerrados.push(actual);
                if (actual.Nodo.Nombre == this.Objetivo.Nodo.Nombre) {
                    destino = actual;
                } else {
                    actual.Nodo.Hojas.forEach(hoja => {
                        hoja.Coste = actual.Coste + hoja.Distancia;
                        if (!this.EsHojaAbierta(hoja) && !this.EsHojaCerrada(hoja)) {
                            hoja.Padre = actual;
                            this.Abiertos.push(hoja);
                        }
                    });
                }
            }
        }

        return destino;
    }

    HojaMenorCoste (): Hoja {
        var hoja = this.Abiertos.reduce((anterior, hoja, index) => {
            if (!anterior.hoja || F(hoja) < F(anterior.hoja)) {
                return {index: index, hoja: hoja};
            } else {
                return anterior;
            }
        }, {index: -1, hoja: null});
        return this.Abiertos.splice(hoja.index, 1)[0];
    }

    EsHojaAbierta (hoja: Hoja): Boolean {
        return this.Abiertos.some(
            abierto => hoja.Nodo.Nombre == abierto.Nodo.Nombre
        );
    }

    EsHojaCerrada (hoja: Hoja): Boolean {
        return this.Cerrados.some(
            cerrado => hoja.Nodo.Nombre == cerrado.Nodo.Nombre
        );
    }

    AsignarObjetivo (nodo: Nodo) {
        if (!this.objetivo || this.objetivo.Nodo.Nombre != nodo.Nombre) {
            this.objetivo = CrearHoja(this.Origen.Nodo, nodo);
            this.Origen.Nodo.AsignarObjetivo(this.objetivo.Nodo);
        }
    }
}