import Hoja, { Distancia, CrearHoja } from './hoja';
import {DibujarNodo} from './canvas';

export default class Nodo {
    private hojas: Hoja[];
    private objetivo: Hoja;
    private nombre: String;
    constructor (nombre: String, public x: number, public y: number, 
        nodos: Nodo[] = [], objetivo?: Nodo) {
        this.Nombre = nombre;
        this.AgregarHojas(nodos);
        this.AsignarObjetivo(objetivo);
        DibujarNodo(this);
    }

    AgregarHojas (nodos: Nodo[]) {
        nodos.forEach(nodo => this.AgregarHoja(nodo));
    }

    AgregarHoja (nodo: Nodo) {
        this.Hojas.push(CrearHoja(this, nodo, true));
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
        if ((!this.Objetivo && nodo) || 
        (nodo && this.Objetivo.Nodo.Nombre != nodo.Nombre)) {
            this.Objetivo = CrearHoja(this, nodo);
            this.AgregarALista();
            this.Hojas.forEach(hoja => hoja.Nodo.AsignarObjetivo(nodo));
        }
    }

    AgregarALista() {
        var span = document.createElement("tr");
        span.innerHTML = `<td>${this.Nombre}</td><td>${this.Objetivo.Distancia.toFixed(0)}</td>`;
        document.getElementById("heuristicas").appendChild(span);
    }

    set Objetivo (valor : Hoja) {
        this.objetivo = valor;
    }

    get Objetivo (): Hoja {
        return this.objetivo;
    }

}