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
        let destinatarioLista: any[] = JSON.parse(localStorage.getItem('destinatarioLista')) || [];
        let ambienteLista: any[] = JSON.parse(localStorage.getItem('ambienteLista')) || [];
        // Agregados
        let destinatarioAgregados: any[] = JSON.parse(localStorage.getItem('destinatariosAgregados')) || [];
        let ambientesAgregados: any[] = JSON.parse(localStorage.getItem('ambientesAgregados')) || [];
        // listados globales
        let profesion: any[] = [{ id: 1, nombre: 'Abogado'},{ id: 3, nombre: 'Agrónomo'},{ id: 4, nombre: 'Bacteriólogo' },{ id: 5, nombre: 'Biofísico' },
            { id: 6, nombre: 'climatologo' },{ id: 7, nombre: 'Cirujano' },{ id: 8, nombre: 'Dentista' },{ id: 9, nombre: 'Doctor' },{ id: 10, nombre: 'Enfermero' }];
        let oficio: any[] = [{ id: 1, nombre: 'Albañil' },{ id: 2, nombre: 'Arbitro' },{ id: 3, nombre: 'Banquero' },{ id: 4, nombre: 'Bailarin' },{ id: 5, nombre: 'Cantante' },
            { id: 6, nombre: 'Carpintero' },{ id: 7, nombre: 'Electricista' },{ id: 8, nombre: 'Escritor' },{ id: 9, nombre: 'Farmacéutico' },{ id: 10, nombre: 'Florista' }];
        let sexo: any[] = [{ id: 1, nombre: "Hombre"}, {id: 2, nombre: "Mujer"}];
        let genero: any[] = [{ id: 1, nombre: "Femenino" }, { id: 2, nombre: "Masculino" }];
        let estadoCivil: any[] = [{ id: 1, nombre: "Casado/a" }, { id: 2, nombre: "Soltero/a" }, { id: 2, nombre: "Viudo/a" }];
        let localidad: any[] = [{ id: 1, nombre: "Bariloche" }, { id: 2, nombre: "Cipolletti" }, { id: 3, nombre: "Gral. Roca" }, { id: 3, nombre: "Viedma" }];
        let nivelEducativo: any[] = [{ id: 1, nombre: "Primaria" }, { id: 2, nombre: "Secundaria" }, { id: 3, nombre: "Terciaria" }, { id: 3, nombre: "Universitaria" }];
        let tipoAmbienteTrabajoLista: any[] = [{ id: 1, nombre: 'Comisión de fomento' }, { id: 1, nombre: 'Empleador privado' },{ id: 1, nombre: 'Empresa' }, { id: 1, nombre: 'Institución gubernamental' },{ id: 1, nombre: 'Institución sin fines de lucro' }, { id: 1, nombre: 'Municipio' }]
        // datos adicionales
        let personas: any[] = [{ id: 1, nombre: "Romina", apellido: "Rodríguez", nro_documento: "29890098", fecha_nacimiento: "1980-12-12", telefono: "2920430690", celular: "2920412127", fax:"", estado_civilid: 1, sexoid: 2, generoid: 1, email: "rr1980@gmail.com", cuil: "20298900988", estudios: [{ anio: "2013", nivel_educativoid: 1, nivel_educativo_nombre: 'Primaria', titulo: "grado", completo: true, en_curso: false, fecha: "2014-12-20" }], lugar: { id: 1, barrio: "Santa Clara", calle: "misiones", altura: "27", escalera: '', piso: "", depto: "", localidadid: 1 } }, { id: 2, nombre: "Juan jose", apellido: "Casillas", nro_documento: "29232132", fecha_nacimiento: "1985-10-23", telefono: "2920430753", celular: "2920412265", fax:"", estado_civilid: 1, sexoid: 2, generoid: 1, email: "jjcasillas@gmail.com", cuil: "20292321328", estudios: [{ anio: "2013", nivel_educativoid: 2, nivel_educativo_nombre: 'Secundaria', titulo: "bachiller en economía financiera", completo: false, en_curso: true, fecha: "2014-12-20" }], lugar: { id: 2, barrio: "Don bosco", calle: "Mitre", altura: "327", escalera: '', piso: "", depto: "", localidadid: 1 } }, { id: 3, nombre: "Carlos", apellido: "Mansilla", nro_documento: "29857364", fecha_nacimiento: "1988-05-14", telefono: "2920430132", celular: "2920412628", fax:"", estado_civilid: 1, sexoid: 2, generoid: 1, email: "carlosmansilla@gmail.com", cuil: "20298573648", estudios: [{ anio: "2013", nivel_educativoid: 3, nivel_educativo_nombre: 'Terciaria', titulo: "tecnico en desarrollo web", completo: true, en_curso: false, fecha: "2014-12-20" }], lugar: { id: 3, barrio: "Fátima", calle: "san luis", altura: "1032", escalera: '', piso: "", depto: "", localidadid: 1 } }];


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

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

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
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [testUser] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // lista de destinatario
            if (request.url.endsWith('/destinatarios') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: destinatarioLista }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // lista de ambientes de trabajos
            if (request.url.endsWith('/ambiente-trabajos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: ambienteLista }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }            

            // guardar destinatario
            if (request.url.endsWith('/destinatarios') && request.method === 'POST') {
                // get new user object from post body
                let newDestinatario = request.body;
                console.log("respuesta post: ", destinatarioLista);
                // validation
                let duplicateUser = destinatarioLista.filter(destinatario => { return destinatario.nro_documento === newDestinatario.persona.nro_documento; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'El destinatario con el nro documento:  "' + newDestinatario.persona.nro_documento + '" ya existe' } });
                }


                // save new user
                // array de la tabla
                //{ nro_documento: '33476725', apellido: 'González', nombre: 'Carlos', direccion: 'alberdi 123', telefono: '2920423000',
                // celular: '2920635572', profesion: 'Panadero', oficio: 'Pastelero', nivel_educativo: 'Terciario', presentacion: '19/06/2018', id: 1 }
                let estudioDestinatario = (newDestinatario.persona.estudios.length > 0)?obtenerUltimoEstudio(newDestinatario.persona.estudios):[];
                newDestinatario.id = generarId(destinatarioLista);
                newDestinatario.persona.lugar.id = generarId(destinatarioLista);
                destinatarioLista.push({
                    id: newDestinatario.id,
                    nro_documento: newDestinatario.persona.nro_documento,
                    apellido: newDestinatario.persona.apellido,
                    nombre: newDestinatario.persona.nombre,
                    direccion: newDestinatario.persona.lugar.calle + ' ' + newDestinatario.persona.lugar.altura,
                    telefono: newDestinatario.persona.telefono,
                    celular: newDestinatario.persona.celular,
                    profesion: getNombreArray(newDestinatario.destinatario.profesionid, profesion),
                    oficio: getNombreArray(newDestinatario.destinatario.oficioid, oficio),
                    presentacion: newDestinatario.destinatario.fecha_presentacion,
                    estudio: (estudioDestinatario != null) ? concatEstudio(estudioDestinatario) : ''
                });
                // datos a mostrar en la tabla
                localStorage.setItem('destinatarioLista', JSON.stringify(destinatarioLista));
                // datos de usuarios agregados
                destinatarioAgregados.push(newDestinatario);
                localStorage.setItem('destinatariosAgregados', JSON.stringify(destinatarioAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // conseguir destinatario por id
            if (request.url.match(/\/destinatarios\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = destinatarioAgregados.filter(destinatario => { return destinatario.id === id; });
                    let seleccion = matchedUsers.length ? matchedUsers[0] : null;

                    if (seleccion != null ) {
                        delete seleccion.persona.cuil_prin;
                        delete seleccion.persona.cuil_ult;
                        delete seleccion.persona.fechaNacimiento;
                        delete seleccion.destinatario.fechaPresentacion;
                        delete seleccion.id;
                        seleccion.persona['id'] = generarId(destinatarioLista);
                    }

                    return of(new HttpResponse({ status: 200, body: seleccion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // Editar destinatario
            if (request.url.match(/\/destinatarios\/\d+$/) && request.method === 'PUT') {
                
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                
                // consigo el destinatario a editar en la respuesta
                let editDestinatario = request.body;
                // busco en el listado el destinatario
                let estudioDestinatario = (editDestinatario.persona.estudios.length > 0) ? obtenerUltimoEstudio(editDestinatario.persona.estudios) : null;
                for (var i = 0; i < destinatarioLista.length; i++) {
                    if(destinatarioLista[i]['id'] == id){
                            destinatarioLista[i] = {
                                id: id,
                                nro_documento: editDestinatario.persona.nro_documento,
                                apellido: editDestinatario.persona.apellido,
                                nombre: editDestinatario.persona.nombre,
                                direccion: editDestinatario.persona.lugar.calle + ' ' + editDestinatario.persona.lugar.altura,
                                telefono: editDestinatario.persona.telefono,
                                celular: editDestinatario.persona.celular,
                                profesion: getNombreArray(editDestinatario.destinatario.profesionid, profesion),
                                oficio: getNombreArray(editDestinatario.destinatario.oficioid, oficio),
                                presentacion: editDestinatario.destinatario.fecha_presentacion,
                                estudio: (estudioDestinatario != null) ? concatEstudio(estudioDestinatario) : ''
                            }
                    }
                }
                // verifico el array de usuarios agregados
                for (var d = 0; d < destinatarioAgregados.length; d++) {
                    if (destinatarioAgregados[d]['id'] == id ){
                        // elimino 1 elemento desde el indice especificado y agrego el nuevo array
                        editDestinatario['id'] = id;
                        destinatarioAgregados.splice(d, 1, editDestinatario);
                    }
                }

                // datos a mostrar en la tabla
                localStorage.setItem('destinatarioLista', JSON.stringify(destinatarioLista));
                // datos de usuarios agregados
                localStorage.setItem('destinatariosAgregados', JSON.stringify(destinatarioAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // get personas
            // persona 1 29890098
            if (request.url.endsWith('/personas') && request.method === 'GET') {
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

            if (request.url.endsWith('/ambiente-trabajos') && request.method === 'POST') {
                // get new user object from post body
                let newAmbiente = request.body;
                // validation
                let duplicateUser = ambienteLista.filter(ambiente => { return ambiente.nro_documento === newAmbiente.persona.nro_documento; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'El representante con el nro documento:  "' + newAmbiente.persona.nro_documento + '" ya esta en un ambiente de trabajo' } });
                }

                // save new user
                // array de la tabla
                let estudioDestinatario = (newAmbiente.persona.estudios.length > 0) ? obtenerUltimoEstudio(newAmbiente.persona.estudios) : [];
                newAmbiente.ambiente.id = generarId(ambienteLista);
                newAmbiente.persona.id = generarId(ambienteLista);
                newAmbiente.persona.lugar.id = generarId(ambienteLista);
                ambienteLista.push({
                    id: newAmbiente.ambiente.id,
                    nro_documento: newAmbiente.persona.nro_documento,
                    apellido: newAmbiente.persona.apellido,
                    nombre: newAmbiente.persona.nombre,
                    direccion: newAmbiente.persona.lugar.calle + ' ' + newAmbiente.persona.lugar.altura,
                    telefono: newAmbiente.persona.telefono,
                    celular: newAmbiente.persona.celular,
                    fax: newAmbiente.persona.fax,
                    tipo_ambiente_trabajo: getNombreArray(newAmbiente.ambiente.tipo_ambiente_trabajo, tipoAmbienteTrabajoLista),
                    nombre_ambiente: newAmbiente.ambiente.nombre,
                    cuit: newAmbiente.ambiente.cuit,
                    Estado: 'Activo'
                });
                // datos a mostrar en la tabla
                localStorage.setItem('ambienteLista', JSON.stringify(ambienteLista));
                // datos de usuarios agregados
                ambientesAgregados.push(newAmbiente);
                localStorage.setItem('ambientesAgregados', JSON.stringify(ambientesAgregados));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            /* LISTADOS */
            // lista tipos de ambientes de trabajos
            if (request.url.endsWith('/tipo-ambiente-trabajos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: tipoAmbienteTrabajoLista }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // profesiones
            if (request.url.endsWith('/profesions') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: profesion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // oficios
            if (request.url.endsWith('/oficios') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: oficio }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            //sexo
            if (request.url.endsWith('/sexos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: sexo }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // genero
            if (request.url.endsWith('/generos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: genero }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // Estado Civil
            if (request.url.endsWith('/estado-civils') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: estadoCivil }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            //localidades
            if (request.url.endsWith('/localidads') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: localidad }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            //Nivel educativo
            if (request.url.endsWith('/nivel-educativos') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: nivelEducativo }));
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
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};