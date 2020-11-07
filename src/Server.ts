/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 * @description Servidor TCP el cual utiliza sockets
 */

import * as net from 'net';
import Timer from './Utils/Timer';
import uuid from 'uuid';
import { DosVsDos, UnoVsUo } from './MM/Habitacion';

let timer: Timer = new Timer();

//Interfaz de jugadores
export interface IJugador {
  id: string;
  conexion: net.Socket;
}

//Lista de todos los jugadores buscando partida
let buscarPartida: Map<String, IJugador> = new Map<String, IJugador>();
//Objeto con los diferentes comandos
let comandos = {
  BUSCAR_PARTIDA: 'BUSCAR_PARTIDA',
};

//Lista de todas las habitaciones 1VS1
let habitacionesUnoVsUno: Map<string, UnoVsUo> = new Map<string, UnoVsUo>();

let habitacionesDosVsDos: Map<string, DosVsDos> = new Map<string, DosVsDos>();

/**
 * @description Creamos un servidor TCP
 * @param socket Referencia al cliente conectado a nuestro servidor
 */
let servidor = net.createServer((socket) => {
  let id = uuid();
  let conectado = false;

  //Mandamos mensaje de "conectado" al cliente despues de 5 segundos
  timer.ejecutarDespuesDe(1).then(() => {
    console.log(`${socket.remoteAddress} se ha conectado`);
    conectado = true;
    socket.write(Buffer.from('conectado', 'utf-8'));
    timer.ejecutarDespuesDe(1).then(() => {
      socket.write(Buffer.from(`id: ${id}`, 'utf-8')); //Enviamos el id al cliente
    });
  });

  /**
   * Recibimos informacion del cliente
   */
  socket.on('data', (data) => {
    if (data.toString() == comandos.BUSCAR_PARTIDA) {
      console.log(`${id} esta buscando partida`);
      buscarPartida.set(id, { id: id, conexion: socket }); //Agregamos el jugador a la lista de espera
    }
  });

  //Ejecuta algo cuando el cliente se desconecta
  socket.on('close', () => {
    console.log('DESCONECTADO');
  });
});

const PUERTO = 8080; //Puerto en el cual correra el servidor

//Pone nuestro servidor a escuchar peticiones en un puerto especifico
servidor.listen(PUERTO, () => {
  console.log('CORRIENDO EN EL PUERTO ' + PUERTO);
  console.log('Esperando jugadores que busquen partida...');

  let busquedaTimer: Timer = new Timer(() => {
    //se ejecuta 60 veces cada segundo
    // if (buscarPartida.size >= 2) {
    //   let jugadores: Array<IJugador> = [];
    //   buscarPartida.forEach(j => {
    //     jugadores.push(j);
    //   });
    //   habitacionesUnoVsUno.set(
    //     jugadores[0].id + jugadores[1].id,
    //     new UnoVsUo(jugadores[0], jugadores[1])
    //   );
    //   console.log("Habitacion creada "+  jugadores[0].id + jugadores[1].id);
    //   buscarPartida.delete(jugadores[0].id)
    //   buscarPartida.delete(jugadores[1].id)
    // }

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
