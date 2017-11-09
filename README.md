Exercise
========

Instalar
--------

```sh
git clone https://github.com/comodinx/Exercise.git
cd "Exercise"
npm i
```

Correr
------

##### Modo *development*

```sh
npm run start:d
```

##### Modo *production*

```sh
npm start
```

##### Tests

> Nota: Los test necesitas soporte especial para funciones asyncronicas, por lo tanto deben correr con node >= 8.2.x.

```sh
npm test
```

Configuración
-------------

##### Configuraciones por variables de entorno

PORT={Número de puerto. (Por defecto: 3000, en modo producción: 8080)}

##### Configuraciones por archivos

La configuración del proyecto esta ubicada en el siguiente directorio *_{proyect}/server/config/environment_*.
Los archivos ubicados en el root de dicho directorio son las configuraciones por defecto. Las mismas, pueden ser sobre-escritas por entorno, ejemplo.

Si creamos tenemos un entorno *testing*, en el cual deseamos corre la aplicación en el puerto 4000, podemos crear la carpeta *testing* y el archivo *server.js* dentro de la misma, con el siguiente contenido.

```javascript
{
    port: 4000
}
```

Por lo tanto, con este cambio nos quedaría (actualmente) la siguiente estructura de carpetas en la configuración:

```
config
  |-> environment
  |  |-> production
  |  |-> testing
```

La configuración actual, se encuentra estructurada de la siguientes manera. Ademas, la misma incluye configuraciones para producción:

```
config
  |-> environment
  |  |-> production
  |  |  |-> cluster.js (enabled: true, workers (nodes): OS.cpus)
  |  |  |-> server.js (port: 8080)
  |
  | // Default (development)
  |  |-> cluster.js (enabled: false)
  |  |-> server.js (port: 3000)
  |  |-> author.js (middleware)
  |  |-> morgan.js (middleware)
  |  |-> items.js (listing)
  |  |-> request.js (herramienta para el manejo de peticiones a la API)
```


