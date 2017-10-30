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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nodo_1 = __webpack_require__(1);
var aestrella_1 = __webpack_require__(3);
var mazatlan = new nodo_1.default("mazatlan", 90, 120);
var guasave = new nodo_1.default("guasave", 20, 50);
var culiacan = new nodo_1.default("culiacan", 50, 70);
var mochis = new nodo_1.default("mochis", 10, 20);
// Asignar hojas
mazatlan.AgregarHojas([culiacan]);
guasave.AgregarHojas([culiacan, mochis]);
culiacan.AgregarHojas([mazatlan, guasave]);
mochis.AgregarHojas([guasave]);
var grafo = new aestrella_1.default(mochis, mazatlan);
console.log(grafo);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hoja_1 = __webpack_require__(2);
var Nodo = /** @class */ (function () {
    function Nodo(nombre, x, y, nodos, objetivo) {
        if (nodos === void 0) { nodos = []; }
        this.x = x;
        this.y = y;
        this.Nombre = nombre;
        this.AgregarHojas(nodos);
        this.AsignarObjetivo(objetivo);
    }
    Nodo.prototype.AgregarHojas = function (nodos) {
        var _this = this;
        nodos.forEach(function (nodo) { return _this.AgregarHoja(nodo); });
    };
    Nodo.prototype.AgregarHoja = function (nodo) {
        this.Hojas.push(hoja_1.CrearHoja(this, nodo));
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
        if ((!this.Objetivo && nodo) || (nodo && this.Objetivo.nodo.Nombre != nodo.Nombre)) {
            this.Objetivo = hoja_1.CrearHoja(this, nodo);
            this.Hojas.forEach(function (hoja) { return hoja.nodo.AsignarObjetivo(nodo); });
        }
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Distancia = function (a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};
exports.CrearHoja = function (a, b) {
    return { nodo: b, distancia: exports.Distancia(a, b) };
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AEstrella = /** @class */ (function () {
    function AEstrella(origen, objetivo) {
        this.abiertos = [];
        this.cerrados = [];
        this.Origen = origen;
        this.Objetivo = objetivo;
    }
    Object.defineProperty(AEstrella.prototype, "Origen", {
        get: function () {
            return this.origen;
        },
        set: function (nodo) {
            this.origen = nodo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AEstrella.prototype, "Objetivo", {
        get: function () {
            return this.objetivo;
        },
        set: function (nodo) {
            if (!this.objetivo || this.objetivo.Nombre != nodo.Nombre) {
                this.objetivo = nodo;
                this.Origen.AsignarObjetivo(this.objetivo);
            }
        },
        enumerable: true,
        configurable: true
    });
    return AEstrella;
}());
exports.default = AEstrella;


/***/ })
/******/ ]);