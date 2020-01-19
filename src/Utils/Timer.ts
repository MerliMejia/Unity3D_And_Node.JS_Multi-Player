/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 * @description Esta clase se encargara de todo lo que tiene que ver con tiempo
 */

export default class Timer {
  private intervalo: number = 60;//Cantidad de veces que repetimos una accion por segundos
  private si: any;//Objeto setInterval

  constructor();
  constructor(ejecutar: Function);
  constructor(ejecutar: Function, intervalo: number);
  constructor(ejecutar?: Function, intervalo?: number) {
    if (intervalo !== undefined) this.intervalo = intervalo;
    if (ejecutar !== undefined) this.empezar(ejecutar);
  }

  /**
   * Este metodo comienza el setInterval
   * @param ejecutar Funcion a ejecutar cada x intervalo
   */
  private empezar(ejecutar: Function) {
    this.si = setInterval(() => {
      ejecutar();
    }, 1000 / this.intervalo);
  }

  /**
   * Detiene el setInterval
   */
  parar(){
      clearInterval(this.si);
  }

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
      }, 1000 * tiempo);
    });
  }
}
