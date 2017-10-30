import Nodo from './nodo';
import {DibujarLinea} from './canvas';

export default interface Hoja {
    Nodo: Nodo;
    Distancia: number;
    Padre?: Hoja;
    Coste?: number;
}

export const Distancia = (a: Nodo, b: Nodo): number => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export const CrearHoja = (a: Nodo, b: Nodo, directo: Boolean = false): Hoja => {
    if (directo) {
        DibujarLinea(a, b);
    }
    return {Nodo: b, Distancia: Distancia(a, b)}
}

export const G = (hoja: Hoja): number => { 
    return hoja.Coste;
}

export const H = (hoja: Hoja): number => { 
    return hoja.Nodo.Objetivo.Distancia;
}

export const F = (hoja: Hoja): number => {
    return G(hoja) + H(hoja);
}