import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// datos JSON
import * as data from '../../../assets/data/data.json';
import { Role, User } from "../../core/models";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // traer listado de ambientes
      // desde el archivo "data.json" y del "local storage"
      function getAmbientes(){
        let ambienteLista = (<any>data).ambientes;
        let existe = false;
        if(localStorage.getItem("ambienteLista")) {
          let ambienteStorage: any[] = JSON.parse(localStorage.getItem("ambienteLista"));
          for (let i = 0; i < ambienteStorage.length; i++) {
            for (let j = 0; j < ambienteLista.length; j++) {
              if (ambienteStorage[i].id === ambienteLista[j].id){
                ambienteLista[j] = ambienteStorage[i]; // si se edito
                existe = true;
              }
            }
            if (!existe) {
              ambienteLista.push(ambienteStorage[i]);
            }
          }
        }
        return ambienteLista;
      }
      // traer listado de destinatarios
      // desde el archivo "data.json" y del "local storage"
      function getDestinatarios(){
        let destinatarioLista = (<any>data).destinatarios;
        let existe = false;
        if(localStorage.getItem("destinatarioLista")) {
          let destinatarioStorage: any[] = JSON.parse(localStorage.getItem("destinatarioLista"));
          for (let i = 0; i < destinatarioStorage.length; i++) {
            for (let j = 0; j < destinatarioLista.length; j++) {
              if (destinatarioStorage[i].id === destinatarioLista[j].id){
                destinatarioLista[j] = destinatarioStorage[i]; // si se edito
                existe = true;
              }
            }
            if (!existe) {
              destinatarioLista.push(destinatarioStorage[i]);
            }
          }
        }
        return destinatarioLista;
      }

      // traer listado de persona
      // desde el archivo "data.json" y del "local storage"
      function getPersonas(){
        let personaLista = (<any>data).personas;
        let existe = false;
        if(localStorage.getItem("personaLista")) {
          let personaStorage: any[] = JSON.parse(localStorage.getItem("personaLista"));
          for (let i = 0; i < personaStorage.length; i++) {
            for (let j = 0; j < personaLista.length; j++) {
              if (personaStorage[i].id === personaLista[j].id){
                personaLista[j] = personaStorage[i]; // si se edito
                existe = true;
              }
            }
            if (!existe) {
              personaLista.push(personaStorage[i]);
            }
          }
        }
        return personaLista;
      }
       // traer listado de Ofertas
      // desde el archivo "data.json" y del "local storage"
      function getOfertas(){
        let ofertasLista = (<any>data).ofertas;
        let existe = false;
        if(localStorage.getItem("ofertasLista")) {
          let ofertasStorage: any[] = JSON.parse(localStorage.getItem("ofertasLista"));
          for (let i = 0; i < ofertasStorage.length; i++) {
            for (let j = 0; j < ofertasLista.length; j++) {
              if (ofertasStorage[i].id === ofertasLista[j].id){
                ofertasLista[j] = ofertasStorage[i]; // si se edito
                existe = true;
              }
            }
            if (!existe) {
              ofertasLista.push(ofertasStorage[i]);
            }
          }
        }
        return ofertasLista;
      }

      // traer listado de oficios
      // desde el archivo "data.json" y del "local storage"
      function getOficios(){
        let oficios = (<any>data).oficios;
        let existe = false;
        if(localStorage.getItem("oficios")) {
          let oficiosStorage: any[] = JSON.parse(localStorage.getItem("oficios"));
          for (let i = 0; i < oficiosStorage.length; i++) {
            for (let j = 0; j < oficios.length; j++) {
              if (oficiosStorage[i].id === oficios[j].id){
                oficios[j] = oficiosStorage[i]; // si se edito
                existe = true;
              }
            }
            if (!existe) {
              oficios.push(oficiosStorage[i]);
            }
          }
        }
        return oficios;
      }


      // listados de datos agregados
      const users = [
        { username: 'soporte', password: "soportes", nombre: 'Soporte', role: ['Soporte'] },
        { username: 'user', password: "users", nombre: 'Ususario', role:['Usuario'] },
        { username: 'Admin', password: "admins", nombre: 'Ususario', role:['diosito'] },
        { username: 'user', password: "users", nombre: 'Ususario', role:['Usuario'] },
      ];
        let areasLista: any[] = JSON.parse(localStorage.getItem('areasLista')) || [];
        let ofertasAgregadas: any[] = JSON.parse(localStorage.getItem('ofertasAgregadas')) || [];

        let ofertasLista = getOfertas();
        let destinatarioLista = getDestinatarios();
        let ambienteLista = getAmbientes();
        let personas = getPersonas();
        let oficio = getOficios();

        // listados globales
        let sexo = (<any>data).sexos;
        let genero = (<any>data).generos;
        let estadoCivil = (<any>data).estadoCivils;
        let localidad = (<any>data).localidads;

        let profesion = (<any>data).profesions;
        let nivelEducativo = (<any>data).nivelEducativos;
        let tipoAmbienteTrabajoLista = (<any>data).tipoAmbienteTrabajos;
        let planes = (<any>data).planes;
        let roles = (<any>data).rol;
        let permisos = (<any>data).permiso;
        // datos adicionales

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;


        /*** Funciones para el uso de datos ***/

        function generarId(listado){
            let count = listado.length;
            return count + 1;
        }

        function getNombreArray(id, listado){
            let seleccion: '';
            // busco el elemento en la lista
            for (var key in listado) {
                // verifico que exista el elemento
                if (listado[key].id == id) {
                    seleccion = listado[key].nombre;
                }
            }

            return (seleccion != '')?seleccion:'';
        }

        function obtenerUltimoEstudio(estudio){
            let anio = 0;
            let seleccion:any;
            for (var i in estudio) {
                if (parseInt(estudio[i].anio) > anio) {
                    anio = parseInt(estudio[i].anio);
                    seleccion = estudio[i];
                }
            }

            return seleccion;
        }

        function concatEstudio(obj) {
            let texto = '';
            for (var clave in obj) {
                if (clave == 'nivel_educativoid') {
                    texto += '';
                }else if (clave == 'en_curso'){
                    texto+='';
                }else if (clave == 'completo') {
                    if (obj[clave] == true) {
                        texto += 'completo';
                    }else{
                        texto += 'en curso';
                    }
                }else if (clave == 'anio'){
                    if (obj['anio'] != '') {
                        texto += obj.anio
                    }
                }else{
                    texto += obj[clave];
                }
                texto+=' ';
            }
            return texto;
        }

        function hoy() {
            let fecha = new Date();
            return fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate();
        }

        function plazo() {
          let fecha = new Date();
          fecha.setMonth( fecha.getMonth() + 6 );
          return fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
        }

        function comprobarEstado(fechaFinal:string) {
          let fechaFinalAux = fechaFinal.split("-");
          let ffAnio = parseInt(fechaFinalAux[0]);
          let ffMes = parseInt(fechaFinalAux[1]);
          let ffDia = parseInt(fechaFinalAux[2]);
          let fecha = new Date();
          let anioHoy = fecha.getFullYear();
          let mesHoy = fecha.getMonth();
          let diaHoy = fecha.getDate();
          let estado = '';

          if( ffAnio < anioHoy ) {
            estado = 'Finalizado';
          }else{
            if ( ffAnio == anioHoy && ffMes < mesHoy ) {
              estado = 'Finalizado';
            }else{
              if (ffAnio == anioHoy && ffMes == mesHoy && ffDia < diaHoy){
                estado = 'Finalizado';
              }else{
                if (ffAnio == anioHoy && ffMes == mesHoy && ffDia == diaHoy) {
                  estado = 'Finalizado';
                }else {
                  estado = "Vigente";
                }
              }
            }
          }
          return estado;
        }
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

        /* ************************************************************************
         *                                LOGIN
         * ************************************************************************ */
            // authenticate
            if (request.url.endsWith('/apimock/usuario/login') && request.method === 'POST') {
              console.log(request.body);
              const user = users.find(x => x.username === request.body.username && x.password === request.body.password_hash);
              console.log("usuario: ", user);
                if (user) {
                    // if login details are valid return 200 OK with a fake jwt token
                    let usuario = {username: user.username, nombre: user.nombre, role: user.role, access_token: 'fake-jwt-token'}

                    return of(new HttpResponse({ status: 200, body: usuario }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/apimock/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [users] }));
                // } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // }
            }
        /* ************************************************************************
         *                                DESTINATARIO
         * ************************************************************************ */
            // lista de destinatario
            if (request.url.endsWith('/apimock/destinatarios') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application

                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  // parametros de busquedas
                  let global_param = (request.params.get("global_param")) ? request.params.get("global_param") : '';
                  let nivel_educativoid = (request.params.get("nivel_educativoid")) ? request.params.get("nivel_educativoid") : '';
                  let profesionid = (request.params.get("profesionid")) ? request.params.get("profesionid") : '';
                  let oficioid = (request.params.get("oficioid")) ?
                  request.params.get("oficioid") : '';
                  // datos paginacion
                  let page: number = parseInt(request.params.get("page"));
                  let pageSize: number = (request.params.get("pagesize")) ? parseInt(request.params.get("pagesize")) : 5;

                  let search = [''];
                  if (global_param != ''){
                    search = global_param.split(" ");
                  }

                  //preparo objeto de paginacion
                  let totalPaginas = 0;
                  let encontrados: any[] = [];
                  let listaDestinatario = {
                    total_filtrado: 0,
                    pagesize: pageSize,
                    pages: totalPaginas,
                    estado: true,
                    resultado:encontrados,
                  };

                  // armo el listado de destinatario
                  for (let d = 0; d < destinatarioLista.length; d++) {
                    for (let p = 0; p < personas.length; p++) {
                      if (destinatarioLista[d]["personaid"] === personas[p]["id"]) {
                        destinatarioLista[d]["persona"] = personas[p];
                      }
                    }
                  }

                  // realizo busqueda por los parametros enviados
                  encontrados = destinatarioLista.filter(
                    destinatario => {
                      for (let i = 0; i < search.length; i++) {
                        let nombre = destinatario.persona.nombre.split(" ");
                        for (let j = 0; j < nombre.length; j++) {
                            if ( nombre[j].toLowerCase().indexOf(search[i].toLowerCase()) > -1  ) {
                              return destinatario;
                            }
                        }
                        if (destinatario.persona.nro_documento.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ){
                          return destinatario;
                        }
                        if ( destinatario.persona.apellido.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ) {
                          return destinatario;
                        }
                      }
                    });

                    if (nivel_educativoid != '') {
                        encontrados = encontrados.filter(destinatario => {
                          let existe = false;
                          for (let i = 0; i < destinatario.persona.estudios.length; i++) {
                            existe = parseInt(nivel_educativoid) === parseInt(destinatario.persona.estudios[i].nivel_educativoid);
                            console.log(existe);

                            if (existe) { return destinatario; }
                          }
                        });
                    }
                    if (profesionid != '') {
                        encontrados = encontrados.filter(destinatario => {
                          let existe = false;
                          for (let i = 0; i < destinatario.persona.estudios.length; i++) {
                            existe = parseInt(profesionid) === parseInt(destinatario.persona.estudios[i].profesionid);
                            if (existe) { return destinatario; }
                          }
                        });
                    }
                    if (oficioid != '') {
                      encontrados = encontrados.filter(destinatario => {
                        let existe = false;
                        for (let i = 0; i < destinatario.persona.lista_oficio.length; i++) {
                          existe = parseInt(oficioid) === parseInt(destinatario.persona.lista_oficio[i].id);
                          if (existe) {return destinatario;}
                        }
                      });
                    }
                    let ultimoEstudio = [];
                    // verifico que haya algun destinario filtrado
                    if (encontrados.length > 0){
                      for (let i = 0; i < encontrados.length; i++) {
                        if (encontrados[i].persona.estudios.length > 0) {
                          console.log(encontrados[i].persona.estudios);
                           ultimoEstudio = encontrados[i].persona.estudios[0];

                          for (let j = 1; j < encontrados[i].persona.estudios.length; j++) {
                            if (parseInt(encontrados[i].persona.estudios[j].anio) > parseInt(ultimoEstudio[0].anio)) {
                              if (encontrados[i].persona.estudios[j].completo == 1) {
                                ultimoEstudio = encontrados[i].persona.estudios[j];
                              }
                            }
                          }

                        encontrados[i].persona["ultimo_estudio"] = ultimoEstudio;
                        delete(encontrados[i].persona["estudios"]);

                        }else{
                          encontrados[i].persona["ultimo_estudio"] = [];
                        }
                        delete(encontrados[i].persona["hogar"]);
                      }
                    }

                    console.log(encontrados);


                  let totalFiltrado:number = encontrados.length;
                  let total:number = totalFiltrado/pageSize;
                  let numEntero = Math.floor(total);
                  let totalPagina:number = (total > numEntero) ? numEntero + 1 : total;

                  listaDestinatario.total_filtrado = encontrados.length;
                  listaDestinatario.pages = totalPagina;

                  if (page > 0) {
                    page = page;
                    let pageStart = page * pageSize;
                    let pageEnd = pageStart + pageSize;
                    listaDestinatario.resultado = encontrados.slice(pageStart, pageEnd);
                  }else{
                    listaDestinatario.resultado = encontrados.slice(0,pageSize);
                  }

                  //console.log("params destinatario mock: ",params);
                  return of(new HttpResponse({ status: 200, body: listaDestinatario }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // Agregar destinatario
            if (request.url.endsWith('/apimock/destinatarios') && request.method === 'POST') {

                // get new user object from post body
                let newDestinatario = request.body;
                let estudios = [];
                // validation
                let duplicateUser = destinatarioLista.filter(destinatario => { return destinatario.persona.nro_documento === newDestinatario.destinatario.persona.nro_documento; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'El destinatario con el nro documento:  "' + newDestinatario.destinatario.persona.nro_documento + '" ya existe' } })
                    ;
                }
                // id destinatario
                newDestinatario['destinatario']['id'] = (destinatarioLista.length > 0)?generarId(destinatarioLista):1;
                // seteo experiencia laboral
                newDestinatario.destinatario.experiencia_laboral = (newDestinatario.destinatario.experiencia_laboral == true)?1:0;
                // seteo sexo
                newDestinatario.destinatario.persona["sexo"] = getNombreArray(newDestinatario.destinatario.persona.sexoid, sexo);
                // seteo genero
                newDestinatario.destinatario.persona["genero"] = getNombreArray(newDestinatario.destinatario.persona.generoid, genero);
                // seteo estado civil
                newDestinatario.destinatario.persona["estado_civil"] = getNombreArray(newDestinatario.destinatario.persona.estado_civilid, estadoCivil);
                // verifico si la persona existe
                let personaExiste = personas.filter(persona => {
                  return newDestinatario.destinatario.persona.id === persona.id;
                }).length;
                if (personaExiste === 0) {
                  newDestinatario.destinatario.persona.id = generarId(personas);
                }
                // id lugar
                newDestinatario.destinatario.persona.lugar.id = (destinatarioLista.length > 0) ? generarId(destinatarioLista) : 1;
                newDestinatario.destinatario.persona.lugar["localidad"] = getNombreArray(newDestinatario.destinatario.persona.lugar.localidadid, localidad);

                // array de datos
                personas.push(newDestinatario.destinatario.persona);
                destinatarioLista.push(newDestinatario.destinatario);
                // datos a mostrar en la tabla
                localStorage.setItem('destinatarioLista', JSON.stringify(destinatarioLista));
                // respond 200 OK
                return of(new HttpResponse({ status: 200, body: { id: newDestinatario.destinatario.id } }));
            }
            // conseguir destinatario por id
            if (request.url.match(/\/apimock\/destinatarios\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let respuesta = {};
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = destinatarioLista.filter(destinatario => { return destinatario.id === id; });
                    let seleccion = matchedUsers.length ? matchedUsers[0] : null;

                    let personaMatch  = personas.filter(persona => { return seleccion.personaid === persona.id; });
                    seleccion['persona'] = personaMatch[0];

                    respuesta = { status: 200, body: seleccion };
                    return of(new HttpResponse(respuesta));
                } else {
                //     // return 401 not authorised if token is null or invalid
                     return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // Editar destinatario
            if (request.url.match(/\/apimock\/destinatarios\/\d+$/) && request.method === 'PUT') {

                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let estudios = [];

                // consigo el destinatario a editar en la respuesta
                let editDestinatario = request.body;
                // creo los estudios
                for (var i = 0; i < editDestinatario.destinatario.persona.estudios.length; i++) {
                    estudios[i] = {
                        nivel_educativoid: editDestinatario.destinatario.persona.estudios[i].nivel_educativoid,
                        nivel_educativo: getNombreArray(editDestinatario.destinatario.persona.estudios[i].nivel_educativoid, nivelEducativo),
                        titulo: editDestinatario.destinatario.persona.estudios[i].titulo,
                        completo: (editDestinatario.destinatario.persona.estudios[i].completo == true) ? 1 : 0,
                        en_curso: (editDestinatario.destinatario.persona.estudios[i].en_curso == true) ? 1 : 0,
                        anio: editDestinatario.destinatario.persona.estudios[i].anio
                    }

                }
                // profesion y oficio
                let profesionID = (editDestinatario.destinatario.profesionid) ? editDestinatario.destinatario.profesionid : '' ;
                let profesionNombre = (editDestinatario.destinatario.profesionid) ? getNombreArray(editDestinatario.destinatario.profesionid, profesion) : '' ;
                let oficioID = (editDestinatario.destinatario.oficioid) ? editDestinatario.destinatario.oficioid : '' ;
                let oficioNombre = (editDestinatario.destinatario.oficioid) ? getNombreArray(editDestinatario.destinatario.oficioid, oficio) : '' ;

                for (var i = 0; i < destinatarioLista.length; i++) {
                    if(destinatarioLista[i]['id'] == id){
                            destinatarioLista[i] = {
                              banco_alias: editDestinatario.destinatario.banco_alias,
                              banco_cbu: editDestinatario.destinatario.banco_cbu,
                              banco_nombre: editDestinatario.destinatario.banco_nombre,
                              conocimientos_basicos: editDestinatario.destinatario.conocimientos_basicos,
                              deseo_actividad: editDestinatario.destinatario.deseo_actividad,
                              deseo_lugar_entrenamiento: editDestinatario.destinatario.deseo_lugar_entrenamiento,
                              experiencia_laboral: (editDestinatario.destinatario.experiencia_laboral == true) ? 1 : 0,
                              fechaPresentacion: editDestinatario.destinatario.fechaPresentacion,
                              fecha_presentacion: editDestinatario.destinatario.fecha_presentacion,
                              id: id,
                              legajo: editDestinatario.destinatario.legajo,
                              origen: editDestinatario.destinatario.origen,
                              fecha_ingreso: hoy(),
                              observacion: editDestinatario.destinatario.observacion,
                              persona: {
                                apellido: editDestinatario.destinatario.persona.apellido,
                                celular: editDestinatario.destinatario.persona.celular,
                                cuil: editDestinatario.destinatario.persona.cuil,
                                cuil_prin: editDestinatario.destinatario.persona.cuil_prin,
                                cuil_ult: editDestinatario.destinatario.persona.cuil_ult,
                                email: editDestinatario.destinatario.persona.email,
                                estado_civil: getNombreArray(editDestinatario.destinatario.persona.estado_civilid, estadoCivil),
                                estado_civilid: editDestinatario.destinatario.persona.estado_civilid,
                                estudios: estudios,
                                fecha_nacimiento: editDestinatario.destinatario.persona.fecha_nacimiento,
                                fechaNacimiento: editDestinatario.destinatario.persona.fechaNacimiento,
                                genero: getNombreArray(editDestinatario.destinatario.persona.generoid, genero),
                                generoid: editDestinatario.destinatario.persona.generoid,
                                id: editDestinatario.destinatario.persona.id,
                                lista_oficio: editDestinatario.destinatario.persona.lista_oficio,
                                lugar: {
                                  altura: editDestinatario.destinatario.persona.lugar.altura,
                                  barrio: editDestinatario.destinatario.persona.lugar.barrio,
                                  calle: editDestinatario.destinatario.persona.lugar.calle,
                                  depto: editDestinatario.destinatario.persona.lugar.depto,
                                  escalera: editDestinatario.destinatario.persona.lugar.escalera,
                                  id: editDestinatario.destinatario.persona.lugar.id,
                                  localidad: getNombreArray(editDestinatario.destinatario.persona.lugar.localidadid, localidad),
                                  localidadid: editDestinatario.destinatario.persona.lugar.localidadid,
                                  piso: editDestinatario.destinatario.persona.lugar.piso
                                },
                                nombre: editDestinatario.destinatario.persona.nombre,
                                nro_documento: editDestinatario.destinatario.persona.nro_documento,
                                sexo: getNombreArray(editDestinatario.destinatario.persona.sexoid, sexo),
                                sexoid: editDestinatario.destinatario.persona.sexoid,
                                telefono: editDestinatario.destinatario.persona.telefono,
                                }
                            }
                    }
                }

                // datos a mostrar en la tabla
                localStorage.setItem('destinatarioLista', JSON.stringify(destinatarioLista));
                // datos de usuarios agregados
                //localStorage.setItem('destinatariosAgregados', JSON.stringify(destinatarioLista));

                // respond 200 OK
                return of(new HttpResponse({ status: 200, body: { id: id } }));
            }

        /* ************************************************************************
         *                            AMBIENTE DE TRABAJO
         * ************************************************************************ */
            // lista de ambientes de trabajos
            if (request.url.endsWith('/apimock/ambiente-trabajos') && request.method === 'GET') {

              // parametros de busquedas
              let global_param = (request.params.get("global_param")) ? request.params.get("global_param") : '';
              let tipo_ambiente_trabajoid = (request.params.get("tipo_ambiente_trabajoid")) ? request.params.get("tipo_ambiente_trabajoid") : '';
              let localidadid = (request.params.get("localidadid")) ? request.params.get("localidadid") : '';

              // datos paginacion
              let page: number = parseInt(request.params.get("page"));
              let pageSize: number = 5;

              //preparo objeto de paginacion
              let totalPaginas = 0;
              let encontrados: any[] = [];
              let lista = {
                total_filtrado: 0,
                pagesize: pageSize,
                pages: totalPaginas,
                estado: true,
                resultado:encontrados,
              };

              let search = [''];
              if (global_param != ''){
                search = global_param.split(" ");
              }

              ambienteLista = getAmbientes();

              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  let totalF = ambienteLista.length;
                  let ambienteColeccion : any[]=[];
                  console.log(ambienteLista);

                  for (let i = 0; i < ambienteLista.length; i++) {
                    // Selecciono la persona del ambiente de trabajo
                    let matchedPersona = personas.filter(persona => { return persona.id === ambienteLista[i].personaid; });
                    let personaElegido = matchedPersona.length ? matchedPersona[0] : [];

                    ambienteColeccion.push({
                      actividad: ambienteLista[i].actividad,
                      calificacion: ambienteLista[i].calificacion,
                      cuit: ambienteLista[i].cuit,
                      email: ambienteLista[i].email,
                      fax: ambienteLista[i].fax,
                      id: ambienteLista[i].id,
                      legajo: ambienteLista[i].legajo,
                      lugar:{
                        altura: ambienteLista[i].lugar.altura,
                        barrio: ambienteLista[i].lugar.barrio,
                        calle: ambienteLista[i].lugar.calle,
                        depto: ambienteLista[i].lugar.depto,
                        entre_calle_1: ambienteLista[i].lugar.entre_calle_1,
                        entre_calle_2: ambienteLista[i].lugar.entre_calle_2,
                        escalera: ambienteLista[i].lugar.escalera,
                        id: ambienteLista[i].lugar.id,
                        latitud: ambienteLista[i].lugar.latitud,
                        localidad: ambienteLista[i].lugar.localidad,
                        localidadid: ambienteLista[i].lugar.localidadid,
                        longitud: ambienteLista[i].lugar.longitud,
                        nombre: ambienteLista[i].lugar.nombre,
                        piso: ambienteLista[i].lugar.piso
                      },
                      lugarid: 105,
                      nombre: ambienteLista[i].nombre,
                      observacion: ambienteLista[i].observacion,
                      personaid: ambienteLista[i].personaid,
                      telefono1: ambienteLista[i].telefono1,
                      telefono2: ambienteLista[i].telefono2,
                      telefono3: ambienteLista[i].telefono3,
                      tipo_ambiente_trabajoid: ambienteLista[i].tipo_ambiente_trabajoid,
                      tipo_ambiente_trabajo: getNombreArray(ambienteLista[i].tipo_ambiente_trabajoid, tipoAmbienteTrabajoLista),
                      persona: personaElegido
                    })
                  }

                  // realizo busqueda por los parametros enviados
                  encontrados = ambienteColeccion.filter(
                    ambiente => {
                      for (let i = 0; i < search.length; i++) {
                        let nombre = ambiente.nombre.split(" ");
                        for (let j = 0; j < nombre.length; j++) {
                            if ( nombre[j].toLowerCase().indexOf(search[i].toLowerCase()) > -1  ) {
                              return ambiente;
                            }
                        }
                        // if (destinatario.persona.nro_documento.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ){
                        //   return destinatario;
                        // }
                        // if ( destinatario.persona.apellido.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ) {
                        //   return destinatario;
                        // }
                      }
                    });

                  //Filtramos por tipo de ambiente de trabajo
                  if (tipo_ambiente_trabajoid != '') {
                    if (encontrados.length > 0) {
                      encontrados = encontrados.filter(ambiente => {
                        let existe = false;
                        existe = parseInt(tipo_ambiente_trabajoid) === parseInt(ambiente.tipo_ambiente_trabajoid);
                        if (existe) { return ambiente; }
                      });
                    }else{
                      encontrados = ambienteColeccion.filter(ambiente => {
                        let existe = false;
                        existe = parseInt(tipo_ambiente_trabajoid) === parseInt(ambiente.tipo_ambiente_trabajoid);
                        if (existe) { return ambiente; }
                      });
                    }
                  }

                  //filtramos por localidad
                  if (localidadid != '') {
                    if (encontrados.length > 0) {
                      encontrados = encontrados.filter(ambiente => {
                        let existe = false;
                        existe = parseInt(localidadid) === parseInt(ambiente.lugar.localidadid);
                        if (existe) { return ambiente; }
                      });
                    }else{
                      encontrados = ambienteColeccion.filter(ambiente => {
                        let existe = false;
                        existe = parseInt(localidadid) === parseInt(ambiente.lugar.localidadid);
                        if (existe) { return ambiente; }
                      });
                    }
                  }


                  let totalFiltrado:number = encontrados.length;
                  let total:number = totalFiltrado/pageSize;
                  let numEntero = Math.floor(total);
                  let totalPagina:number = (total > numEntero) ? numEntero + 1 : total;

                  lista.total_filtrado = encontrados.length;
                  lista.pages = totalPagina;

                  if (page > 0) {
                    page = page;
                    let pageStart = page * pageSize;
                    let pageEnd = pageStart + pageSize;
                    lista.resultado = encontrados.slice(pageStart, pageEnd);
                  }else{
                    lista.resultado = encontrados.slice(0,pageSize);
                  }

                    return of(new HttpResponse({ status: 200, body: lista}));
                // } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // }
            }

            // Crear ambiente de trabajo
            if (request.url.endsWith('/apimock/ambiente-trabajos') && request.method === 'POST') {
                // get new user object from post body
                let newAmbiente = request.body;
                // save new user
                // array de la tabla
                newAmbiente.id = generarId(ambienteLista);
                let idAmbiente: number = newAmbiente.id;
                newAmbiente.persona.id = generarId(personas);
                newAmbiente.lugar.id = generarId(ambienteLista);

                newAmbiente.tipo_ambiente_trabajo = getNombreArray(newAmbiente.tipo_ambiente_trabajoid,tipoAmbienteTrabajoLista);
                newAmbiente.lugar.localidad = getNombreArray(newAmbiente.lugar.localidadid,localidad);

                console.log(newAmbiente);

                ambienteLista.push(newAmbiente);
                                // datos a mostrar en la tabla
                localStorage.setItem('ambienteLista', JSON.stringify(newAmbiente));

                // datos de usuarios agregados
                //ambientesAgregados.push(newAmbiente);
                //localStorage.setItem('ambientesAgregados', JSON.stringify(ambientesAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200, body: { id: idAmbiente } }));
            }

            // conseguir AMBIENTE DE TRABAJO por id
            if (request.url.match(/\/apimock\/ambiente\-trabajos\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let mensaje = 'No existe este ambiente';
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = ambienteLista.filter(ambiente => { return ambiente.id === id; });
                    let seleccion = matchedUsers.length ? matchedUsers[0] : null;
                    let matchedPersona = personas.filter(personas => { return personas.id === seleccion.personaid; });
                    let persona = matchedPersona.length ? matchedPersona[0] : null;
                    seleccion["persona"]=persona;
                    return of(new HttpResponse({ status: 200, body: seleccion }));
                // } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // }
            }

            // Editar ambiente trabajo
            if (request.url.match(/\/apimock\/ambiente\-trabajos\/\d+$/) && request.method === 'PUT') {

                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);

                // consigo el destinatario a editar en la respuesta
                let editAmbiente = request.body;
                // busco en el listado el destinatario
                for (var i = 0; i < ambienteLista.length; i++) {
                    if (ambienteLista[i]['id'] == id) {
                        ambienteLista[i] = {
                            id: id,
                            nombre: editAmbiente.ambiente.nombre,
                            personaid: editAmbiente.persona.id,
                            tipo_ambiente_trabajoid: editAmbiente.ambiente.tipo_ambiente_trabajoid,
                            tipo_ambiente_trabajo: getNombreArray(editAmbiente.ambiente.tipo_ambiente_trabajoid, tipoAmbienteTrabajoLista),
                            cuit: editAmbiente.ambiente.cuit,
                            legajo: editAmbiente.ambiente.legajo,
                            observacion: editAmbiente.ambiente.observacion,
                            estado: 'Activo',
                            actividad: editAmbiente.ambiente.actividad,
                            lugarid: id,
                            telefono1: editAmbiente.ambiente.telefono1,
                            telefono2: editAmbiente.ambiente.telefono2,
                            telefono3: editAmbiente.ambiente.telefono3,
                            email: editAmbiente.ambiente.email,
                            fax: editAmbiente.ambiente.fax,
                            persona: {
                              id: editAmbiente.persona.id,
                              nro_documento: editAmbiente.persona.nro_documento,
                              apellido: editAmbiente.persona.apellido,
                              nombre: editAmbiente.persona.nombre,
                              telefono: editAmbiente.persona.telefono,
                              celular: editAmbiente.persona.celular,
                              email: editAmbiente.persona.email
                            },
                            lugar: {
                              calle: editAmbiente.ambiente.lugar.calle,
                              altura: editAmbiente.ambiente.lugar.altura,
                              id: id,
                              localidadid: 1,
                              barrio: editAmbiente.ambiente.lugar.barrio,
                              piso: editAmbiente.ambiente.lugar.piso,
                              depto: editAmbiente.ambiente.lugar.depto,
                              escalera: editAmbiente.ambiente.lugar.escalera,
                              localidad: getNombreArray(editAmbiente.ambiente.lugar.localidadid, localidad)
                            }
                        }
                    }
                }
                // datos a mostrar en la tabla
                localStorage.setItem('ambienteLista', JSON.stringify(ambienteLista));
                // datos de usuarios agregados
                //localStorage.setItem('ambientesAgregados', JSON.stringify(ambientesAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200, body: { id: id } }));
            }

        /* ************************************************************************
         *                                  OFERTAS
         * ************************************************************************ */

            // Buscar ofertas por ambiente
            if (request.url.endsWith('/apimock/ofertas') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let ambienteId = request.params.get('ambiente_trabajoid');
                    // let oficioNombre = request.params.get('oficio');
                    // let deseoActividad = request.params.get('deseo_actividad');
                    //let mensaje: string = 'Este ambiente no existe.';

                    if (ambienteId != null) {

                      let matchedAmbiente = ofertasLista.filter(ofertas => { return ofertas.ambiente_trabajoid === ambienteId; });
                      let seleccion = matchedAmbiente.length ? matchedAmbiente : [];
                      // por ambiente id
                      return of(new HttpResponse({ status: 200, body: { resultado: seleccion, total_filtrado: seleccion.length } }));
                    /* } else if ( (oficioNombre != null && oficioNombre != '') || deseoActividad != null && deseoActividad != '' ) {
                      let seleccion:any;
                      // coincidencia de oficios en listado oferta
                      if (oficioNombre != null && oficioNombre != ''){
                        let matchedAmbiente = ofertasLista.filter(ofertas => { return ofertas.puesto === oficioNombre; });
                        seleccion = matchedAmbiente.length ? matchedAmbiente : [];
                      }
                      // coincidencia en deseo actividad
                      if (deseoActividad != null && deseoActividad != ''){
                        let matchedAmbiente = ofertasLista.filter(ofertas => {
                          let buscar = deseoActividad.indexOf(ofertas.puesto);
                          return (buscar == -1)?false:true;
                        });
                        seleccion = matchedAmbiente.length ? matchedAmbiente : seleccion;
                      }
                      if (seleccion.length > 0) {
                        return of(new HttpResponse({ status: 200, body: { resultado: seleccion, total_filtrado: seleccion.length } }));
                      }else{
                        return of(new HttpResponse({ status: 200, body: { resultado: ofertasLista, total_filtrado: ofertasLista.length } }));
                      } */
                    }else{
                      return of(new HttpResponse({ status: 200, body: { resultado: ofertasLista, total_filtrado: ofertasLista.length, pagesize:5 } }));
                    }
            }

            // Crear ofertas
            if (request.url.endsWith('/apimock/ofertas') && request.method === 'POST') {
                // get new user object from post body
                let newOfertas = request.body;
                // save new user
                // array de la tabla
                // genero la lista de ofertas
                newOfertas.id = generarId(ofertasLista);
                newOfertas.fecha_inicial = hoy();

                ofertasLista.push({
                    id: newOfertas.id,
                    ambiente_trabajoid: newOfertas.ambiente_trabajoid,
                    ambiente_trabajo: getNombreArray(newOfertas.ambiente_trabajoid, ambienteLista),
                    nombre_sucursal: newOfertas.nombre_sucursal,
                    puesto: newOfertas.puesto,
                    area: newOfertas.area,
                    demanda_laboral: newOfertas.demanda_laboral,
                    objetivo: newOfertas.objetivo,
                    fecha_inicial: newOfertas.fecha_inicial,
                    estado: 'Vacante',
                    lugar: {
                        id: newOfertas.id,
                        localidadid: newOfertas.lugar.localidadid,
                        localidad: getNombreArray(newOfertas.lugar.localidadid, localidad),
                        calle: newOfertas.lugar.calle,
                        altura: newOfertas.lugar.altura,
                        barrio: newOfertas.lugar.barrio,
                        piso: newOfertas.lugar.piso,
                        depto: newOfertas.lugar.depto,
                        escalera: newOfertas.lugar.escalera
                    }
                });
                // datos a mostrar en la tabla
                localStorage.setItem('ofertasLista', JSON.stringify(ofertasLista));
                // datos de usuarios agregados
                // console.log(newOfertas);
                // ofertasAgregadas.push(newOfertas);
                // localStorage.setItem('ofertasAgregadas', JSON.stringify(ofertasAgregadas));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // conseguir OFERTA por id
            if (request.url.match(/\/apimock\/ofertas\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedOferta = ofertasLista.filter(oferta => { return oferta.id === id; });
                    let seleccion = matchedOferta.length ? matchedOferta[0] : null;

                    return of(new HttpResponse({ status: 200, body: seleccion }));
                // } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // }
            }

            // BORRAR OFERTA
            if (request.url.match(/\/apimock\/ofertas\/\d+$/) && request.method === 'DELETE') {
              // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
              // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  // find user by id in users array
                  let urlParts = request.url.split('/');
                  let id = parseInt(urlParts[urlParts.length - 1]);
                  let mensaje = "";

                  for (let i = 0; i < ofertasLista.length; i++) {
                    // busco la oferta con el id para borrar
                    if (ofertasLista[i]['id'] == id) {
                      ofertasLista.splice(i,1);
                      mensaje = "Se a borrado con exito la oferta!!";
                    }else{
                      mensaje = "Esta oferta no existe, por favor verifique sus datos.";
                    }
                  }


                  return of(new HttpResponse({ status: 200, body: {mensaje:mensaje} }));
              /* } else {
                  // return 401 not authorised if token is null or invalid
                  return throwError({ error: { message: 'Unauthorised' } });
              } */
          }

            // Editar Oferta
            if (request.url.match(/\/apimock\/ofertas\/\d+$/) && request.method === 'PUT') {

                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);

                // consigo el destinatario a editar en la respuesta
                let editOferta = request.body;
                // busco en el listado el destinatario
                for (var i = 0; i < ofertasLista.length; i++) {
                    if (ofertasLista[i]['id'] == id) {
                        ofertasLista[i] = {
                          id: id,
                          ambiente_trabajoid: editOferta.ambiente_trabajoid,
                          ambiente_trabajo: getNombreArray(editOferta.ambiente_trabajoid, ambienteLista),
                          nombre_sucursal: editOferta.nombre_sucursal,
                          puesto: editOferta.puesto,
                          area: editOferta.area,
                          demanda_laboral: editOferta.demanda_laboral,
                          objetivo: editOferta.objetivo,
                          fecha_inicial: ofertasLista[i]['fecha_inicial'],
                          estado: ofertasLista[i]['estado'],
                          lugar: {
                              id: editOferta.id,
                              localidadid: editOferta.lugar.localidadid,
                              localidad: getNombreArray(editOferta.lugar.localidadid, localidad),
                              calle: editOferta.lugar.calle,
                              altura: editOferta.lugar.altura,
                              barrio: editOferta.lugar.barrio,
                              piso: editOferta.lugar.piso,
                              depto: editOferta.lugar.depto,
                              escalera: editOferta.lugar.escalera
                          }
                        }
                    }
                }
                // verifico el array de usuarios agregados
                for (var d = 0; d < ofertasAgregadas.length; d++) {
                    if (ofertasAgregadas[d]['id'] == id) {
                        // elimino 1 elemento desde el indice especificado y agrego el nuevo array
                        editOferta['id'] = id;
                        editOferta['fecha_inicial'] = ofertasAgregadas[d]['id']['fecha_inicial'];
                        ofertasAgregadas.splice(d, 1, editOferta);
                    }
                }

                // datos a mostrar en la tabla
                localStorage.setItem('ofertasLista', JSON.stringify(ofertasLista));
                // datos de usuarios agregados
                //localStorage.setItem('ofertasAgregadas', JSON.stringify(ofertasAgregadas));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

        /* ************************************************************************
         *                          AREA DE ENTRENAMIENTO
         * ************************************************************************ */

            // Crear Area entrenamiento
            if (request.url.endsWith('/apimock/area-entrenamientos') && request.method === 'POST') {
              // get new user object from post body
              let newArea = request.body;

              // genero id de area de entrenamiento
              let id = generarId(areasLista);

              // genero la fecha inicial
              let fecha = new Date();
              let fecha_inicial = fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
              let hora_inicial = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();

              areasLista.push({
                id: id,
                tarea: newArea.tarea,
                planid: newArea.planid,
                destinatarioid: parseInt(newArea.destinatarioid),
                fecha_inicial: (newArea.fecha_inicial != '') ? newArea.fecha_inicial + ' ' + hora_inicial : fecha_inicial,
                fecha_final: plazo(),
                descripcion_baja: newArea.descripcion_baja,
                ofertaid: parseInt(newArea.ofertaid),
                jornada: newArea.jornada,
                observacion: newArea.observacion,
                plan: getNombreArray(newArea.planid, planes),
                ambiente_trabajo: "",
                destinatario: newArea.destinatario
              });
              // datos a mostrar en la tabla
              localStorage.setItem('areasLista', JSON.stringify(areasLista));

              // respond 200 OK
              return of(new HttpResponse({ status: 200, body: { id: id } }));
          }

          // Listar Areas de entrenamientos
          if (request.url.endsWith('/apimock/area-entrenamientos') && request.method === 'GET') {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                // parametros de busquedas
                let global_param = (request.params.get("global_param")) ? request.params.get("global_param") : '';
                let estadoid = (request.params.get("estadoid")) ? request.params.get("estadoid") : '';
                let planid = (request.params.get("planid")) ? request.params.get("planid") : '';
                  // datos paginacion
                let page: number = parseInt(request.params.get("page"));
                let pageSize: number = (request.params.get("pagesize")) ? parseInt(request.params.get("pagesize")) : 1;

                let search = [''];
                if (global_param != ''){
                  search = global_param.split(" ");
                  console.log(search);
                }
                //preparo objeto de paginacion
                let totalPaginas = 0;
                let encontrados: any[] = [];
                let listaAreas = {
                  total_filtrado: 0,
                  pagesize: pageSize,
                  pages: totalPaginas,
                  estado: true,
                  resultado:encontrados,
                };

                if (areasLista.length > 0) {
                  // recorro la lista de areas para armar el array de la coleccion
                  for (let i = 0; i < areasLista.length; i++) {
                    //areasLista[i];
                    // selecciono la oferta que coincida con el area
                    let matchedOferta = ofertasLista.filter(oferta => { return oferta.id === areasLista[i]['ofertaid']; });
                    let ofertaElegida = matchedOferta.length ? matchedOferta[0] : [];
                    // selecciono el ambiente de la oferta del area
                    let matchedAmbiente = ambienteLista.filter(ambiente => { return ambiente.id === parseInt(ofertaElegida['ambiente_trabajoid']); });
                    let ambienteElegido = matchedAmbiente.length ? matchedAmbiente[0] : [];
                    // selecciono el destinatario que coincida con el area
                    let matchedDestinatario = destinatarioLista.filter(destinatario => { return destinatario.id === areasLista[i]['destinatarioid']; });
                    let destinatarioElegido = matchedDestinatario.length ? matchedDestinatario[0] : [];
                    // Selecciono la persona del destinatario
                    let matchedPersona = personas.filter(persona => { return persona.id === destinatarioElegido.personaid; });
                    let personaElegido = matchedPersona.length ? matchedPersona[0] : [];

                    destinatarioElegido["persona"] = personaElegido;

                    areasLista[i]["destinatario"] = destinatarioElegido;
                    areasLista[i]["oferta"] = ofertaElegida;
                    areasLista[i]["ambiente_trabajo"] = ambienteElegido["nombre"];
                    /* areasLista[i]["ambiente_trabajo"] = ambienteElegido;
                    areasLista[i]["ambiente_trabajo"]["persona"] = representanteElegido; */

                  } // fin armado de areas

                  // realizo busqueda por los parametros enviados
                  encontrados = areasLista.filter(
                    area => {
                      for (let i = 0; i < search.length; i++) {
                        let nombre = area.destinatario.persona.nombre.split(" ");
                        for (let j = 0; j < nombre.length; j++) {
                            if ( nombre[j].toLowerCase().indexOf(search[i].toLowerCase()) > -1  ) {
                              return area;
                            }
                        }
                        let nombreAmbiente = area.oferta.ambiente_trabajo.split(" ");
                        for (let j = 0; j < nombreAmbiente.length; j++) {
                            if ( nombreAmbiente[j].toLowerCase().indexOf(search[i].toLowerCase()) > -1  ) {
                              return area;
                            }
                        }
                        if (area.destinatario.persona.nro_documento.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ){
                          return area;
                        }
                        if ( area.destinatario.persona.apellido.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ) {
                          return area;
                        }
                      }
                    });
                    // busco por estadoid
                    if (estadoid != '') {
                      if (encontrados.length > 0) {
                        encontrados = encontrados.filter(area => {
                          let existe = false;
                          for (let i = 0; i < area.length; i++) {
                            existe = estadoid === area[i].estadoid;
                          }
                          if (existe) { return area; }
                        });
                      }else{
                        encontrados = areasLista.filter(area => {
                          let existe = false;
                          for (let i = 0; i < area.length; i++) {
                            existe = estadoid === area[i].estadoid;
                          }
                          if (existe) { return area; }
                        });
                      }
                    }
                    // busco por plan id
                    if (planid != '') {
                      if (encontrados.length > 0) {
                        encontrados = encontrados.filter(area => {
                          let existe = false;
                            existe = parseInt(planid) === parseInt(area.planid);
                          if (existe) { return area; }
                        });
                      }else{
                        encontrados = areasLista.filter(area => {
                          let existe = false;
                            existe = parseInt(planid) === parseInt(area.planid);
                          if (existe) { return area; }
                        });
                      }
                    }

                    let totalFiltrado:number = encontrados.length;
                    let total:number = totalFiltrado/pageSize;
                    let numEntero = Math.floor(total);
                    let totalPagina:number = (total > numEntero) ? numEntero + 1 : total;

                    listaAreas.total_filtrado = encontrados.length;
                    listaAreas.pages = totalPagina;

                    if (page > 0) {
                      page = page;
                      let pageStart = page * pageSize;
                      let pageEnd = pageStart + pageSize;
                      listaAreas.resultado = encontrados.slice(pageStart, pageEnd);
                    }else{
                      listaAreas.resultado = encontrados.slice(0,pageSize);
                    }
                }

                return of(new HttpResponse({ status: 200, body: listaAreas }));
            // } else {
            //     // return 401 not authorised if token is null or invalid
            //     return throwError({ error: { message: 'Unauthorised' } });
            // }
        }

        // conseguir Area de entrenamiento por id
        if (request.url.match(/\/apimock\/area\-entrenamientos\/\d+$/) && request.method === 'GET') {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              // find user by id in users array
              let urlParts = request.url.split('/');
              let id = parseInt(urlParts[urlParts.length - 1]);
              let areaVista: object = {};

              // selecciono el area de entrenamiento por el id
              let matchedArea = areasLista.filter(areas => { return areas.id === id; });
              let seleccionArea = matchedArea.length ? matchedArea[0] : null;

              // selecciono la oferta que coincida con el area
              let matchedOferta = ofertasLista.filter(oferta => { return oferta.id === seleccionArea['ofertaid']; });
              let ofertaElegida = matchedOferta.length ? matchedOferta[0] : [];
              // selecciono el ambiente de la oferta del area
              let matchedAmbiente = ambienteLista.filter(ambiente => { return ambiente.id === parseInt(ofertaElegida['ambiente_trabajoid']); });
              let ambienteElegido = matchedAmbiente.length ? matchedAmbiente[0] : [];
              // selecciono el destinatario que coincida con el area
              let matchedDestinatario = destinatarioLista.filter(destinatario => { return destinatario.id === seleccionArea['destinatarioid']; });
              let destinatarioElegido = matchedDestinatario.length ? matchedDestinatario[0] : [];
              // selecciono la persona del destinatario
              let matchedPersona = personas.filter(persona => { return destinatarioElegido.personaid === persona['id']; });
              let personaElegida = matchedPersona.length ? matchedPersona[0] : [];

              destinatarioElegido['persona'] = personaElegida;
              ofertaElegida['ambiente_trabajo'] = ambienteElegido.nombre;

              areaVista = {
                id: seleccionArea['id'],
                tarea: seleccionArea['tarea'],
                planid: seleccionArea['plan'],
                destinatarioid: seleccionArea['destinatarioid'],
                fecha_inicial: seleccionArea['fecha_inicial'],
                fecha_final: seleccionArea['fecha_final'],
                descripcion_baja: seleccionArea['descripcion_baja'],
                ofertaid: seleccionArea['ofertaid'],
                jornada: seleccionArea['jornada'],
                observacion: seleccionArea['observacion'],
                plan: seleccionArea['plan'],
                estado: comprobarEstado(seleccionArea['fecha_final']),
                destinatario: destinatarioElegido,
                oferta: ofertaElegida,
                ambiente_trabajo: ambienteElegido
              };

              return of(new HttpResponse({ status: 200, body: areaVista }));
          // } else {
          //     // return 401 not authorised if token is null or invalid
          //     return throwError({ error: { message: 'Unauthorised' } });
          // }
      }



        /* ************************************************************************
         *                                  PERSONAS
         * ************************************************************************ */
            // Buscar personas
            if (request.url.match(/\/apimock\/personas\/buscar\-por\-documento\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let urlParts = request.url.split('/');
                    let nro_documento = urlParts[urlParts.length - 1];
                    let mensaje:string = 'Esta persona no existe.';

                    let matchedUsers = personas.filter(persona => { return persona.nro_documento === nro_documento; });
                    let seleccion = matchedUsers.length ? matchedUsers[0] : null;
                    let resultado:any = [];
                    if (seleccion != null) {
                        resultado.push({estado:true, resultado:[seleccion]});
                    }else{
                        resultado.push({ estado: false, resultado: [], message:mensaje});
                    }

                    return of(new HttpResponse({ status: 200, body: resultado[0] }));
                // } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // }
            }

        /* ************************************************************************
         *                             LISTADOS GENERALES
         * ************************************************************************ */

            // lista tipos de ambientes de trabajos
            if (request.url.endsWith('/apimock/tipo-ambiente-trabajos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: tipoAmbienteTrabajoLista }));
                // } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // }
            }
            // profesiones
            if (request.url.endsWith('/apimock/profesions') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: profesion }));
                // } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // }
            }
            // oficios
            if (request.url.endsWith('/apimock/oficios') && request.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: oficio }));
            }
            // crear oficio
            if (request.url.endsWith('/apimock/oficios') && request.method === 'POST') {
              // get new user object from post body
              let newOficio = request.body;
              let oficioStorage: any[] = (localStorage.getItem("oficios")) ? JSON.parse(localStorage.getItem("oficios")) : [];
              newOficio["id"] = generarId(oficio);
              oficio.push({
                id: newOficio.id,
                nombre: newOficio.nombre
              });
              // guardo el nuevo oficio en el local storage
              oficioStorage.push({id: newOficio.id, nombre: newOficio.nombre});
              localStorage.setItem('oficios', JSON.stringify(oficioStorage));
              // respond 200 OK
              return of(new HttpResponse({ status: 200, body: { id: newOficio.id } }));

            }
            // editar oficio
            if (request.url.match(/\/apimock\/oficios\/\d+$/) && request.method === 'PUT') {
              let urlParts = request.url.split('/');
              let id = parseInt(urlParts[urlParts.length - 1]);
              let editarOficio = request.body;
              let oficioStorage: any[] = (localStorage.getItem("oficios")) ? JSON.parse(localStorage.getItem("oficios")) : [];

              for (let i = 0; i < oficio.length; i++) {
                if (oficio[i].id === id ){
                  oficio[i].nombre = editarOficio.nombre;
                }
              }
              for (let j = 0; j < oficioStorage.length; j++) {
                if (oficioStorage[j].id === id) {
                  oficioStorage[j].nombre = editarOficio.nombre
                }
              }
              // guardo el ultimo oficio en el local storage
              localStorage.setItem('oficios', JSON.stringify(oficioStorage));
              return of(new HttpResponse({ status: 200, body: { id: editarOficio.id } }));
            }
            // borrar oficio
            if (request.url.match(/\/apimock\/oficios\/\d+$/) && request.method === 'DELETE') {
              // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
              // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  // find user by id in users array
                  let urlParts = request.url.split('/');
                  let id = parseInt(urlParts[urlParts.length - 1]);
                  let oficioStorage: any[] = (localStorage.getItem("oficios")) ? JSON.parse(localStorage.getItem("oficios")) : [];

                  for (let i = 0; i < oficio.length; i++) {
                    // busco la oferta con el id para borrar
                    if (oficio[i]['id'] == id) {
                      oficio.splice(i,1);
                    }
                  }
                  if (oficioStorage.length > 0){
                    for (let j = 0; j < oficioStorage.length; j++) {
                      if (oficioStorage[j].id == id){
                        oficioStorage.splice(j, 1);
                      }
                    }
                  }
                  // guardo el contenido del oficio storage si ha sido borrado algun elemento
                  localStorage.setItem('oficios', JSON.stringify(oficioStorage));

                  return of(new HttpResponse({ status: 200, body: {mensaje:"borrado exitoso"} }));
              }

            //sexo
            if (request.url.endsWith('/apimock/sexos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // /* if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') { */
                    return of(new HttpResponse({ status: 200, body: sexo }));
                // /* } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // } */
            }
            // genero
            if (request.url.endsWith('/apimock/generos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // /* if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') { */
                    return of(new HttpResponse({ status: 200, body: genero }));
                // /* } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // } */
            }
            // Estado Civil
            if (request.url.endsWith('/apimock/estado-civils') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // /* if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') { */
                    return of(new HttpResponse({ status: 200, body: estadoCivil }));
                // /* } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // } */
            }
            //localidades
            if (request.url.endsWith('/apimock/localidads') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: localidad }));
                // } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // }
            }
            //Nivel educativo
            if (request.url.endsWith('/apimock/nivel-educativos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: nivelEducativo }));
                // } else {
                //     // return 401 not authorised if token is null or invalid
                //     return throwError({ error: { message: 'Unauthorised' } });
                // }
            }

            //Planes
            if (request.url.endsWith('/apimock/plans') && request.method === 'GET') {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  return of(new HttpResponse({ status: 200, body: planes }));
              // } else {
              //     // return 401 not authorised if token is null or invalid
              //     return throwError({ error: { message: 'Unauthorised' } });
              // }
            }

            //Roles
            if (request.url.endsWith('/apimock/rols') && request.method === 'GET') {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  return of(new HttpResponse({ status: 200, body: roles }));
              // } else {
              //     // return 401 not authorised if token is null or invalid
              //     return throwError({ error: { message: 'Unauthorised' } });
              // }
            }
            //Permisos
            if (request.url.endsWith('/apimock/permisos') && request.method === 'GET') {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  return of(new HttpResponse({ status: 200, body: permisos }));
              // } else {
              //     // return 401 not authorised if token is null or invalid
              //     return throwError({ error: { message: 'Unauthorised' } });
              // }
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(1500))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
