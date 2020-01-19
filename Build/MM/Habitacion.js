"use strict";
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
function esUnoVsUno(jugadores) {
    return jugadores == undefined;
}
var Habitacion = /** @class */ (function () {
    function Habitacion(tipo) {
        this.jugador1 = null;
        this.jugador2 = null;
        this.jugadores = null;
        if (esUnoVsUno(tipo)) {
            this.config = { modo: "1VS1" };
            this.jugador1 = tipo.jugador1;
            this.jugador2 = tipo.jugador2;
        }
        else {
            this.config = { modo: "2VS2" };
            this.jugadores = tipo;
        }
    }
    return Habitacion;
}());
var UnoVsUo = /** @class */ (function (_super) {
    __extends(UnoVsUo, _super);
    function UnoVsUo(jugador1, jugador2) {
        return _super.call(this, { jugador1: jugador1, jugador2: jugador2 }) || this;
    }
    return UnoVsUo;
}(Habitacion));
exports.UnoVsUo = UnoVsUo;
//# sourceMappingURL=Habitacion.js.map