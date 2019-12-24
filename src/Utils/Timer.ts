/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 * @description Esta clase se encargara de todo lo que tiene que ver con tiempo
 */

export default class Timer {

    /**
     * Este metodo ejecuta algo despues de un tiempo especificado
     * @param tiempo Tiempo a esperar en segundos
     * @param callback (Opcional) se ejecuta despues del tiempo especificado pero antes de resolver el Promise
     */
    ejecutarDespuesDe(tiempo: number, callback?: Function): Promise<void> {
        return new Promise((res, rej) => {
            let intervalo = setInterval(() => {
                callback !== undefined ? callback() : null;
                res();
                clearInterval(intervalo);

            }, 1000 * tiempo)
        })
    }

}