"use strict";
/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 * @description Esta clase se encargara de todo lo que tiene que ver con tiempo
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Timer = /** @class */ (function () {
    function Timer(ejecutar, intervalo) {
        this.intervalo = 60; //Cantidad de veces que repetimos una accion por segundos
        if (intervalo !== undefined)
            this.intervalo = intervalo;
        if (ejecutar !== undefined)
            this.empezar(ejecutar);
    }
    /**
     * Este metodo comienza el setInterval
     * @param ejecutar Funcion a ejecutar cada x intervalo
     */
    Timer.prototype.empezar = function (ejecutar) {
        this.si = setInterval(function () {
            ejecutar();
        }, 1000 / this.intervalo);
    };
    /**
     * Detiene el setInterval
     */
    Timer.prototype.parar = function () {
        clearInterval(this.si);
    };
    /**
     * Este metodo ejecuta algo despues de un tiempo especificado
     * @param tiempo Tiempo a esperar en segundos
     * @param callback (Opcional) se ejecuta despues del tiempo especificado pero antes de resolver el Promise
     */
    Timer.prototype.ejecutarDespuesDe = function (tiempo, callback) {
        return new Promise(function (res, rej) {
            var intervalo = setInterval(function () {
                callback !== undefined ? callback() : null;
                res();
                clearInterval(intervalo);
            }, 1000 * tiempo);
        });
    };
    return Timer;
}());
exports.default = Timer;
//# sourceMappingURL=Timer.js.map