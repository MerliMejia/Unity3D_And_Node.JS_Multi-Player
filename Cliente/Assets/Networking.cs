/**
 * Autor: Merli Mejia
 * Email: merlimejia2@gmail.com
 * <summary>
 * Esta clase sera la encargada de manejar todo lo que tiene que ver con el 
 * Networking de nuestro juego
 * </summary>
 */

using UnityEngine;//Unity
using System.Net.Sockets;//Libreria que nos permite usar Sockets
using System;//Lo necesitamos para usar las interfaces Actions
using System.Text;//Lo necesitamos para decodificar los bytes provenientes del servidor

public class Networking : MonoBehaviour
{
    TcpClient cliente = new TcpClient();//Instancia de nuestro cliente TCP
    NetworkStream stream;//Lo usamos para leer y escribir en el servidor

    const string IP = "192.168.0.2";//Direccion IP del servidor(al principio sera la ip de tu pc)
    const int PUERTO = 8080;//Puerto en el cual esta corriendo el servidor
    const double memoria = 5e+6;//Significa 5mbs en bytes
    const int tiempoLimiteConexion = 5000;//Tiempo limite de conexion en milisegundos

    public byte[] data = new byte[(int) memoria];//Donde almacenamos lo que viene del servidor
    public bool corriendo = false;//Para saber si el cliente esta corriendo

    private void Start()
    {
        //Intentamos conectarnos al servidor
        conectar((bool res) =>
        {
            if(res == true)
            {
                stream = cliente.GetStream();//Obtenemos la instancia del stream de la conexion
                corriendo = true;
            }
            else
            {
                Debug.LogError("NO SE PUDO CONECTAR");
            }
        });
    }

    /**
     * <summary>
     * Este metodo hace algo dependiendo el comando que le pasen
     * <paramref name="comando"/> Comando a ejecutar
     * </summary>
     * 
     */
    public void ejecutarComando(string comando)
    {
        if(comando == "conectado")
        {
            Debug.Log("CONECTADO AL SERVIDOR");
        }
    }

    private void Update()
    {
        
        if(corriendo == true)
        {
            if (stream.DataAvailable)//Asi sabemos si el servidor ha enviado algo
            {
                int dataTam = stream.Read(data, 0, data.Length);//Almacenamos lo que viene del servidor y obtenemos el tamaño de lo mismo
                string mensaje = Encoding.UTF8.GetString(data, 0, dataTam);//decodificamos el mensaje
                ejecutarComando(mensaje);
            }
        }
    }

    /**
     * 
     * <summary>
     * Este metodo intenta conectarse al servidor durante un tiempo limite ya definido <see cref="tiempoLimiteConexion"/>
     * <paramref name="callback"/> se ejecuta despues de haber intentado conectarse al servidor y devuelve un bool dependiendo de si se conecto o no
     * </summary>
     * 
     */
    private void conectar(Action<bool> callback)
    {
        bool resultado = cliente.ConnectAsync(IP, PUERTO).Wait(tiempoLimiteConexion);
        callback(resultado);
    }

    private void OnApplicationQuit()
    {
        corriendo = false;
    }


}
