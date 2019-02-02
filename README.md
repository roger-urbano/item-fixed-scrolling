# Paquetes Globales Necesarios (Only server | Backend):
instalando mediante Terminal :
```sh
$ sudo npm install -g gulp connect http st find-port
$ #En Windows
$ npm install -g gulp connect http st find-port
$ #
$ # Para iniciar servidor basta con:
$ node server.js ## Esto retornará el mensaje de donde esta corriendo Corriendo
$ # en http://127.0.0.1:8080/app/home.html

```
(En windows correr el cmd en modo administrador para instalar los paquetes Globales )

# Instalación de Gulp y Dependencias
```sh
$ # por primera y única vez:
$ npm install -g gulp (en windows usar el cmd en modo administrador)
$ # Instalando paquetes y dependencias del proyecto:
$ npm install # package.json es por defecto
$ 
$ # En caso de agregar un paquete nuevo usar :
$ npm install --save-dev [Package-Name (gulp-######)]
$ # esto salvará el paquete instalado en las dependencias
$ # permitiendo instalarlo fácilmente a los demás usuarios
$ 
$ #Para iniciar el Proyecto simplemente se utilizaría
$ gulp
```


# Build 3.2.4-beta
**Se re-estructuró la ubicacion de documentos:**
* 1) source/templates/common/ nueva ubicación de los archivos Generales como header footer y los bases
* 2) Una ves terminado los proyectos y compilados con "gulp prod" obtener el listado de la web en http://127.0.0.1:8080/build/ este método ya no incluye los "archivos Generales" (header footer y los bases)
* 3) Guardar el listado obtenido en la carpeta /app/source.html con el nombre index.html y subirlo al areminds (de esta manera se cargará en http://w.areminds.com/proyectos/[project_name]/app/)

**Metodo de ahorro de espacio en el disco **
(en caso de error o no saber como hacerlo entonces no hagan caso a este mensaje.)
> con la estructura ~/Maquetas/['maq-project']/['source','node_modules','etc..']
> pueden colocar la carpeta 'node_modules' como "hermano" de todos los proyectos (Dentro de la carpeta "Maquetas" en este ejemplo) de esta manera este quedaría como carpeta general para todos los proyectos
> quedando la carpeta "Maquetas" ~/Maquetas/['maq-project','node_modules']
> y la carpeta de proyecto ~/Maquetas/maq-project/['source','etc..']
> de esta manera solo usarían una carpeta node_modules ahorrando espacio en el disco



# Build 3.1.1-beta
**Se agregó un nuevo Modo de compilación ("prod"):**
> se agregó un nuevo modulo de creación a través del comando "gulp prod":
> Este modo de compilacion **unicamente** se usa cuando se pasa a la etapa final del proyecto o cambios, es decir, **Solo cuando todo este listo todo.**
> este comando crea los siguientes archivos:

* 1) production.css (es el único archivo que se usará en producción) este archivo incluye todo en uno. como antes se usaba el styl.styl
* 2) source/build/* la carpeta nueva 'build' incluye los html compilados de producción incluyendo unicamente el production.css de esta manera se podrá tener una vista previa del proyecto al 100% limpio
(apto para usar clay o node con el comando "node server.js" a través de: http://127.0.0.1:8080/build/home.html)

**Metodo de ahorro de espacio en el disco **
(en caso de error o no saber como hacerlo entonces no hagan caso a este mensaje.)
> con la estructura ~/Maquetas/['maq-project']/['source','node_modules','etc..']
> pueden colocar la carpeta 'node_modules' como "hermano" de todos los proyectos (Dentro de la carpeta "Maquetas" en este ejemplo) de esta manera este quedaría como carpeta general para todos los proyectos
> quedando la carpeta "Maquetas" ~/Maquetas/['maq-project','node_modules']
> y la carpeta de proyecto ~/Maquetas/maq-project/['source','etc..']
> de esta manera solo usarían una carpeta node_modules ahorrando espacio en el disco


# Build 2.5.2-beta
se adhirió módulos asíncronos para un proceso individual de los *.styl:
> los *.styl compilados se crean en en css/css_builds/ estos se empaquetan en css/blocks_styl.css

# Build 2.1.3-beta
Se agregó plumber para caso de errores en el compilador de Stylus:
> se agregó el filtro cycle el cual necesita como parámetros:
> 1) lista a iterar "class-par,class-inpar" juntas y separadas por comas 
> 2) El index del loop inicializado en 0 "loop.index0"
> la forma de integrarlo seria con:
> <div class="wContentItems clear-fixed {{ "par,impar,elColaoxD"|cycle(loop.index0) }}">
> methodos para indexar contadores:
> {{ forloop.counter }} paso a ser {{ loop.index }} (contador iniciado en 1)
> {{ forloop.counter0 }} paso a ser {{ loop.index0 }} (contador iniciado en 0)



# Build 2.0.0-beta
Se agregó plumber para caso de errores:
> Por defecto el paquete gulp-swig se paraba cuando ocurría un error de sintaxis, por lo que se tenia que reiniciar el proceso manualmente
> ahora con Plumber el procesos se mantiene, y en caso de error no compila hasta que se corrija.

* El metodo {% for i in [] %} cambió de range(0,3) -> "3"|get_range => {% for i in "3"|get_range %}
* Se estableció dos métodos de inicio:

```sh
$ # Iniciando de Gulp de modo natural:
$ gulp
$ 
$ # A Pedido de Maury, En caso de no desear el reload automático:
$ gulp sr #(sr => sin reload)
$ # este método desactiva el reload cuando se cambia algo en los *.styl pero seguirá funcionando cuando se cambie algo en los *.html
$
```

# Build 1.9.7-beta
Se estableció la variable cache como true:
> Por defecto el paquete gulp-swig cargaba los templates en memoria (cache) y no jalaba las modificaciones que se realizaban
> por lo que se tenia que reiniciar el Proceso Gulp

# Build 1.6.2-beta
Se agregó el compilador para Jade:
> Todo lo creado en la capeta ./source/jade/ termina compilado y listo para ver en ./source/appjade/*.html
> en la url http://localhost:8080/appjade/*.html e igual que la versión anterior
> "STATIC_URL" es la única forma para dirigirse a la carpeta static ("./source/static/")

# Build 1.0.3-beta
Cabecera de extensión, Cambios de Estructura:
> Anteriormente se usaba como rootPath "./source/" para compilar los templates.
> por lo que se retrocedía ("../app/base.html") o se inciaba desde "app/base.html".
> Ahora la carpeta templates (".source/templates/") es el rootPath donde se compilan los *.html 
> hacia (".source/app/") , Los staticFiles siguen manteniendo su ubicación

* {% extends "app/base.html" %} -> {% extends "base.html" %}
* Ya no necesitan de linux para compilar. ya que los *.html están compilados en la carpeta app.
* Si desean un listado de los *.html solo hacen un "Guardar pagina Completa" de http://localhost:8080/app/ con el nombre index.html (o pueden crear uno propio si lo desean) y lo ponen en la raíz de la carpeta en el servidor cuando deseen publicarlo.
* ahora la variable {{ STATIC_URL }} será la única para dirigirse a la carpeta static ("./source/static/")
* se implemento un script para que se levante múltiples proyectos a la ves al estilo Clay, con puertos consecutivos 8080 8081 8082... etc.