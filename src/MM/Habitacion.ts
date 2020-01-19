/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 * @description Este archivo se encargara de aislar diferentes jugadores para poder hacer la comunicacion
 * entre ellos mas facil y eficiente
 */

import { IJugador } from "../Server";
//Lo que usaremos para saber que tipo de habitacion es
interface HabConfig {
  modo: "1VS1" | "2VS2";
}


/**
 * Este metodo devuelve verdadero si el tipo de habitacion esta configurado para ser 1VS1
 * @param jugadores Tipo: { jugador1: IJugador; jugador2: IJugador } | Map<String, IJugador>... Que tipo de 
 * configuracion o cantidad de jugadores es.
 */
function esUnoVsUno(
  jugadores: { jugador1: IJugador; jugador2: IJugador } | Map<String, IJugador>
): jugadores is { jugador1: IJugador; jugador2: IJugador } {
  return <Map<String, IJugador>>jugadores == undefined;
}

/**
 * Esta clase es la clase padre de donde heredaran todas las diferentes habitaciones o modos de juegos
 */
class Habitacion {
  private config: HabConfig;
  private jugador1: IJugador | null = null;
  private jugador2: IJugador | null = null;
  private jugadores: Map<String, IJugador> | null = null;

  /**
   * Modo 1VS1
   * @param tipo { jugador1: IJugador; jugador2: IJugador }: Jugador 1 y 2 para esta habitacion
   */
  constructor(tipo: { jugador1: IJugador; jugador2: IJugador });

  /**
   * Modo 2VS2 o mas
   * @param tipo  Map<String, IJugador>: Lista de jugadores que estaran en esta habitacion
   */
  constructor(tipo: Map<String, IJugador>);

  constructor(
    tipo:
      | {
          jugador1: IJugador;
          jugador2: IJugador;
        }
      | Map<String, IJugador>
  ) {
      if(esUnoVsUno(tipo)){
          this.config = {modo: "1VS1"};
          this.jugador1 = tipo.jugador1;
          this.jugador2 = tipo.jugador2;
      }else{
          this.config = {modo: "2VS2"};
          this.jugadores = tipo;
      }
  }
}

/**
 * Esta clase sera la encargada de comunicar los jugadores en el metodo 1VS1
 */
export class UnoVsUo extends Habitacion{
    constructor(jugador1:IJugador, jugador2:IJugador){
        super({jugador1: jugador1, jugador2: jugador2})
    }
}