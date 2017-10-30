import Nodo from './nodo';
import Hoja from './hoja';

var canvas = <HTMLCanvasElement> document.getElementById("plano");
var ctx = canvas.getContext("2d");
ctx.font = "12px Arial";
var negro = "#333333";
var azul = "#0000FF";
var rojo = "#FF0000";

export var DibujarNodo = (nodo: Nodo, color?: string) => {
    ctx.beginPath();
    ctx.fillStyle = rojo;
    ctx.fillText(<string> nodo.Nombre, nodo.x+7, nodo.y+3);
    ctx.fillStyle = color || negro;
    ctx.arc(nodo.x, nodo.y, 5, 0, 2*Math.PI);
    ctx.fill();
};

export var DibujarLinea = (a: Nodo, b: Nodo, color?: string) => {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = color || negro;
    ctx.stroke();
}

export var DibujarCamino = (hoja: Hoja) => {
    DibujarNodo(hoja.Nodo, azul);
    if (hoja.Padre) {
        DibujarLinea(hoja.Nodo, hoja.Padre.Nodo, azul);
        DibujarCamino(hoja.Padre);
    }
}