# Unity3D + Node.JS

Este repositorio contendra todo el codigo correspondiente a los tutoriales de mi serie de Youtube de como crear juegos multi-jugador online usando Unity3D + Node.JS


# Info

Podras haber notado que este repositorio incluye la carpeta de **node_modules**, bueno, esto lo hago porque quiero que personas con poco conocimiento en node.js puedan usar estos ejemplos con mas facilidad ;)

Puedes contactarme o hacerme cualquier pregunta a este correo: **merlimejia2@gmail.com**

# Episodios

[1- Principios basicos, configurar proyecto y conectarse al servidor](https://youtu.be/zVfpNXHP3Mw)


# Comandos utiles

Iniciar proyecto node.js:

    npm init

Instalar Typescript:

    npm install typescript -s

Como deberia de verse la parte de **scripts** en nuestro archivo **package.json**:

    "scripts": {  
    "tsc": "tsc",  
    "dev": "ts-node-dev --respawn --transpileOnly ./src/Server.ts",  
    "prod": "tsc && node ./Build/Server.js"  
    },

Inicializar Typescript:

    npm run tsc -- --init

Instalar los tipos de la libreria **net**:

    npm install @types/node

Correr servidor en modo desarrollo:

    npm run dev

Correr servidor en modo produccion:

    npm run prod

