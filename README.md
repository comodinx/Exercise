Exercise
========

Índice
------

* [Instalar][instalar].
* [Correr][correr].
    + [Development][correr_development].
    + [Production][correr_production].
    + [Test][correr_tests].
* [Configuración][configuracion].
* [Utilizar NVM][utilizar_nvm].

Instalar
--------

```sh
git clone https://github.com/comodinx/Exercise.git
cd "Exercise"
npm i
```

> Nota: Se puede [utilizar NVM][utilizar_nvm] para manejar la versión de NodeJS, y poder correr tanto los tests como el server con la misma versión de node.

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

##### Test

> Nota: Los test necesitas soporte especial para funciones asyncronicas, por lo tanto deben correr con node >= 8.2.x.

```sh
npm test
```

Configuración
-------------

##### Configuraciones por variables de entorno

PORT={Número de puerto. (Por defecto: 3000, en modo producción: 8080)}
Example:
```sh
PORT=3001 npm run start:d
# OR
PORT=8081 npm start
```

##### Configuraciones por archivos

La configuración del proyecto está ubicada en el siguiente directorio *_{proyect}/src/server/config/environment_*.
Los archivos ubicados en el root de dicho directorio son las configuraciones por defecto. Las mismas, pueden ser sobreescritas por entorno, ejemplo.

Si tenemos un entorno *staging*, en el cual deseamos correr la aplicación en el puerto 4000, podemos crear la carpeta *staging* (dentro de *_{proyect}/src/server/config/environment_*) y el archivo *server.js* dentro de la misma, con el siguiente contenido.

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
  |  |  |-> ...
  |  |-> staging
  |  |  |-> server.js
  |  |-> ...

```

La configuración actual, se encuentra estructurada de la siguientes manera. Además, la misma incluye configuraciones para producción:

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
  |  |-> request.js (configuraciones para la conexión a la API)
```

Utilizar NVM
------------

Para utilizar `nvm` primero debemos descargarlo.
> Nota: para obtener información completa sobre `nvm` puede hacer [click aquí][nvm_site]

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

Luego, corremos el siguiente comando para instalar la versión correcta de NodeJS.
> Nota: en el proyecto ya se encuentra un archivo llamado *.nvmrc* el cual indica la versión de NodeJS (_11.1.0_) que se debe utilizar. Por lo tanto, al correr el siguiente comando se va a instalar dicha versión

```sh
nvm install
```

Por último, para correr la aplicación utilizando `nvm`, se hace de la siguiente manera:

##### Ejecutar modo *development*

```sh
nvm exec npm run start:d
```

##### Ejecutar modo *production*

```sh
nvm exec npm start
```

##### Ejecutar los tests

```sh
nvm exec npm test
```


<!-- deep links -->
[instalar]: #instalar
[correr]: #correr
[correr_development]: #modo-development
[correr_production]: #modo-production
[correr_tests]: #test
[configuracion]: #configuración
[utilizar_nvm]: #utilizar-nvm
[nvm_site]: http://nvm.sh
