import Hoja, { Distancia, CrearHoja } from './hoja';

export default class Nodo {
    private hojas: Hoja[];
    private objetivo: Hoja;
    private nombre: String;
    constructor (nombre: String, public x: number, public y: number, 
        nodos: Nodo[] = [], objetivo?: Nodo) {
        this.Nombre = nombre;
        this.AgregarHojas(nodos);
        this.AsignarObjetivo(objetivo);
    }

    AgregarHojas (nodos: Nodo[]) {
        nodos.forEach(nodo => this.AgregarHoja(nodo));
    }

    AgregarHoja (nodo: Nodo) {
        this.Hojas.push(CrearHoja(this, nodo));
    }

    get Hojas (): Hoja[] {
        if (!this.hojas) {
            this.hojas = [];
        }
        return this.hojas;
    }

    set Nombre (valor: String) {
        this.nombre = valor;
    }

    get Nombre (): String {
        return this.nombre;
    }

    AsignarObjetivo (nodo: Nodo) {
        if ((!this.Objetivo && nodo) || (nodo && this.Objetivo.Nodo.Nombre != nodo.Nombre)) {
            this.Objetivo = CrearHoja(this, nodo);
            this.Hojas.forEach(hoja => hoja.Nodo.AsignarObjetivo(nodo));
        }
    }

    set Objetivo (valor : Hoja) {
        this.objetivo = valor;
    }

    get Objetivo (): Hoja {
        return this.objetivo;
    }

}