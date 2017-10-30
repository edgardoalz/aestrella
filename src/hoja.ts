import Nodo from './nodo';

export default interface Hoja {
    Nodo: Nodo;
    Distancia: number;
    Camino?: number;
}

export const Distancia = (a: Nodo, b: Nodo): number => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export const CrearHoja = (a: Nodo, b: Nodo): Hoja => {
    return {Nodo: b, Distancia: Distancia(a, b)}
}