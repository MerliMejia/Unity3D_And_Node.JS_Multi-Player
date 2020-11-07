"use strict";
/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 * @description Este archivo se encargara de aislar diferentes jugadores para poder hacer la comunicacion
 * entre ellos mas facil y eficiente
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Este metodo devuelve verdadero si el tipo de habitacion esta configurado para ser 1VS1
 * @param jugadores Tipo: { jugador1: IJugador; jugador2: IJugador } | Map<String, IJugador>... Que tipo de
 * configuracion o cantidad de jugadores es.
 */
function esUnoVsUno(jugadores) {
    return (jugadores.jugador1 !==
        undefined);
}
/**
 * Esta clase es la clase padre de donde heredaran todas las diferentes habitaciones o modos de juegos
 */
var Habitacion = /** @class */ (function () {
    function Habitacion(tipo) {
        this.jugador1 = null;
        this.jugador2 = null;
        this.jugadores = null;
        if (esUnoVsUno(tipo)) {
            this.config = { modo: '1VS1' };
            this.jugador1 = tipo.jugador1;
            this.jugador2 = tipo.jugador2;
            console.log('HAB 1VS1 CREADA');
        }
        else {
            this.config = { modo: '2VS2' };
            this.jugadores = tipo;
            console.log('HAB 2VS2 CREADA');
        }
    }
    return Habitacion;
}());
/**
 * Esta clase sera la encargada de comunicar los jugadores en el metodo 1VS1
 */
var UnoVsUo = /** @class */ (function (_super) {
    __extends(UnoVsUo, _super);
    function UnoVsUo(jugador1, jugador2) {
        return _super.call(this, { jugador1: jugador1, jugador2: jugador2 }) || this;
    }
    return UnoVsUo;
}(Habitacion));
exports.UnoVsUo = UnoVsUo;
var DosVsDos = /** @class */ (function (_super) {
    __extends(DosVsDos, _super);
    function DosVsDos(jugadores) {
        return _super.call(this, jugadores) || this;
    }
    return DosVsDos;
}(Habitacion));
exports.DosVsDos = DosVsDos;
//# sourceMappingURL=Habitacion.js.map