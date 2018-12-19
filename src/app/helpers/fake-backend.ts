import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
        // listados de datos agregados
        let destinatarioLista: any = JSON.parse(localStorage.getItem('destinatarioLista')) || [];
        let ambienteLista: any[] = JSON.parse(localStorage.getItem('ambienteLista')) || [];
        let ofertasLista: any[] = JSON.parse(localStorage.getItem('ofertasLista')) || [];
        let areasLista: any[] = JSON.parse(localStorage.getItem('areasLista')) || [];

        // Agregados
        //let destinatarioAgregados: any[] = JSON.parse(localStorage.getItem('destinatariosAgregados')) || [];
        //let ambientesAgregados: any[] = JSON.parse(localStorage.getItem('ambientesAgregados')) || [];
        let ofertasAgregadas: any[] = JSON.parse(localStorage.getItem('ofertasAgregadas')) || [];
        // listados globales
        let profesion: any[] = [{ id: 1, nombre: 'Abogado'},{ id: 3, nombre: 'Agrónomo'},{ id: 4, nombre: 'Bacteriólogo' },{ id: 5, nombre: 'Biofísico' },
        { id: 6, nombre: 'climatologo' },{ id: 7, nombre: 'Cirujano' },{ id: 8, nombre: 'Dentista' },{ id: 9, nombre: 'Doctor' },{ id: 10, nombre: 'Enfermero' }];
        let oficio: any[] = [{ id: 1, nombre: 'Albañil' },{ id: 2, nombre: 'Arbitro' },{ id: 3, nombre: 'Banquero' },{ id: 4, nombre: 'Bailarin' },{ id: 5, nombre: 'Cantante' },
            { id: 6, nombre: 'Carpintero' },{ id: 7, nombre: 'Electricista' },{ id: 8, nombre: 'Escritor' },{ id: 9, nombre: 'Farmacéutico' },{ id: 10, nombre: 'Florista' }];
        let sexo: any[] = [{ id: 1, nombre: "Hombre"}, {id: 2, nombre: "Mujer"}];
        let genero: any[] = [{ id: 1, nombre: "Femenino" }, { id: 2, nombre: "Masculino" }];
        let estadoCivil: any[] = [{ id: 1, nombre: "Casado/a" }, { id: 2, nombre: "Soltero/a" }, { id: 2, nombre: "Viudo/a" }];
        let localidad: any[] = [{ id: 1, nombre: "Bariloche" }, { id: 2, nombre: "Cipolletti" }, { id: 3, nombre: "Gral. Roca" }, { id: 4, nombre: "Viedma" }];
        let nivelEducativo: any[] = [{ id: 1, nombre: "Primaria" }, { id: 2, nombre: "Secundaria" }, { id: 3, nombre: "Terciaria" }, { id: 3, nombre: "Universitaria" }];
        let tipoAmbienteTrabajoLista: any[] = [{ id: 1, nombre: 'Comisión de fomento' }, { id: 2, nombre: 'Empleador privado' },{ id: 3, nombre: 'Empresa' }, { id: 4, nombre: 'Institución gubernamental' },{ id: 5, nombre: 'Institución sin fines de lucro' }, { id: 6, nombre: 'Municipio' }];
        let planes: any[] = [{ id: 1, nombre: '1000 / 10 horas' }, { id: 2, nombre: '2000 / 15 horas' },{ id: 3, nombre: '5000 / 20 horas' }];
        // datos adicionales
        let personas: any[] = [{ id: 1, nombre: "Romina", apellido: "Rodríguez", nro_documento: "29890098", fecha_nacimiento: "1980-12-12", telefono: "2920430690", celular: "2920412127", fax:"", estado_civilid: 1, sexoid: 2, generoid: 1, email: "rr1980@gmail.com", cuil: "20298900988", estudios: [{ anio: "2013", nivel_educativoid: 1, nivel_educativo: 'Primaria', titulo: "grado", completo: true, en_curso: false, fecha: "2014-12-20" }], lugar: { id: 1, barrio: "Santa Clara", calle: "misiones", altura: "27", escalera: '', piso: "", depto: "", localidadid: 1 } }, { id: 2, nombre: "Juan jose", apellido: "Casillas", nro_documento: "29232132", fecha_nacimiento: "1985-10-23", telefono: "2920430753", celular: "2920412265", fax:"", estado_civilid: 1, sexoid: 2, generoid: 1, email: "jjcasillas@gmail.com", cuil: "20292321328", estudios: [{ anio: "2013", nivel_educativoid: 2, nivel_educativo: 'Secundaria', titulo: "bachiller en economía financiera", completo: false, en_curso: true, fecha: "2014-12-20" }], lugar: { id: 2, barrio: "Don bosco", calle: "Mitre", altura: "327", escalera: '', piso: "", depto: "", localidadid: 1 } }, { id: 3, nombre: "Carlos", apellido: "Mansilla", nro_documento: "29857364", fecha_nacimiento: "1988-05-14", telefono: "2920430132", celular: "2920412628", fax:"", estado_civilid: 1, sexoid: 2, generoid: 1, email: "carlosmansilla@gmail.com", cuil: "20298573648", estudios: [{ anio: "2013", nivel_educativoid: 3, nivel_educativo: 'Terciaria', titulo: "tecnico en desarrollo web", completo: true, en_curso: false, fecha: "2014-12-20" }], lugar: { id: 3, barrio: "Fátima", calle: "san luis", altura: "1032", escalera: '', piso: "", depto: "", localidadid: 1 } }];


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

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

        /* ************************************************************************
         *                                LOGIN
         * ************************************************************************ */
            // authenticate
            if (request.url.endsWith('/apimock/usuario/login') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password_hash === testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    return of(new HttpResponse({ status: 200, body: { access_token: 'fake-jwt-token' } }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/apimock/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [testUser] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
        /* ************************************************************************
         *                                DESTINATARIO
         * ************************************************************************ */
            // lista de destinatario
            if (request.url.endsWith('/apimock/destinatarios') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let totalF = destinatarioLista.length;
                    return of(new HttpResponse({ status: 200, body: { success: true, total_filtrado: totalF, coleccion: destinatarioLista  } }));
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
                    return throwError({ error: { message: 'El destinatario con el nro documento:  "' + newDestinatario.destinatario.persona.nro_documento + '" ya existe' } });
                }
                // array de la tabla Listado de la tabla
                newDestinatario.destinatario.id = (destinatarioLista.length > 0)?generarId(destinatarioLista):1;
                newDestinatario.destinatario.persona.lugar.id = (destinatarioLista.length > 0) ? generarId(destinatarioLista) : 1;
                newDestinatario.destinatario.persona.id = generarId(personas);
                personas.push(newDestinatario.destinatario.persona);
                // listado de estudios
                for (var i = 0; i < newDestinatario.destinatario.persona.estudios.length; i++) {
                    estudios[i] = {
                        nivel_educativoid: newDestinatario.destinatario.persona.estudios[i].nivel_educativoid,
                        nivel_educativo: getNombreArray(newDestinatario.destinatario.persona.estudios[i].nivel_educativoid, nivelEducativo),
                        titulo: newDestinatario.destinatario.persona.estudios[i].titulo,
                        completo: (newDestinatario.destinatario.persona.estudios[i].completo == true) ? 1 : 0,
                        en_curso: (newDestinatario.destinatario.persona.estudios[i].en_curso == true) ? 1 : 0,
                        anio: newDestinatario.destinatario.persona.estudios[i].anio
                    }
                }
                // profesion y oficio
                let profesionID = (newDestinatario.destinatario.profesionid) ? newDestinatario.destinatario.profesionid : '' ;
                let profesionNombre = (newDestinatario.destinatario.profesionid) ? getNombreArray(newDestinatario.destinatario.profesionid, profesion) : '' ;
                let oficioID = (newDestinatario.destinatario.oficioid) ? newDestinatario.destinatario.oficioid : '' ;
                let oficioNombre = (newDestinatario.destinatario.oficioid) ? getNombreArray(newDestinatario.destinatario.oficioid, oficio) : '' ;

                destinatarioLista.push({
                    id: newDestinatario.destinatario.id,
                    legajo: newDestinatario.destinatario.legajo,
                    calificacion: 1,
                    fecha_ingreso: hoy(),
                    origen: newDestinatario.destinatario.origen,
                    observacion: newDestinatario.destinatario.observacion,
                    deseo_lugar_entrenamiento: newDestinatario.destinatario.deseo_lugar_entrenamiento,
                    deseo_actividad: newDestinatario.destinatario.deseo_actividad,
                    fecha_presentacion: newDestinatario.destinatario.fecha_presentacion,
                    personaid: newDestinatario.destinatario.persona.id,
                    banco_cbu: newDestinatario.destinatario.banco_cbu,
                    banco_nombre: newDestinatario.destinatario.banco_nombre,
                    banco_alias: newDestinatario.destinatario.banco_alias,
                    experiencia_laboral: (newDestinatario.destinatario.experiencia_laboral == true)?1:0,
                    conocimientos_basicos: newDestinatario.destinatario.conocimientos_basicos,
                    oficioid: oficioID,
                    oficio: oficioNombre,
                    profesionid: profesionID,
                    profesion: profesionNombre,
                    persona: {
                        id: newDestinatario.destinatario.persona.id,
                        nombre: newDestinatario.destinatario.persona.nombre,
                        apellido: newDestinatario.destinatario.persona.apellido,
                        apodo: null,
                        nro_documento: newDestinatario.destinatario.persona.nro_documento,
                        cuil: newDestinatario.destinatario.persona.cuil,
                        telefono: newDestinatario.destinatario.persona.telefono,
                        celular: newDestinatario.destinatario.persona.celular,
                        email: newDestinatario.destinatario.persona.email,
                        fecha_nacimiento: newDestinatario.destinatario.persona.fecha_nacimiento,
                        estado_civilid: newDestinatario.destinatario.persona.estado_civilid,
                        sexoid: newDestinatario.destinatario.persona.sexoid,
                        tipo_documentoid: null,
                        nucleoid: null,
                        situacion_laboralid: null,
                        generoid: newDestinatario.destinatario.persona.generoid,
                        estudios: estudios,
                        sexo: getNombreArray(newDestinatario.destinatario.persona.sexoid, sexo),
                        genero: getNombreArray(newDestinatario.destinatario.persona.generoid, genero),
                        estado_civil: getNombreArray(newDestinatario.destinatario.persona.estado_civilid, estadoCivil),
                        lugar: {
                            id: newDestinatario.destinatario.persona.lugar.id,
                            nombre: null,
                            calle: newDestinatario.destinatario.persona.lugar.calle,
                            altura: newDestinatario.destinatario.persona.lugar.altura,
                            localidadid: newDestinatario.destinatario.persona.lugar.localidadid,
                            latitud: null,
                            longitud: null,
                            barrio: newDestinatario.destinatario.persona.lugar.barrio,
                            piso: newDestinatario.destinatario.persona.lugar.piso,
                            depto: newDestinatario.destinatario.persona.lugar.depto,
                            escalera: newDestinatario.destinatario.persona.lugar.escalera,
                            localidad: getNombreArray(newDestinatario.destinatario.persona.lugar.localidadid, localidad)
                        }
                    }
                });
                // datos a mostrar en la tabla
                localStorage.setItem('destinatarioLista', JSON.stringify(destinatarioLista));
                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }
            // conseguir destinatario por id
            if (request.url.match(/\/destinatarios\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let respuesta = {};
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = destinatarioLista.filter(destinatario => { return destinatario.id === id; });
                    let seleccion = matchedUsers.length ? matchedUsers[0] : null;

                    respuesta = { status: 200, body: seleccion };
                    return of(new HttpResponse(respuesta));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // Editar destinatario
            if (request.url.match(/\/destinatarios\/\d+$/) && request.method === 'PUT') {

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
                                id: editDestinatario.destinatario.id,
                                oficioid: oficioID,
                                oficio: oficioNombre,
                                legajo: editDestinatario.destinatario.legajo,
                                calificacion: 1,
                                profesionid: profesionID,
                                fecha_ingreso: hoy(),
                                origen: editDestinatario.destinatario.origen,
                                observacion: editDestinatario.destinatario.observacion,
                                deseo_lugar_entrenamiento: editDestinatario.destinatario.deseo_lugar_entrenamiento,
                                deseo_actividad: editDestinatario.destinatario.deseo_actividad,
                                fecha_presentacion: editDestinatario.destinatario.fecha_presentacion,
                                personaid: editDestinatario.destinatario.persona.id,
                                banco_cbu: editDestinatario.destinatario.banco_cbu,
                                banco_nombre: editDestinatario.destinatario.banco_nombre,
                                banco_alias: editDestinatario.destinatario.banco_alias,
                                experiencia_laboral: (editDestinatario.destinatario.experiencia_laboral == true) ? 1 : 0,
                                conocimientos_basicos: editDestinatario.destinatario.conocimientos_basicos,
                                profesion: profesionNombre,
                                persona: {
                                    id: editDestinatario.destinatario.persona.id,
                                    nombre: editDestinatario.destinatario.persona.nombre,
                                    apellido: editDestinatario.destinatario.persona.apellido,
                                    apodo: null,
                                    nro_documento: editDestinatario.destinatario.persona.nro_documento,
                                    cuil: editDestinatario.destinatario.persona.cuil,
                                    telefono: editDestinatario.destinatario.persona.telefono,
                                    celular: editDestinatario.destinatario.persona.celular,
                                    email: editDestinatario.destinatario.persona.email,
                                    fecha_nacimiento: editDestinatario.destinatario.persona.fecha_nacimiento,
                                    estado_civilid: editDestinatario.destinatario.persona.estado_civilid,
                                    sexoid: editDestinatario.destinatario.persona.sexoid,
                                    tipo_documentoid: null,
                                    nucleoid: null,
                                    situacion_laboralid: null,
                                    generoid: editDestinatario.destinatario.persona.generoid,
                                    estudios: estudios,
                                    sexo: getNombreArray(editDestinatario.destinatario.persona.sexoid, sexo),
                                    genero: getNombreArray(editDestinatario.destinatario.persona.generoid, genero),
                                    estado_civil: getNombreArray(editDestinatario.destinatario.persona.estado_civilid, estadoCivil),
                                    lugar: {
                                        id: editDestinatario.destinatario.persona.lugar.id,
                                        nombre: null,
                                        calle: editDestinatario.destinatario.persona.lugar.calle,
                                        altura: editDestinatario.destinatario.persona.lugar.altura,
                                        localidadid: editDestinatario.destinatario.persona.lugar.localidadid,
                                        latitud: null,
                                        longitud: null,
                                        barrio: editDestinatario.destinatario.persona.lugar.barrio,
                                        piso: editDestinatario.destinatario.persona.lugar.piso,
                                        depto: editDestinatario.destinatario.persona.lugar.depto,
                                        escalera: editDestinatario.destinatario.persona.lugar.escalera,
                                        localidad: getNombreArray(editDestinatario.destinatario.persona.lugar.localidadid, localidad)
                                    }
                                }
                            }
                    }
                }

                // datos a mostrar en la tabla
                localStorage.setItem('destinatarioLista', JSON.stringify(destinatarioLista));
                // datos de usuarios agregados
                //localStorage.setItem('destinatariosAgregados', JSON.stringify(destinatarioLista));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

        /* ************************************************************************
         *                            AMBIENTE DE TRABAJO
         * ************************************************************************ */
            // lista de ambientes de trabajos
            if (request.url.endsWith('/apimock/ambiente-trabajos') && request.method === 'GET') {
                console.log('terminando');
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  let totalF = ambienteLista.length;
                    return of(new HttpResponse({ status: 200, body: { success: true, total_filtrado: totalF, coleccion: ambienteLista  } }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // Crear ambiente de trabajo
            if (request.url.endsWith('/apimock/ambiente-trabajos') && request.method === 'POST') {
                // get new user object from post body
                let newAmbiente = request.body;
                // save new user
                // array de la tabla
                newAmbiente.ambiente.id = generarId(ambienteLista);
                let idAmbiente: number = newAmbiente.ambiente.id;
                newAmbiente.persona.id = generarId(personas);
                newAmbiente.ambiente.lugar.id = generarId(ambienteLista);
                ambienteLista.push({
                    id: newAmbiente.ambiente.id,
                    nombre: newAmbiente.ambiente.nombre,
                    personaid: newAmbiente.persona.id,
                    tipo_ambiente_trabajoid: newAmbiente.ambiente.tipo_ambiente_trabajoid,
                    tipo_ambiente_trabajo: getNombreArray(newAmbiente.ambiente.tipo_ambiente_trabajoid, tipoAmbienteTrabajoLista),
                    cuit: newAmbiente.ambiente.cuit,
                    legajo: newAmbiente.ambiente.legajo,
                    observacion: newAmbiente.ambiente.observacion,
                    estado: 'Activo',
                    actividad: newAmbiente.ambiente.actividad,
                    lugarid: idAmbiente,
                    telefono1: newAmbiente.ambiente.telefono1,
                    telefono2: newAmbiente.ambiente.telefono2,
                    telefono3: newAmbiente.ambiente.telefono3,
                    email: newAmbiente.ambiente.email,
                    fax: newAmbiente.ambiente.fax,
                    persona: {
                      id: newAmbiente.persona.id,
                      nro_documento: newAmbiente.persona.nro_documento,
                      apellido: newAmbiente.persona.apellido,
                      nombre: newAmbiente.persona.nombre,
                      telefono: newAmbiente.persona.telefono,
                      celular: newAmbiente.persona.celular,
                      email: newAmbiente.persona.email
                    },
                    lugar: {
                      calle: newAmbiente.ambiente.lugar.calle,
                      altura: newAmbiente.ambiente.lugar.altura,
                      id: idAmbiente,
                      localidadid: 1,
                      barrio: newAmbiente.ambiente.lugar.barrio,
                      piso: newAmbiente.ambiente.lugar.piso,
                      depto: newAmbiente.ambiente.lugar.depto,
                      escalera: newAmbiente.ambiente.lugar.escalera,
                      localidad: getNombreArray(newAmbiente.ambiente.lugar.localidadid, localidad)
                    }
                });
                // datos a mostrar en la tabla
                localStorage.setItem('ambienteLista', JSON.stringify(ambienteLista));
                // datos de usuarios agregados
                //ambientesAgregados.push(newAmbiente);
                //localStorage.setItem('ambientesAgregados', JSON.stringify(ambientesAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200, body: { id: idAmbiente } }));
            }

            // conseguir AMBIENTE DE TRABAJO por id
            if (request.url.match(/\/ambiente\-trabajos\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let mensaje = 'No existe este ambiente';
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = ambienteLista.filter(ambiente => { return ambiente.id === id; });
                    let seleccion = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: seleccion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // Editar ambiente trabajo
            if (request.url.match(/\/ambiente\-trabajos\/\d+$/) && request.method === 'PUT') {

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
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let ambienteId = request.params.get('ambiente_trabajoid');
                    let oficioNombre = request.params.get('oficio');
                    let deseoActividad = request.params.get('deseo_actividad');
                    //let mensaje: string = 'Este ambiente no existe.';

                    if (ambienteId != null) {

                      let matchedAmbiente = ofertasLista.filter(ofertas => { return ofertas.ambiente_trabajoid === ambienteId; });
                      let seleccion = matchedAmbiente.length ? matchedAmbiente : [];

                      return of(new HttpResponse({ status: 200, body: seleccion }));
                    } else if ( (oficioNombre != null && oficioNombre != '') || deseoActividad != null && deseoActividad != '' ) {
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
                        return of(new HttpResponse({ status: 200, body: { coleccion: seleccion, total_filtrado: seleccion.length } }));
                      }else{
                        return of(new HttpResponse({ status: 200, body: { coleccion: ofertasLista, total_filtrado: ofertasLista.length } }));
                      }
                    }else{
                      return of(new HttpResponse({ status: 200, body: { coleccion: ofertasLista, total_filtrado: ofertasLista.length } }));
                    }


                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
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
            if (request.url.match(/\/ofertas\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedOferta = ofertasLista.filter(oferta => { return oferta.id === id; });
                    let seleccion = matchedOferta.length ? matchedOferta[0] : null;

                    return of(new HttpResponse({ status: 200, body: seleccion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // BORRAR OFERTA
            if (request.url.match(/\/ofertas\/\d+$/) && request.method === 'DELETE') {
              // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
              if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
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
              } else {
                  // return 401 not authorised if token is null or invalid
                  return throwError({ error: { message: 'Unauthorised' } });
              }
          }

            // Editar Oferta
            if (request.url.match(/\/ofertas\/\d+$/) && request.method === 'PUT') {

                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);

                // consigo el destinatario a editar en la respuesta
                let editOferta = request.body;
                console.log(editOferta.lugar.localidadid);
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

            // Crear ofertas
            if (request.url.endsWith('/apimock/area-entrenamientos') && request.method === 'POST') {
              // get new user object from post body
              let newArea = request.body;

              // genero id de area de entrenamiento
              let id = generarId(areasLista);

              // genero la fecha inicial
              let fecha = new Date();
              let fecha_inicial = fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();;
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
              return of(new HttpResponse({ status: 200 }));
          }

          // Listar Areas de entrenamientos
          if (request.url.endsWith('/apimock/area-entrenamientos') && request.method === 'GET') {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                let totalF = areasLista.length;
                let areaColeccion: any[] = [];

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

                    areaColeccion.push({
                      id: areasLista[i]['id'],
                      fecha_inicial: areasLista[i]['fecha_inicial'],
                      fecha_final: areasLista[i]['fecha_final'],
                      tarea: areasLista[i]['tarea'],
                      plan: areasLista[i]['plan'],
                      estado: 'vigente',
                      destinatario: {
                        nro_documento: destinatarioElegido['persona']['nro_documento'],
                        nombre: destinatarioElegido['persona']['nombre'],
                        apellido: destinatarioElegido['persona']['apellido']
                      },
                      ambiente_trabajo: {
                        nombre: (ofertaElegida['nombre_sucursal'] != '') ?  ambienteElegido['nombre'] + " (" + ofertaElegida['nombre_sucursal'] + ")" : ambienteElegido['nombre'] + "",
                      }
                    });

                  }

                }
                return of(new HttpResponse({ status: 200, body: { success: true, total_filtrado: totalF, coleccion: areaColeccion  } }));
            } else {
                // return 401 not authorised if token is null or invalid
                return throwError({ error: { message: 'Unauthorised' } });
            }
        }

        // conseguir Area de entrenamiento por id
        if (request.url.match(/\/area\-entrenamientos\/\d+$/) && request.method === 'GET') {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
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

              ofertaElegida['ambiente_trabajo'] = ambienteElegido;

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
                estado: 'vigente',
                destinatario: destinatarioElegido,
                oferta: ofertaElegida
              };

              return of(new HttpResponse({ status: 200, body: areaVista }));
          } else {
              // return 401 not authorised if token is null or invalid
              return throwError({ error: { message: 'Unauthorised' } });
          }
      }



        /* ************************************************************************
         *                                  PERSONAS
         * ************************************************************************ */
            // Buscar personas
            if (request.url.endsWith('/apimock/personas') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let nro_documento = request.params.get('nro_documento');
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
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

        /* ************************************************************************
         *                             LISTADOS GENERALES
         * ************************************************************************ */

            // lista tipos de ambientes de trabajos
            if (request.url.endsWith('/apimock/tipo-ambiente-trabajos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: tipoAmbienteTrabajoLista }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // profesiones
            if (request.url.endsWith('/apimock/profesions') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: profesion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // oficios
            if (request.url.endsWith('/apimock/oficios') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: oficio }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            //sexo
            if (request.url.endsWith('/apimock/sexos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: sexo }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // genero
            if (request.url.endsWith('/apimock/generos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: genero }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // Estado Civil
            if (request.url.endsWith('/apimock/estado-civils') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: estadoCivil }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            //localidades
            if (request.url.endsWith('/apimock/localidads') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: localidad }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            //Nivel educativo
            if (request.url.endsWith('/apimock/nivel-educativos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: nivelEducativo }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            //Planes
            if (request.url.endsWith('/apimock/plans') && request.method === 'GET') {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  return of(new HttpResponse({ status: 200, body: planes }));
              } else {
                  // return 401 not authorised if token is null or invalid
                  return throwError({ error: { message: 'Unauthorised' } });
              }
          }

            // pass through any requests not handled above
            return next.handle(request);

        }))

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(1000))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
