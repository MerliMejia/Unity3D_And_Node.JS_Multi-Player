"use strict";
/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 * @description Servidor TCP el cual utiliza sockets
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var net = __importStar(require("net"));
var Timer_1 = __importDefault(require("./Utils/Timer"));
var uuid_1 = __importDefault(require("uuid"));
var Habitacion_1 = require("./MM/Habitacion");
var timer = new Timer_1.default();
//Lista de todos los jugadores buscando partida
var buscarPartida = new Map();
//Objeto con los diferentes comandos
var comandos = {
    BUSCAR_PARTIDA: 'BUSCAR_PARTIDA',
};
//Lista de todas las habitaciones 1VS1
var habitacionesUnoVsUno = new Map();
var habitacionesDosVsDos = new Map();
/**
 * @description Creamos un servidor TCP
 * @param socket Referencia al cliente conectado a nuestro servidor
 */
var servidor = net.createServer(function (socket) {
    var id = uuid_1.default();
    var conectado = false;
    //Mandamos mensaje de "conectado" al cliente despues de 5 segundos
    timer.ejecutarDespuesDe(1).then(function () {
        console.log(socket.remoteAddress + " se ha conectado");
        conectado = true;
        socket.write(Buffer.from('conectado', 'utf-8'));
        timer.ejecutarDespuesDe(1).then(function () {
            socket.write(Buffer.from("id: " + id, 'utf-8')); //Enviamos el id al cliente
        });
    });
    /**
     * Recibimos informacion del cliente
     */
    socket.on('data', function (data) {
        if (data.toString() == comandos.BUSCAR_PARTIDA) {
            console.log(id + " esta buscando partida");
            buscarPartida.set(id, { id: id, conexion: socket }); //Agregamos el jugador a la lista de espera
        }
    });
    //Ejecuta algo cuando el cliente se desconecta
    socket.on('close', function () {
        console.log('DESCONECTADO');
    });
});
var PUERTO = 8080; //Puerto en el cual correra el servidor
//Pone nuestro servidor a escuchar peticiones en un puerto especifico
servidor.listen(PUERTO, function () {
    console.log('CORRIENDO EN EL PUERTO ' + PUERTO);
    console.log('Esperando jugadores que busquen partida...');
    var busquedaTimer = new Timer_1.default(function () {
        //se ejecuta 60 veces cada segundo
        if (buscarPartida.size >= 2) {
            var jugadores_1 = [];
            buscarPartida.forEach(function (j) {
                jugadores_1.push(j);
            });
            habitacionesUnoVsUno.set(jugadores_1[0].id + jugadores_1[1].id, new Habitacion_1.UnoVsUo(jugadores_1[0], jugadores_1[1]));
            console.log("Habitacion creada " + jugadores_1[0].id + jugadores_1[1].id);
            buscarPartida.delete(jugadores_1[0].id);
            buscarPartida.delete(jugadores_1[1].id);
        }
        // if (buscarPartida.size >= 4) {
        //   let jugadores: Map<String, IJugador> = new Map<String, IJugador>();
        //   buscarPartida.forEach((j) => {
        //     jugadores.set(j.id, j);
        //   });
        //   let habId = uuid();
        //   habitacionesDosVsDos.set(habId, new DosVsDos(jugadores));
        //   jugadores.forEach((v, k) => {
        //     buscarPartida.delete(v.id);
        //   });
        // }
    });
});
//# sourceMappingURL=Server.js.map