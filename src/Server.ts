/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 * @description Servidor TCP el cual utiliza sockets
 */

import * as net from "net"
import Timer from "./Utils/Timer"

let timer: Timer = new Timer()

/**
 * @description Creamos un servidor TCP
 * @param socket Referencia al cliente conectado a nuestro servidor
 */
let servidor = net.createServer((socket) => {

    //Mandamos mensaje de "conectado" al cliente despues de 5 segundos
    timer.ejecutarDespuesDe(5).then(() => {
        console.log(`${socket.remoteAddress} se ha conectado`)
        socket.write(Buffer.from("conectado", "utf-8"))
    })

    //Ejecuta algo cuando el cliente se desconecta
    socket.on("close", ()=>{
        console.log("DESCONECTADO");
    })

})

const PUERTO = 8080;//Puerto en el cual correra el servidor

//Pone nuestro servidor a escuchar peticiones en un puerto especifico
servidor.listen(PUERTO, () => {
    console.log("CORRIENDO EN EL PUERTO " + PUERTO)
})