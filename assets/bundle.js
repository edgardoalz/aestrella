/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = __webpack_require__(1);
exports.Distancia = function (a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};
exports.CrearHoja = function (a, b, directo) {
    if (directo === void 0) { directo = false; }
    if (directo) {
        canvas_1.DibujarLinea(a, b);
    }
    return { Nodo: b, Distancia: exports.Distancia(a, b) };
};
exports.G = function (hoja) { return hoja.Coste; };
exports.H = function (hoja) { return hoja.Nodo.Objetivo.Distancia; };
exports.F = function (hoja) { return exports.G(hoja) + exports.H(hoja); };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hoja_1 = __webpack_require__(0);
var canvas = document.getElementById("plano");
var ctx = canvas.getContext("2d");
ctx.font = "12px Arial";
var negro = "#333333";
var azul = "#0000FF";
var verde = "#00FF00";
var rojo = "#FF0000";
exports.DibujarNodo = function (nodo, color) {
    ctx.beginPath();
    ctx.fillStyle = rojo;
    ctx.fillText(nodo.Nombre, nodo.x + 7, nodo.y + 3);
    ctx.fillStyle = color || negro;
    ctx.arc(nodo.x, nodo.y, 5, 0, 2 * Math.PI);
    ctx.fill();
};
exports.DibujarLinea = function (a, b, color) {
    var distancia = hoja_1.Distancia(a, b);
    ctx.beginPath();
    ctx.fillStyle = verde;
    ctx.fillText(distancia.toFixed(0), ((a.x + b.x) / 2) + 7, ((a.y + b.y) / 2) + 3);
    ctx.fill();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = color || negro;
    ctx.stroke();
};
exports.DibujarCamino = function (hoja) {
    exports.DibujarNodo(hoja.Nodo, azul);
    if (hoja.Padre) {
        exports.DibujarLinea(hoja.Nodo, hoja.Padre.Nodo, azul);
        exports.DibujarCamino(hoja.Padre);
    }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nodo_1 = __webpack_require__(3);
var aestrella_1 = __webpack_require__(4);
var mochis = new nodo_1.default("Los Mochis", 20, 20);
var topolobamo = new nodo_1.default("Topolobampo", 20, 100);
var guasave = new nodo_1.default("Guasave", 170, 200);
var culiacan = new nodo_1.default("Culiacan", 200, 290);
var mazatlan = new nodo_1.default("Mazatlan", 340, 320);
// Asignar hojas
mazatlan.AgregarHojas([culiacan, topolobamo]);
guasave.AgregarHojas([culiacan, mochis]);
culiacan.AgregarHojas([mazatlan, guasave]);
mochis.AgregarHojas([guasave, topolobamo]);
topolobamo.AgregarHojas([mochis, mazatlan]);
var grafo = new aestrella_1.default(mochis, mazatlan);
var final = grafo.EncontrarCamino();
console.log(grafo);
console.log(final);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hoja_1 = __webpack_require__(0);
var canvas_1 = __webpack_require__(1);
var Nodo = /** @class */ (function () {
    function Nodo(nombre, x, y, nodos, objetivo) {
        if (nodos === void 0) { nodos = []; }
        this.x = x;
        this.y = y;
        this.Nombre = nombre;
        this.AgregarHojas(nodos);
        this.AsignarObjetivo(objetivo);
        canvas_1.DibujarNodo(this);
    }
    Nodo.prototype.AgregarHojas = function (nodos) {
        var _this = this;
        nodos.forEach(function (nodo) { return _this.AgregarHoja(nodo); });
    };
    Nodo.prototype.AgregarHoja = function (nodo) {
        this.Hojas.push(hoja_1.CrearHoja(this, nodo, true));
    };
    Object.defineProperty(Nodo.prototype, "Hojas", {
        get: function () {
            if (!this.hojas) {
                this.hojas = [];
            }
            return this.hojas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Nodo.prototype, "Nombre", {
        get: function () {
            return this.nombre;
        },
        set: function (valor) {
            this.nombre = valor;
        },
        enumerable: true,
        configurable: true
    });
    Nodo.prototype.AsignarObjetivo = function (nodo) {
        if ((!this.Objetivo && nodo) ||
            (nodo && this.Objetivo.Nodo.Nombre != nodo.Nombre)) {
            this.Objetivo = hoja_1.CrearHoja(this, nodo);
            this.AgregarALista();
            this.Hojas.forEach(function (hoja) { return hoja.Nodo.AsignarObjetivo(nodo); });
        }
    };
    Nodo.prototype.AgregarALista = function () {
        var span = document.createElement("tr");
        span.innerHTML = "<td>" + this.Nombre + "</td><td>" + this.Objetivo.Distancia.toFixed(0) + "</td>";
        document.getElementById("heuristicas").appendChild(span);
    };
    Object.defineProperty(Nodo.prototype, "Objetivo", {
        get: function () {
            return this.objetivo;
        },
        set: function (valor) {
            this.objetivo = valor;
        },
        enumerable: true,
        configurable: true
    });
    return Nodo;
}());
exports.default = Nodo;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hoja_1 = __webpack_require__(0);
var canvas_1 = __webpack_require__(1);
var AEstrella = /** @class */ (function () {
    function AEstrella(origen, objetivo) {
        this.abiertos = [];
        this.cerrados = [];
        this.AsignarOrigen(origen);
        this.AsignarObjetivo(objetivo);
    }
    Object.defineProperty(AEstrella.prototype, "Origen", {
        get: function () {
            return this.origen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AEstrella.prototype, "Objetivo", {
        get: function () {
            return this.objetivo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AEstrella.prototype, "Abiertos", {
        get: function () {
            return this.abiertos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AEstrella.prototype, "Cerrados", {
        get: function () {
            return this.cerrados;
        },
        enumerable: true,
        configurable: true
    });
    AEstrella.prototype.AsignarOrigen = function (nodo) {
        this.origen = hoja_1.CrearHoja(nodo, nodo);
        var span = document.createElement("p");
        span.innerHTML = "<b>Origen:</b> " + this.Origen.Nodo.Nombre;
        document.getElementById("datos").appendChild(span);
    };
    AEstrella.prototype.EncontrarCamino = function () {
        var _this = this;
        var destino = null;
        var actual = null;
        this.Origen.Coste = this.Origen.Distancia;
        this.Abiertos.push(this.Origen);
        while (!destino || destino.Nodo.Nombre !== this.Objetivo.Nodo.Nombre) {
            if (!this.Abiertos.length) {
                throw "La cola de abiertos esta vacia";
            }
            else {
                actual = this.HojaMenorCoste();
                this.Cerrados.push(actual);
                if (actual.Nodo.Nombre == this.Objetivo.Nodo.Nombre) {
                    destino = actual;
                }
                else {
                    actual.Nodo.Hojas.forEach(function (hoja) {
                        hoja.Coste = actual.Coste + hoja.Distancia;
                        if (!_this.EsHojaAbierta(hoja) && !_this.EsHojaCerrada(hoja)) {
                            hoja.Padre = actual;
                            _this.Abiertos.push(hoja);
                        }
                    });
                }
            }
        }
        canvas_1.DibujarCamino(destino);
        return destino;
    };
    AEstrella.prototype.HojaMenorCoste = function () {
        var hoja = this.Abiertos.reduce(function (anterior, hoja, index) {
            if (!anterior.hoja || hoja_1.F(hoja) < hoja_1.F(anterior.hoja)) {
                return { index: index, hoja: hoja };
            }
            else {
                return anterior;
            }
        }, { index: -1, hoja: null });
        return this.Abiertos.splice(hoja.index, 1)[0];
    };
    AEstrella.prototype.EsHojaAbierta = function (hoja) {
        return this.Abiertos.some(function (abierto) { return hoja.Nodo.Nombre == abierto.Nodo.Nombre; });
    };
    AEstrella.prototype.EsHojaCerrada = function (hoja) {
        return this.Cerrados.some(function (cerrado) { return hoja.Nodo.Nombre == cerrado.Nodo.Nombre; });
    };
    AEstrella.prototype.AsignarObjetivo = function (nodo) {
        if (!this.objetivo || this.objetivo.Nodo.Nombre != nodo.Nombre) {
            this.objetivo = hoja_1.CrearHoja(this.Origen.Nodo, nodo);
            this.Origen.Nodo.AsignarObjetivo(this.objetivo.Nodo);
            var span = document.createElement("p");
            span.innerHTML = "<b>Destino:</b> " + this.Objetivo.Nodo.Nombre;
            document.getElementById("datos").appendChild(span);
        }
    };
    return AEstrella;
}());
exports.default = AEstrella;


/***/ })
/******/ ]);