# DesarrolloPRILFront

Este proyecto esta generado con: 
- Imagen docker [Trion/ng-cli](https://github.com/trion-development/docker-ng-cli/tree/6.0.7) version 6.0.7
- [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.
- [Ng Bootstrap](https://github.com/ng-bootstrap/ng-bootstrap) version 2.0.0

## Instalación del proyecto via docker

Nos dirigimos al directorio donde tenemos el proyecto y seguimos los siguientes pasos:

- Utilizamos el siguiente comando a instalar, que nos proporcionara la instalación de las dependencias del proyecto:
    
    `docker run -u $(id -u) --rm -v "$PWD":/app trion/ng-cli:6.0.7 npm install`

# Modo desarrollo

- Compilamos el codigo con el siguiente comando:
   
    - **Desarrollo:**
    
    `docker run -u $(id -u) --rm -v "$PWD":/app trion/ng-cli:6.0.7 ng build`

    - **producción:**

    `docker run -u $(id -u) --rm -v "$PWD":/app trion/ng-cli:6.0.7 ng build --configuration=production`

Una vez completado los pasos anteriores iniciamos el docker que contiene nuestro sistema:

Iniciando proyecto con la imagen de docker [Trion/ng-cli](https://hub.docker.com/r/trion/ng-cli/):

   - **Desarrollo:**

   `docker run -u $(id -u) --rm -p 4200:4200 -v "$PWD":/app trion/ng-cli:6.0.7 ng serve --host 0.0.0.0`

   - **Producción:**

   `docker run -u $(id -u) --rm -p 4400:4200 -v "$PWD":/app trion/ng-cli:6.0.7 ng serve --configuration=production --host 0.0.0.0`

## Ayuda

- Para conseguir más ayuda sobre Angular CLI usa:

    `docker run -u $(id -u) --rm -v "$PWD":/app trion/ng-cli:6.0.7 ng help`
    
O dirigite a [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
